"""
models.py — Esquema maestro de la plataforma EGIS Biobío.

Actúa como fuente de verdad (IaC) para la base de datos en Supabase.
Las migraciones de Django crean y actualizan las tablas de PostgreSQL
de forma declarativa, análogo a cómo Terraform maneja infraestructura.

Glosario de negocio chileno:
  - EGIS: Entidad de Gestión Inmobiliaria Social (gestiona carpetas).
  - SERVIU: Servicio de Vivienda y Urbanización (aprueba pagos).
  - RUT: Rol Único Tributario, identificador fiscal chileno (ej. 12.345.678-9).
  - UF: Unidad de Fomento, unidad de cuenta reajustable diaria (~CLP 37.000).
  - DS49: Decreto Supremo 49, subsidio para familias vulnerables sin ahorro.
  - DS1: Decreto Supremo 1, subsidio para sectores medios con ahorro previo.
  - RSH: Registro Social de Hogares, percentil socioeconómico (0-100 %).
  - Silófagos: Termitas y plagas de madera; requieren informe de universidad
    acreditada para liberar el pago del subsidio.
  - ITO: Inspector Técnico de Obra (visa el avance constructivo).
  - SEREMI: Secretaría Regional Ministerial de Salud (certifica riesgo químico).
"""

from __future__ import annotations

from django.db import models


# ══════════════════════════════════════════════════════════════
# 1. ORGANIZACIONES — Multitenant (EGIS / Constructora / Otro)
# ══════════════════════════════════════════════════════════════

class Organizacion(models.Model):
    """
    Representa una entidad participante del ecosistema habitacional.
    El campo `tipo` separa EGIS de Constructoras y permite agregar
    otras entidades futuras (laboratorios, universidades, etc.).
    """

    class TipoOrganizacion(models.TextChoices):
        EGIS = "egis", "EGIS"
        CONSTRUCTORA = "constructora", "Constructora"
        LABORATORIO = "laboratorio", "Laboratorio / Universidad"
        OTRO = "otro", "Otro"

    nombre = models.CharField(max_length=200)
    rut = models.CharField(
        max_length=12,
        unique=True,
        help_text="RUT de la organización, formato 12.345.678-K",
    )
    tipo = models.CharField(
        max_length=20,
        choices=TipoOrganizacion.choices,
        db_index=True,
    )
    direccion = models.CharField(max_length=300, blank=True)
    comuna = models.CharField(max_length=100, blank=True)
    region = models.CharField(max_length=100, default="Biobío")
    telefono = models.CharField(max_length=30, blank=True)
    email = models.EmailField(blank=True)
    activa = models.BooleanField(default=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "organización"
        verbose_name_plural = "organizaciones"
        ordering = ["nombre"]

    def __str__(self) -> str:
        return f"{self.nombre} ({self.get_tipo_display()})"


# ══════════════════════════════════════════════════════════════
# 2. REGLAS DE SUBSIDIO — Parámetros oficiales MINVU
# ══════════════════════════════════════════════════════════════

class ReglaSubsidio(models.Model):
    """
    Cada fila configura un programa de subsidio (DS49, DS1, etc.).
    Los montos se guardan en UF como DecimalField para permitir
    cálculos aritméticos directos en la BD y evitar errores de
    parseo que ocurrirían con VARCHAR.
    """

    nombre = models.CharField(
        max_length=40,
        unique=True,
        help_text="Ej: DS49, DS1, Título II DS49",
    )
    descripcion = models.CharField(max_length=255, blank=True)
    ahorro_minimo_uf = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        help_text="Ahorro mínimo exigido al beneficiario, en UF.",
    )
    rsh_maximo_pct = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=100,
        help_text="Percentil RSH máximo permitido (0-100).",
    )
    puntaje_corte = models.IntegerField(
        default=0,
        help_text="Puntaje de corte para calificación SERVIU.",
    )
    tope_uf = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        help_text="Tope del subsidio en UF.",
    )
    fuente = models.CharField(
        max_length=100,
        blank=True,
        help_text="Referencia normativa: decreto, artículo, etc.",
    )
    ultima_actualizacion = models.DateField(auto_now=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "regla de subsidio"
        verbose_name_plural = "reglas de subsidio"

    def __str__(self) -> str:
        return self.nombre


# ══════════════════════════════════════════════════════════════
# 3. REGLAS DE DOCUMENTO — Vigencias y obligatoriedad
# ══════════════════════════════════════════════════════════════

class ReglaDocumento(models.Model):
    """
    Define requisitos de documentación: vigencia máxima, si es
    obligatorio y la unidad de tiempo. Ej: Certificado de Dominio
    Vigente no debe tener más de 90 días.
    """

    class UnidadVigencia(models.TextChoices):
        DIAS = "dias", "Días"
        MESES = "meses", "Meses"
        VIGENTE = "vigente", "Debe estar vigente"

    nombre = models.CharField(max_length=100, unique=True)
    vigencia_maxima = models.IntegerField(
        help_text="0 = debe estar vigente al momento de presentación.",
    )
    unidad = models.CharField(
        max_length=20,
        choices=UnidadVigencia.choices,
        default=UnidadVigencia.DIAS,
    )
    obligatorio = models.BooleanField(default=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "regla de documento"
        verbose_name_plural = "reglas de documento"

    def __str__(self) -> str:
        return self.nombre


# ══════════════════════════════════════════════════════════════
# 4. PROYECTOS — Vinculados a EGIS y Constructora
# ══════════════════════════════════════════════════════════════

class Proyecto(models.Model):
    """
    Proyecto habitacional gestionado por una EGIS y construido
    por una Constructora. El campo `avance_pct` registra el
    progreso constructivo reportado por el ITO.
    """

    class EstadoProyecto(models.TextChoices):
        ACTIVO = "activo", "Activo"
        EN_TRAMITE = "en_tramite", "En trámite"
        FINALIZADO = "finalizado", "Finalizado"
        SUSPENDIDO = "suspendido", "Suspendido"

    nombre = models.CharField(max_length=150)
    egis = models.ForeignKey(
        Organizacion,
        on_delete=models.PROTECT,
        related_name="proyectos_como_egis",
        limit_choices_to={"tipo": "egis"},
        null=True,
        blank=True,
        help_text="EGIS responsable del proyecto.",
    )
    constructora = models.ForeignKey(
        Organizacion,
        on_delete=models.PROTECT,
        related_name="proyectos_como_constructora",
        limit_choices_to={"tipo": "constructora"},
        null=True,
        blank=True,
        help_text="Constructora asignada al proyecto.",
    )
    ubicacion = models.CharField(max_length=150, blank=True)
    comuna = models.CharField(max_length=100, blank=True)
    tipo = models.CharField(
        max_length=50,
        blank=True,
        help_text="Ej: Vivienda nueva, Mejoramiento, Ampliación",
    )
    clasificacion = models.CharField(
        max_length=80,
        blank=True,
        help_text="Ej: DS49 Título I, DS1 Tramo 1",
    )
    cantidad_beneficiarios = models.IntegerField(default=0)
    avance_pct = models.IntegerField(
        default=0,
        help_text="Porcentaje de avance constructivo (0-100).",
    )
    estado = models.CharField(
        max_length=30,
        choices=EstadoProyecto.choices,
        default=EstadoProyecto.ACTIVO,
    )
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "proyecto"
        verbose_name_plural = "proyectos"

    def __str__(self) -> str:
        return self.nombre


# ══════════════════════════════════════════════════════════════
# 5. BENEFICIARIOS — Con montos en DecimalField
# ══════════════════════════════════════════════════════════════

class Beneficiario(models.Model):
    """
    Persona natural postulante a subsidio habitacional.

    Campos numéricos clave:
      - rsh_pct: percentil RSH (Registro Social de Hogares), 0-100.
      - ahorro_uf / ahorro_minimo_uf: montos en UF como Decimal para
        permitir SUM, AVG y comparaciones directas en SQL.
    """

    class EstadoBeneficiario(models.TextChoices):
        APROBADO = "aprobado", "Aprobado"
        ALERTA = "alerta", "Alerta"
        PENDIENTE = "pendiente", "Pendiente"
        RECHAZADO = "rechazado", "Rechazado"

    proyecto = models.ForeignKey(
        Proyecto,
        on_delete=models.CASCADE,
        related_name="beneficiarios",
    )
    nombre = models.CharField(max_length=200)
    rut = models.CharField(
        max_length=12,
        help_text="RUT del beneficiario, formato 12.345.678-9",
    )
    telefono = models.CharField(max_length=30, blank=True)
    email = models.EmailField(blank=True)

    # ── Indicadores socioeconómicos ──────────────────────────
    rsh_pct = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Percentil RSH del hogar (0.00 – 100.00).",
    )
    ahorro_uf = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Ahorro acreditado del beneficiario, en UF.",
    )
    ahorro_minimo_uf = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Ahorro mínimo requerido según subsidio, en UF.",
    )

    # ── Relación con regla de subsidio sugerida por la IA ────
    subsidio_sugerido = models.ForeignKey(
        ReglaSubsidio,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="beneficiarios",
    )
    puntaje_match = models.IntegerField(
        null=True,
        blank=True,
        help_text="Puntaje de compatibilidad calculado por la IA.",
    )
    estado = models.CharField(
        max_length=20,
        choices=EstadoBeneficiario.choices,
        default=EstadoBeneficiario.PENDIENTE,
    )
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "beneficiario"
        verbose_name_plural = "beneficiarios"
        unique_together = ("proyecto", "rut")
        indexes = [
            models.Index(fields=["rut"], name="idx_beneficiario_rut"),
        ]

    def __str__(self) -> str:
        return f"{self.nombre} ({self.rut})"


# ══════════════════════════════════════════════════════════════
# 6. CARPETA — Expediente del beneficiario ante SERVIU
# ══════════════════════════════════════════════════════════════

class Carpeta(models.Model):
    """
    Agrupa todos los documentos de un beneficiario.
    Los flags booleanos reflejan los hitos del flujo SERVIU:
      1. Visto bueno ITO (avance obra)
      2. Check SEREMI (salubridad/químicos)
      3. Resolución SERVIU
      4. Informe universidad (silófagos, si aplica)
      5. Listo para facturar
    """

    class EstadoCarpeta(models.TextChoices):
        PENDIENTE = "pendiente", "Pendiente"
        EN_PROCESO = "en_proceso", "En proceso"
        VISADO = "visado", "Visado"
        LISTO_SERVIU = "listo_serviu", "Listo SERVIU"
        RECHAZADO = "rechazado", "Rechazado"

    beneficiario = models.OneToOneField(
        Beneficiario,
        on_delete=models.CASCADE,
        related_name="carpeta",
    )
    estado = models.CharField(
        max_length=20,
        choices=EstadoCarpeta.choices,
        default=EstadoCarpeta.PENDIENTE,
    )
    estado_subsidio = models.CharField(max_length=80, blank=True)
    monto_uf = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Monto total del subsidio asignado, en UF.",
    )

    # ── Hitos de aprobación ──────────────────────────────────
    visto_bueno_ito = models.BooleanField(default=False)
    check_seremi = models.BooleanField(default=False)
    resolucion = models.BooleanField(default=False)
    informe_universidad = models.BooleanField(
        default=False,
        help_text="Requerido para casos de silófagos (termitas).",
    )
    listo_para_facturar = models.BooleanField(default=False)

    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "carpeta"
        verbose_name_plural = "carpetas"

    def __str__(self) -> str:
        return f"Carpeta {self.id} — {self.beneficiario}"


# ══════════════════════════════════════════════════════════════
# 7. DOCUMENTOS — Con campos para IA (OCR + validación)
# ══════════════════════════════════════════════════════════════

class Documento(models.Model):
    """
    Cada archivo subido a la carpeta del beneficiario.

    Campos de IA:
      - extraccion_json: resultado crudo del OCR (JSONField).
      - score_confianza: nivel de certeza de la IA (0.0 – 1.0).
      - validacion_humana: null = sin revisar, True = aprobado
        manualmente, False = rechazado por el operador.
    """

    class EstadoDocumento(models.TextChoices):
        APROBADO = "aprobado", "Aprobado"
        RECHAZADO = "rechazado", "Rechazado"
        ALERTA = "alerta", "Alerta"
        PENDIENTE = "pendiente", "Pendiente"

    class Vigencia(models.TextChoices):
        VIGENTE = "vigente", "Vigente"
        POR_VENCER = "por_vencer", "Por vencer"
        VENCIDO = "vencido", "Vencido"

    carpeta = models.ForeignKey(
        Carpeta,
        on_delete=models.CASCADE,
        related_name="documentos",
    )
    regla_documento = models.ForeignKey(
        ReglaDocumento,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="documentos",
    )
    nombre_archivo = models.CharField(max_length=255)
    ruta_archivo = models.CharField(
        max_length=500,
        blank=True,
        help_text="Ruta en Supabase Storage o filesystem local.",
    )
    tipo_documento = models.CharField(max_length=100)
    folio = models.IntegerField(null=True, blank=True)
    estado = models.CharField(
        max_length=20,
        choices=EstadoDocumento.choices,
        default=EstadoDocumento.PENDIENTE,
    )
    vigencia = models.CharField(
        max_length=20,
        choices=Vigencia.choices,
        null=True,
        blank=True,
    )

    # ── Campos de Inteligencia Artificial ────────────────────
    extraccion_json = models.JSONField(
        null=True,
        blank=True,
        help_text="Datos extraídos por OCR/IA (RUT, fechas, montos, etc.).",
    )
    score_confianza = models.FloatField(
        null=True,
        blank=True,
        help_text="Confianza de la IA en la extracción (0.0 – 1.0).",
    )
    validacion_humana = models.BooleanField(
        null=True,
        blank=True,
        help_text=(
            "null = sin revisar; True = aprobado por operador; "
            "False = rechazado por operador."
        ),
    )
    nota_rechazo = models.TextField(
        blank=True,
        help_text="Motivo de rechazo si estado = rechazado.",
    )
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "documento"
        verbose_name_plural = "documentos"

    def __str__(self) -> str:
        return self.nombre_archivo


# ══════════════════════════════════════════════════════════════
# 8. INFORMES TÉCNICOS DE TERCEROS
# ══════════════════════════════════════════════════════════════

class InformeTercero(models.Model):
    """
    Informes emitidos por entidades externas (universidades, SEREMI)
    que son condición para la aprobación del pago del subsidio.

    Ejemplo clave: el subsidio de silófagos (DS49 / DS1) requiere
    un informe de una universidad acreditada que certifique la
    ausencia o tratamiento de termitas en la vivienda.
    """

    class TipoInforme(models.TextChoices):
        INFORME_PLAGAS = "informe_plagas", "Informe Plagas (silófagos)"
        SEREMI_QUIMICOS = "seremi_quimicos", "SEREMI – Riesgo Químico"
        LABORATORIO_SUELOS = "laboratorio_suelos", "Laboratorio de Suelos"
        OTRO = "otro", "Otro"

    carpeta = models.ForeignKey(
        Carpeta,
        on_delete=models.CASCADE,
        related_name="informes_terceros",
    )
    tipo_informe = models.CharField(
        max_length=80,
        choices=TipoInforme.choices,
    )
    entidad_emisora = models.ForeignKey(
        Organizacion,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="informes_emitidos",
        help_text="Universidad, SEREMI o laboratorio que emite el informe.",
    )
    nombre_archivo = models.CharField(max_length=255, blank=True)
    ruta_archivo = models.CharField(max_length=500, blank=True)
    fecha_emision = models.DateField(
        null=True,
        blank=True,
        help_text="Fecha de emisión del informe.",
    )
    fecha_vencimiento = models.DateField(
        null=True,
        blank=True,
        help_text="Fecha de vencimiento del informe (si aplica).",
    )
    resultado = models.TextField(
        blank=True,
        help_text="Resumen del resultado o conclusión técnica.",
    )
    seremi_aprobado = models.BooleanField(default=False)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "informe de tercero"
        verbose_name_plural = "informes de terceros"

    def __str__(self) -> str:
        return f"{self.get_tipo_informe_display()} — Carpeta {self.carpeta_id}"


# ══════════════════════════════════════════════════════════════
# 9. LOG DE VISADO — Auditoría del proceso de aprobación
# ══════════════════════════════════════════════════════════════

class LogVisado(models.Model):
    """
    Registro inmutable de cada acción de visado.
    Responde a: ¿quién aprobó/rechazó qué documento, cuándo,
    y bajo qué criterio (IA o humano)?

    Se usa para trazabilidad ante SERVIU y auditorías internas.
    """

    class AccionVisado(models.TextChoices):
        APROBADO = "aprobado", "Aprobado"
        RECHAZADO = "rechazado", "Rechazado"
        OBSERVADO = "observado", "Observado"
        REVERTIDO = "revertido", "Revertido"

    class OrigenAccion(models.TextChoices):
        IA = "ia", "Inteligencia Artificial"
        HUMANO = "humano", "Operador Humano"
        SISTEMA = "sistema", "Proceso Automático"

    documento = models.ForeignKey(
        Documento,
        on_delete=models.CASCADE,
        related_name="logs_visado",
    )
    accion = models.CharField(
        max_length=20,
        choices=AccionVisado.choices,
    )
    origen = models.CharField(
        max_length=20,
        choices=OrigenAccion.choices,
        default=OrigenAccion.HUMANO,
    )
    usuario = models.CharField(
        max_length=150,
        blank=True,
        help_text="Username o email del operador. Vacío si origen = IA.",
    )
    detalle = models.TextField(
        blank=True,
        help_text="Motivo, observación o nota de la acción.",
    )
    score_ia = models.FloatField(
        null=True,
        blank=True,
        help_text="Score de confianza de la IA al momento del visado.",
    )
    metadata = models.JSONField(
        null=True,
        blank=True,
        help_text="Datos adicionales del contexto de visado.",
    )
    creado_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "log de visado"
        verbose_name_plural = "logs de visado"
        ordering = ["-creado_en"]
        indexes = [
            models.Index(
                fields=["documento", "-creado_en"],
                name="idx_log_visado_doc_fecha",
            ),
        ]

    def __str__(self) -> str:
        return (
            f"{self.get_accion_display()} — Doc {self.documento_id} "
            f"por {self.usuario or self.get_origen_display()} "
            f"({self.creado_en:%Y-%m-%d %H:%M})"
        )


# ══════════════════════════════════════════════════════════════
# 10. REGISTRO DE CONTACTO — Seguimiento de notificaciones
# ══════════════════════════════════════════════════════════════

class RegistroContacto(models.Model):
    """Seguimiento de contactos con beneficiarios por documentos faltantes."""

    class Urgencia(models.TextChoices):
        CRITICAL = "critical", "Crítica"
        WARNING = "warning", "Advertencia"
        INFO = "info", "Informativa"

    beneficiario = models.ForeignKey(
        Beneficiario,
        on_delete=models.CASCADE,
        related_name="contactos",
    )
    documentos_faltantes = models.JSONField(default=list)
    urgencia = models.CharField(
        max_length=20,
        choices=Urgencia.choices,
    )
    ultimo_contacto_en = models.DateTimeField(null=True, blank=True)
    mensaje_enviado_en = models.DateTimeField(null=True, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "registro de contacto"
        verbose_name_plural = "registros de contacto"

    def __str__(self) -> str:
        return f"Contacto {self.id} — {self.beneficiario}"


# ══════════════════════════════════════════════════════════════
# 11. ALERTAS — Documentos por vencer o vencidos
# ══════════════════════════════════════════════════════════════

class Alerta(models.Model):
    """Alerta generada automáticamente cuando un documento está por vencer."""

    class Severidad(models.TextChoices):
        CRITICAL = "critical", "Crítica"
        WARNING = "warning", "Advertencia"

    beneficiario = models.ForeignKey(
        Beneficiario,
        on_delete=models.CASCADE,
        related_name="alertas",
    )
    documento = models.ForeignKey(
        Documento,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="alertas",
    )
    nombre_documento = models.CharField(max_length=100)
    dias_restantes = models.IntegerField()
    severidad = models.CharField(
        max_length=20,
        choices=Severidad.choices,
    )
    resuelta_en = models.DateTimeField(null=True, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "alerta"
        verbose_name_plural = "alertas"

    def __str__(self) -> str:
        return f"Alerta {self.id} — {self.nombre_documento}"


# ══════════════════════════════════════════════════════════════
# 12. MÓDULOS DE IA — Configuración del motor de procesamiento
# ══════════════════════════════════════════════════════════════

class ModuloIA(models.Model):
    """
    Catálogo de módulos de IA disponibles (OCR, clasificador,
    validador de vigencia, etc.). Permite activar/desactivar
    y versionar cada módulo sin desplegar código nuevo.
    """

    clave = models.CharField(max_length=80, unique=True)
    nombre_mostrar = models.CharField(max_length=100)
    version = models.CharField(max_length=20)
    estado = models.CharField(max_length=30, default="Activo")
    config_json = models.JSONField(
        null=True,
        blank=True,
        help_text="Configuración específica del módulo (prompts, umbrales, etc.).",
    )
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "módulo IA"
        verbose_name_plural = "módulos IA"

    def __str__(self) -> str:
        return self.nombre_mostrar

