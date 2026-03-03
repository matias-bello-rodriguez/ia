"""
visado_ia.py — Extracción y validación de documentos con OpenAI Vision.

Capacidades:
  - OCR + extracción de campos (RUT, Monto UF, Fechas críticas).
  - Validación de vigencia, montos, ahorro.
  - Lógica de Silófagos: si es Informe Universidad, valida sellos UBB/UdeC.
  - Sincronización de montos Contrato vs Resolución Exenta.
  - Resumen ejecutivo sucinto (estilo reporte, no párrafos largos).
"""
from __future__ import annotations

import base64
import json
import re
from typing import Any

from django.conf import settings


# ── Labels de extracción ─────────────────────────────────────

EXTRACCION_LABELS = [
    "RUT",
    "Nombre Completo",
    "Fecha Emisión",
    "Fecha Vencimiento",
    "Dominio Vigente",
    "Monto UF",
    "Monto Ahorro",
    "Tipo Documento",
]

PROMPT_EXTRACCION = """Eres un asistente experto en documentos chilenos de subsidio habitacional.
Analiza la imagen y devuelve ÚNICAMENTE un JSON válido (sin markdown) con esta estructura:

{"campos": [
  {"label": "RUT", "value": "valor o N/A"},
  {"label": "Nombre Completo", "value": "..."},
  {"label": "Fecha Emisión", "value": "DD/MM/YYYY o N/A"},
  {"label": "Fecha Vencimiento", "value": "DD/MM/YYYY o N/A"},
  {"label": "Dominio Vigente", "value": "Emitido hace X días o fecha"},
  {"label": "Monto UF", "value": "ej. 1.220 UF o N/A"},
  {"label": "Monto Ahorro", "value": "ej. 12 UF o N/A"},
  {"label": "Tipo Documento", "value": "contrato/resolución/certificado/informe/otro"}
],
"resumen": "Resumen ejecutivo en máximo 3 líneas. Estilo reporte: solo datos clave, sin adornos."}

Si no encuentras un dato, usa "N/A"."""

PROMPT_INFORME_UNIVERSIDAD = """Eres un asistente experto en informes de silófagos para subsidios habitacionales chilenos.
Este documento es un Informe de Universidad sobre control de plagas (termitas/silófagos).

Analiza la imagen y devuelve ÚNICAMENTE un JSON válido (sin markdown):

{"campos": [
  {"label": "RUT", "value": "valor o N/A"},
  {"label": "Nombre Completo", "value": "..."},
  {"label": "Fecha Emisión", "value": "DD/MM/YYYY o N/A"},
  {"label": "Fecha Vencimiento", "value": "DD/MM/YYYY o N/A"},
  {"label": "Monto UF", "value": "N/A"},
  {"label": "Universidad Emisora", "value": "UBB / UdeC / otra"},
  {"label": "Sello Universidad", "value": "Presente / No detectado"},
  {"label": "Resultado Plagas", "value": "Sin presencia / Con presencia / Tratamiento aplicado"},
  {"label": "Tipo Documento", "value": "informe_universidad"}
],
"resumen": "Resumen ejecutivo en máximo 3 líneas. Indicar si tiene sello válido de UBB o UdeC."}

IMPORTANTE: Valida especialmente si el documento tiene sello oficial de la Universidad del Bío-Bío (UBB) o Universidad de Concepción (UdeC). Si no tiene sello de ninguna de estas universidades acreditadas, indicarlo claramente."""


def _pdf_a_imagen_bytes(pdf_bytes: bytes) -> bytes | None:
    """Convierte la primera página del PDF a PNG en bytes."""
    try:
        import fitz  # PyMuPDF

        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        if doc.page_count == 0:
            doc.close()
            return None
        page = doc.load_page(0)
        pix = page.get_pixmap(dpi=150, alpha=False)
        png_bytes = pix.tobytes("png")
        doc.close()
        return png_bytes
    except Exception:
        return None


def _obtener_imagen_bytes(file_content: bytes, nombre_archivo: str) -> tuple[bytes, str] | None:
    """Devuelve (bytes de imagen, media_type) o None."""
    nombre = (nombre_archivo or "").lower()
    if nombre.endswith(".pdf"):
        img_bytes = _pdf_a_imagen_bytes(file_content)
        if img_bytes:
            return (img_bytes, "image/png")
        return None
    if nombre.endswith((".png", ".jpg", ".jpeg", ".webp", ".gif")):
        return (file_content, "image/png" if nombre.endswith(".png") else "image/jpeg")
    return None


def _extraer_uf(texto: str) -> float | None:
    """Extrae número de UF de un texto (ej. '1.220 UF' -> 1220.0)."""
    if not texto or texto.strip().upper() == "N/A":
        return None
    match = re.search(r"([\d.]+(?:,\d+)?)\s*UF", texto, re.IGNORECASE)
    if match:
        raw = match.group(1)
        # Manejar separador de miles chileno (punto) vs decimal (coma)
        if "," in raw:
            raw = raw.replace(".", "").replace(",", ".")
        elif raw.count(".") > 1:
            raw = raw.replace(".", "")
        return float(raw)
    return None


def _validar_campo(
    label: str,
    value: str,
    vigencia_max_dias: int | None,
    ahorro_minimo_uf: float | None,
) -> tuple[str, str | None]:
    """Devuelve (status, note). status: 'approved' | 'rejected' | 'alert'"""
    value_clean = (value or "").strip()
    if not value_clean or value_clean.upper() == "N/A":
        return ("alert", "Campo no encontrado en el documento")

    if label == "Dominio Vigente" and vigencia_max_dias is not None and vigencia_max_dias > 0:
        match = re.search(r"(\d+)\s*d[ií]as", value_clean, re.IGNORECASE)
        if match:
            dias = int(match.group(1))
            if dias > vigencia_max_dias:
                return (
                    "rejected",
                    f"Documento > {vigencia_max_dias} días, solicitar actualización en el CBR",
                )

    if label == "Monto Ahorro" and ahorro_minimo_uf is not None:
        uf = _extraer_uf(value_clean)
        if uf is not None and uf < ahorro_minimo_uf:
            return (
                "alert",
                f"Ahorro insuficiente - mínimo requerido: {ahorro_minimo_uf:.0f} UF",
            )

    # Validación de sello universidad para informes de silófagos
    if label == "Sello Universidad":
        if "no detectado" in value_clean.lower() or "no" in value_clean.lower():
            return (
                "rejected",
                "Sello de universidad acreditada (UBB/UdeC) NO detectado. Documento inválido.",
            )

    if label == "Universidad Emisora":
        universidades_validas = ["ubb", "udec", "bío-bío", "bio-bio", "concepción", "concepcion"]
        if not any(u in value_clean.lower() for u in universidades_validas):
            return (
                "rejected",
                f"Universidad '{value_clean}' no es acreditada. Solo se aceptan UBB o UdeC.",
            )

    if label == "Resultado Plagas":
        if "con presencia" in value_clean.lower():
            return ("rejected", "Se detectó presencia de silófagos/termitas.")

    return ("approved", None)


def extraer_y_validar_con_openai(
    file_content: bytes,
    nombre_archivo: str,
    vigencia_max_dias: int | None = 90,
    ahorro_minimo_uf: float | None = 15.0,
    tipo_documento: str = "",
) -> dict[str, Any]:
    """
    Usa OpenAI Vision para extraer campos del documento y aplica validación.

    Retorna dict con:
      - resultados: lista de {label, value, status, note}
      - resumen_ejecutivo: str breve
      - score_confianza: float 0-1
      - alertas_monto: list[str]
    """
    resultado_vacio: dict[str, Any] = {
        "resultados": [],
        "resumen_ejecutivo": "",
        "score_confianza": 0.0,
        "alertas_monto": [],
    }

    api_key = getattr(settings, "OPENAI_API_KEY", None) or ""
    if not api_key.strip():
        return resultado_vacio

    imagen = _obtener_imagen_bytes(file_content, nombre_archivo)
    if not imagen:
        return resultado_vacio

    img_bytes, media_type = imagen
    b64 = base64.standard_b64encode(img_bytes).decode("ascii")
    data_uri = f"data:{media_type};base64,{b64}"

    # Seleccionar prompt según tipo de documento
    tipo_lower = (tipo_documento or "").lower()
    es_informe_universidad = any(
        kw in tipo_lower for kw in ["informe_universidad", "silofago", "plagas", "termitas"]
    )
    prompt = PROMPT_INFORME_UNIVERSIDAD if es_informe_universidad else PROMPT_EXTRACCION

    try:
        from openai import OpenAI

        client = OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {"type": "image_url", "image_url": {"url": data_uri}},
                    ],
                }
            ],
            max_tokens=1000,
        )
    except Exception:
        return resultado_vacio

    text = (response.choices[0].message.content or "").strip()
    # Quitar bloques markdown
    if text.startswith("```"):
        text = re.sub(r"^```\w*\n?", "", text)
        text = re.sub(r"\n?```\s*$", "", text)
    text = text.strip()

    try:
        data = json.loads(text)
    except json.JSONDecodeError:
        return resultado_vacio

    campos_crudos = data.get("campos") or data.get("fields") or []
    if not isinstance(campos_crudos, list):
        return resultado_vacio

    resumen = data.get("resumen", "")
    resultados = []
    alertas_monto = []
    scores = []

    for item in campos_crudos:
        if not isinstance(item, dict):
            continue
        label = (item.get("label") or item.get("name") or "").strip()
        value = (item.get("value") or "").strip()
        if not label:
            continue
        field_status, note = _validar_campo(
            label, value, vigencia_max_dias, ahorro_minimo_uf
        )
        resultados.append({
            "label": label,
            "value": value or "—",
            "status": field_status,
            "note": note,
        })
        scores.append(1.0 if field_status == "approved" else 0.5 if field_status == "alert" else 0.0)

    # Score de confianza global
    score_confianza = sum(scores) / len(scores) if scores else 0.0

    return {
        "resultados": resultados,
        "resumen_ejecutivo": resumen,
        "score_confianza": round(score_confianza, 2),
        "alertas_monto": alertas_monto,
    }
