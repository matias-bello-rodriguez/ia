"""
Extracción y validación de documentos con OpenAI Vision (visado inteligente).
"""
from __future__ import annotations

import base64
import json
import re
from typing import Any

from django.conf import settings


# Campos que pedimos extraer al modelo (label exacto para consistencia)
EXTRACCION_LABELS = [
    "RUT",
    "Nombre Completo",
    "Fecha Emisión",
    "Vigencia",
    "Dominio Vigente",
    "Monto Ahorro",
]

PROMPT_EXTRACCION = """Eres un asistente que extrae datos de documentos chilenos de subsidio habitacional (dominios, certificados, cartolas).
Analiza la imagen del documento y devuelve ÚNICAMENTE un JSON válido, sin markdown ni texto extra, con esta estructura exacta:
{"campos": [{"label": "RUT", "value": "valor leído o N/A"}, {"label": "Nombre Completo", "value": "..."}, {"label": "Fecha Emisión", "value": "..."}, {"label": "Vigencia", "value": "..."}, {"label": "Dominio Vigente", "value": "ej. Emitido hace X días o fecha"}, {"label": "Monto Ahorro", "value": "ej. 12 UF o N/A"}]}
Incluye solo esos 6 labels. Si no encuentras un dato, usa "N/A" o descripción breve."""


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
    """Devuelve (bytes de imagen, media_type) o None si no se pudo obtener imagen."""
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
    """Extrae número de UF de un texto (ej. '12 UF' -> 12.0)."""
    if not texto or texto.strip().upper() == "N/A":
        return None
    match = re.search(r"(\d+(?:[.,]\d+)?)\s*UF", texto, re.IGNORECASE)
    if match:
        return float(match.group(1).replace(",", "."))
    return None


def _validar_campo(
    label: str,
    value: str,
    vigencia_max_dias: int | None,
    ahorro_minimo_uf: float | None,
) -> tuple[str, str | None]:
    """
    Devuelve (status, note). status: 'approved' | 'rejected' | 'alert'
    """
    value_clean = (value or "").strip()
    if not value_clean or value_clean.upper() == "N/A":
        return ("alert", "Campo no encontrado en el documento")

    if label == "Dominio Vigente" and vigencia_max_dias is not None and vigencia_max_dias > 0:
        # Buscar "hace X días" o similar
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

    return ("approved", None)


def extraer_y_validar_con_openai(
    file_content: bytes,
    nombre_archivo: str,
    vigencia_max_dias: int | None = 90,
    ahorro_minimo_uf: float | None = 15.0,
) -> list[dict[str, Any]]:
    """
    Usa OpenAI Vision para extraer campos del documento y aplica validación.

    Retorna lista de dicts: [{"label": str, "value": str, "status": "approved"|"rejected"|"alert", "note": str|None}]
    """
    api_key = getattr(settings, "OPENAI_API_KEY", None) or ""
    if not api_key.strip():
        return []

    imagen = _obtener_imagen_bytes(file_content, nombre_archivo)
    if not imagen:
        return []

    img_bytes, media_type = imagen
    b64 = base64.standard_b64encode(img_bytes).decode("ascii")
    data_uri = f"data:{media_type};base64,{b64}"

    try:
        from openai import OpenAI

        client = OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": PROMPT_EXTRACCION},
                        {"type": "image_url", "image_url": {"url": data_uri}},
                    ],
                }
            ],
            max_tokens=800,
        )
    except Exception:
        return []

    text = (response.choices[0].message.content or "").strip()
    # Quitar posibles bloques markdown
    if text.startswith("```"):
        text = re.sub(r"^```\w*\n?", "", text)
        text = re.sub(r"\n?```\s*$", "", text)
    text = text.strip()

    try:
        data = json.loads(text)
    except json.JSONDecodeError:
        return []

    campos_crudos = data.get("campos") or data.get("fields") or []
    if not isinstance(campos_crudos, list):
        return []

    resultados = []
    for item in campos_crudos:
        if not isinstance(item, dict):
            continue
        label = (item.get("label") or item.get("name") or "").strip()
        value = (item.get("value") or "").strip()
        if not label:
            continue
        status, note = _validar_campo(
            label, value, vigencia_max_dias, ahorro_minimo_uf
        )
        resultados.append({
            "label": label,
            "value": value or "—",
            "status": status,
            "note": note,
        })

    return resultados
