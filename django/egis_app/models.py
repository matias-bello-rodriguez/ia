"""
models.py — Esquema maestro de la plataforma EGIS Pro (Biobío).

Actúa como fuente de verdad (IaC) para la base de datos en Supabase.
Las migraciones de Django crean y actualizan las tablas de PostgreSQL
de forma declarativa, análogo a cómo Terraform maneja infraestructura.

CONVENCIONES:
  - Todas las PKs son UUIDField → seguridad, no-predecibilidad, merge-safe.
  - Todos los montos se guardan como DecimalField en UF (Unidad de Fomento).
  - Arquitectura multitenant basada en Organizacion.

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

import uuid
from datetime import timedelta

from django.conf import settings
from django.db import models
from django.utils import timezone


# ══════════════════════════════════════════════════════════════
# 1. ORGANIZACIONES — Multitenant (EGIS / Constructora / Lab)
# ══════════════════════════════════════════════════════════════

class Organizacion(models.Model):
    """
    Representa una entidad participante del ecosistema habitacional.
    El campo ``tipo`` separa EGIS de Constructoras y permite agregar
    otras entidades futuras (laboratorios, universidades, etc.).
    """

    class TipoOrganizacion(models.TextChoices):
        EGIS = "egis", "EGIS"
        CONSTRUCTORA = "constructora", "Constructora"
        LABORATORIO = "laboratorio", "Laboratorio / Universidad"
        OTRO = "otro", "Otro"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
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
# 1b. PERFILES DE USUARIO — Dos Caras (EGIS / Constructora)
# ══════════════════════════════════════════════════════════════

class PerfilUsuario(models.Model):
    """
    Extiende al User de Django con organización y rol.
    Arquitectura de Dos Caras:
      - EGIS: carga documentos, usa IA, aplica firma HITO.
      - CONSTRUCTORA: monitorea avance, ve semáforo, descarga informes.
      - ADMIN: acceso completo al sistema.

    Custom Permissions:
      - puede_visar_documentos:  EGIS operador y HITO.
      - puede_firmar_hito:       Solo EGIS HITO — firma final para SERVIU.
      - puede_ver_semaforo:      Constructora y EGIS.
      - puede_descargar_informes: Constructora admin y EGIS HITO.
      - puede_cargar_documentos: EGIS operador y admin.
    """

    class Rol(models.TextChoices):
        EGIS_OPERADOR = "egis_operador", "EGIS – Operador"
        EGIS_HITO = "egis_hito", "EGIS – Firma HITO"
        CONSTRUCTORA_MONITOR = "constructora_monitor", "Constructora – Monitor"
        CONSTRUCTORA_ADMIN = "constructora_admin", "Constructora – Admin"
        ADMIN = "admin", "Administrador"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="perfil",
    )
    organizacion = models.ForeignKey(
        Organizacion,
        on_delete=models.PROTECT,
        related_name="usuarios",
    )
    rol = models.CharField(
        max_length=30,
        choices=Rol.choices,
        db_index=True,
    )
    activo = models.BooleanField(default=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "perfil de usuario"
        verbose_name_plural = "perfiles de usuario"
        permissions = [
            ("puede_visar_documentos", "Puede visar documentos con IA"),
            ("puede_firmar_hito", "Puede aplicar firma HITO para SERVIU"),
            ("puede_ver_semaforo", "Puede ver semáforo de estados"),
            ("puede_descargar_informes", "Puede descargar informes de pago"),
            ("puede_cargar_documentos", "Puede cargar documentos"),
        ]

    @property
    def es_egis(self) -> bool:
        return self.rol in (self.Rol.EGIS_OPERADOR, self.Rol.EGIS_HITO)

    @property
    def es_hito(self) -> bool:
        return self.rol == self.Rol.EGIS_HITO

    @property
    def es_constructora(self) -> bool:
        return self.rol in (self.Rol.CONSTRUCTORA_MONITOR, self.Rol.CONSTRUCTORA_ADMIN)

    def __str__(self) -> str:
        return f"{self.user.get_full_name() or self.user.username} — {self.get_rol_display()}"


# ══════════════════════════════════════════════════════════════
# 2. REGLAS DE SUBSIDIO — Parámetros oficiales MINVU
# ══════════════════════════════════════════════════════════════

class ReglaSubsidio(models.Model):
    """
    Cada fila configura un programa de subsidio (DS49, DS1, etc.).
    Montos en UF como DecimalField para cálculos aritméticos directos
    en la BD y evitar errores de parseo.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
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
        ordering = ["nombre"]

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

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
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
        ordering = ["nombre"]

    def __str__(self) -> str:
        return self.nombre


# ══════════════════════════════════════════════════════════════
# 4. PROYECTOS — Vinculan EGIS ↔ Constructora (simbiosis)
# ══════════════════════════════════════════════════════════════

class Proyecto(models.Model):
    """
    Proyecto habitacional gestionado por una EGIS y construido
    por una Constructora. El campo ``avance_pct`` registra el
    progreso constructivo reportado por el ITO.
    """

    class EstadoProyecto(models.TextChoices):
        ACTIVO = "activo", "Activo"
        EN_TRAMITE = "en_tramite", "En trámite"
        FINALIZADO = "finalizado", "Finalizado"
        SUSPENDIDO = "suspendido", "Suspendido"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
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
    comite_vecinal = models.CharField(
        max_length=200,
        blank=True,
        help_text="Nombre del comité vecinal o de vivienda.",
    )
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
        db_index=True,
    )
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "proyecto"
        verbose_name_plural = "proyectos"
        ordering = ["-creado_en"]

    def __str__(self) -> str:
        return self.nombre


# ══════════════════════════════════════════════════════════════
# 5. BENEFICIARIOS — Con montos en DecimalField (UF)
# ══════════════════════════════════════════════════════════════

class Beneficiario(models.Model):
    """
    Persona natural postulante a subsidio habitacional.

    Campos numéricos clave:
      - rsh_pct: percentil RSH (Registro Social de Hogares), 0-100.
      - ahorro_uf / ahorro_minimo_uf: montos en UF como Decimal para
        SUM, AVG y comparaciones directas en SQL.
    """

    class EstadoBeneficiario(models.TextChoices):
        APROBADO = "aprobado", "Aprobado"
        ALERTA = "alerta", "Alerta"
        PENDIENTE = "pendiente", "Pendiente"
        RECHAZADO = "rechazado", "Rechazado"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
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
        db_index=True,
    )
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "beneficiario"
        verbose_name_plural = "beneficiarios"
        unique_together = ("proyecto", "rut")
        ordering = ["nombre"]
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
      5. Listo para facturar (estado de pago constructora)

    Los montos monto_contrato_uf y monto_resolucion_uf se cruzan
    automáticamente para detectar inconsistencias.
    """

    class EstadoCarpeta(models.TextChoices):
        PENDIENTE = "pendiente", "Pendiente"
        EN_PROCESO = "en_proceso", "En proceso"
        VISADO = "visado", "Visado"
        LISTO_SERVIU = "listo_serviu", "Listo SERVIU"
        RECHAZADO = "rechazado", "Rechazado"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    beneficiario = models.OneToOneField(
        Beneficiario,
        on_delete=models.CASCADE,
        related_name="carpeta",
    )
    estado = models.CharField(
        max_length=20,
        choices=EstadoCarpeta.choices,
        default=EstadoCarpeta.PENDIENTE,
        db_index=True,
    )
    estado_subsidio = models.CharField(max_length=80, blank=True)
    monto_uf = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Monto total del subsidio asignado, en UF.",
    )
    monto_contrato_uf = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Monto del contrato en UF (extraído por IA o manual).",
    )
    monto_resolucion_uf = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Monto de la Resolución Exenta en UF (extraído por IA o manual).",
    )
    alerta_monto_inconsistente = models.BooleanField(
        default=False,
        help_text="True si monto_contrato_uf ≠ monto_resolucion_uf.",
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

    # ── Firma HITO ───────────────────────────────────────────
    firma_hito_usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="carpetas_firmadas",
        help_text="Usuario HITO que firmó la aprobación para SERVIU.",
    )
    firma_hito_en = models.DateTimeField(
        null=True,
        blank=True,
        help_text="Fecha/hora de la firma HITO.",
    )

    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "carpeta"
        verbose_name_plural = "carpetas"
        ordering = ["beneficiario__nombre"]

    def __str__(self) -> str:
        return f"Carpeta {self.id!s:.8} — {self.beneficiario}"


# ══════════════════════════════════════════════════════════════
# 7. DOCUMENTOS — El Semáforo (ROJO / AMARILLO / VERDE)
# ══════════════════════════════════════════════════════════════

class Documento(models.Model):
    """
    Cada archivo subido a la carpeta del beneficiario.
    El corazón del sistema: el semáforo documental.

    Estados de semáforo:
      - ROJO:     Faltante, rechazado o vencido.
      - AMARILLO: En proceso IA o por vencer (≤15 días).
      - VERDE:    Visado OK, aprobado y vigente.

    Campos de IA:
      - extraccion_json: resultado crudo del OCR (JSONField/JSONB).
      - score_confianza:  nivel de certeza de la IA (0.0 – 1.0).
      - ia_procesado:     true si la IA ya procesó este documento.
      - resumen_ejecutivo: resumen ejecutivo generado por la IA.
      - validacion_humana: null = sin revisar, True = aprobado, False = rechazado.

    Visado:
      - revisado_por_hito: FK al usuario HITO que visó el documento.
      - fecha_visado:      fecha/hora del visado HITO.
    """

    class EstadoDocumento(models.TextChoices):
        APROBADO = "aprobado", "Aprobado (VERDE)"
        RECHAZADO = "rechazado", "Rechazado (ROJO)"
        ALERTA = "alerta", "Alerta (AMARILLO)"
        PENDIENTE = "pendiente", "Pendiente (ROJO)"

    class Vigencia(models.TextChoices):
        VIGENTE = "vigente", "Vigente"
        POR_VENCER = "por_vencer", "Por vencer"
        VENCIDO = "vencido", "Vencido"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
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
    tipo_documento = models.CharField(max_length=100, db_index=True)
    folio = models.IntegerField(null=True, blank=True)
    estado = models.CharField(
        max_length=20,
        choices=EstadoDocumento.choices,
        default=EstadoDocumento.PENDIENTE,
        db_index=True,
    )
    vigencia = models.CharField(
        max_length=20,
        choices=Vigencia.choices,
        null=True,
        blank=True,
    )

    # ── Fechas del documento ──────────────────────────────────
    fecha_emision = models.DateField(
        null=True,
        blank=True,
        help_text="Fecha de emisión del documento (extraída por IA o manual).",
    )
    fecha_vencimiento = models.DateField(
        null=True,
        blank=True,
        help_text="Fecha de vencimiento calculada según regla de vigencia.",
    )
    dias_restantes = models.IntegerField(
        null=True,
        blank=True,
        help_text="Días restantes antes de que el documento venza.",
    )

    # ── Campos de Inteligencia Artificial ────────────────────
    extraccion_json = models.JSONField(
        null=True,
        blank=True,
        help_text="Datos extraídos por OCR/IA en JSONB (RUT, fechas, montos, etc.).",
    )
    resumen_ejecutivo = models.TextField(
        blank=True,
        help_text="Resumen ejecutivo generado por la IA (breve, estilo reporte).",
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
    ia_procesado = models.BooleanField(
        default=False,
        help_text="True si la IA ya procesó este documento.",
    )
    nota_rechazo = models.TextField(
        blank=True,
        help_text="Motivo de rechazo si estado = rechazado.",
    )

    # ── Visado HITO ──────────────────────────────────────────
    revisado_por_hito = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="documentos_visados",
        help_text="Usuario HITO que revisó/visó este documento.",
    )
    fecha_visado = models.DateTimeField(
        null=True,
        blank=True,
        help_text="Fecha/hora en que el HITO visó el documento.",
    )

    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "documento"
        verbose_name_plural = "documentos"
        ordering = ["folio", "creado_en"]

    def calcular_vigencia(self) -> None:
        """Recalcula ``dias_restantes`` y ``vigencia`` según regla asociada."""
        if not self.fecha_emision or not self.regla_documento:
            return
        regla = self.regla_documento
        if regla.unidad == ReglaDocumento.UnidadVigencia.DIAS:
            venc = self.fecha_emision + timedelta(days=regla.vigencia_maxima)
        elif regla.unidad == ReglaDocumento.UnidadVigencia.MESES:
            venc = self.fecha_emision + timedelta(days=regla.vigencia_maxima * 30)
        else:
            # "vigente" — no vence
            self.vigencia = self.Vigencia.VIGENTE
            self.dias_restantes = 999
            return
        hoy = timezone.now().date()
        self.fecha_vencimiento = venc
        self.dias_restantes = (venc - hoy).days
        if self.dias_restantes < 0:
            self.vigencia = self.Vigencia.VENCIDO
        elif self.dias_restantes <= 15:
            self.vigencia = self.Vigencia.POR_VENCER
        else:
            self.vigencia = self.Vigencia.VIGENTE

    @property
    def semaforo(self) -> str:
        """
        Semáforo documental:
          ROJO    → rechazado, vencido o pendiente.
          AMARILLO → por vencer o con alerta.
          VERDE   → aprobado y vigente.
        """
        if self.estado in (self.EstadoDocumento.RECHAZADO,):
            return "rojo"
        if self.vigencia == self.Vigencia.VENCIDO:
            return "rojo"
        if self.estado == self.EstadoDocumento.PENDIENTE:
            return "rojo"
        if self.vigencia == self.Vigencia.POR_VENCER:
            return "amarillo"
        if self.estado == self.EstadoDocumento.ALERTA:
            return "amarillo"
        if self.estado == self.EstadoDocumento.APROBADO:
            return "verde"
        return "amarillo"

    def __str__(self) -> str:
        return self.nombre_archivo


# ══════════════════════════════════════════════════════════════
# 8. INFORMES TÉCNICOS DE TERCEROS (Silófagos / SEREMI)
# ══════════════════════════════════════════════════════════════

class InformeTercero(models.Model):
    """
    Informes emitidos por entidades externas (universidades, SEREMI)
    que son condición para la aprobación del pago del subsidio.

    Ejemplo clave: el subsidio de silófagos (DS49 / DS1) requiere
    un informe de una universidad acreditada (UBB o UdeC) que certifique
    la ausencia o tratamiento de termitas en la vivienda.
    """

    class TipoInforme(models.TextChoices):
        INFORME_PLAGAS = "informe_plagas", "Informe Plagas (silófagos)"
        SEREMI_QUIMICOS = "seremi_quimicos", "SEREMI – Riesgo Químico"
        LABORATORIO_SUELOS = "laboratorio_suelos", "Laboratorio de Suelos"
        OTRO = "otro", "Otro"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    carpeta = models.ForeignKey(
        Carpeta,
        on_delete=models.CASCADE,
        related_name="informes_terceros",
    )
    tipo_informe = models.CharField(
        max_length=80,
        choices=TipoInforme.choices,
        db_index=True,
    )
    entidad_emisora = models.ForeignKey(
        Organizacion,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="informes_emitidos",
        limit_choices_to={"tipo__in": ["laboratorio", "otro"]},
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
        ordering = ["-creado_en"]

    def __str__(self) -> str:
        return f"{self.get_tipo_informe_display()} — Carpeta {self.carpeta_id!s:.8}"


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

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
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
            f"{self.get_accion_display()} — Doc {self.documento_id!s:.8} "
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

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
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
        ordering = ["-creado_en"]

    def __str__(self) -> str:
        return f"Contacto {self.id!s:.8} — {self.beneficiario}"


# ══════════════════════════════════════════════════════════════
# 11. ALERTAS — Documentos por vencer o vencidos
# ══════════════════════════════════════════════════════════════

class Alerta(models.Model):
    """Alerta generada automáticamente cuando un documento está por vencer."""

    class Severidad(models.TextChoices):
        CRITICAL = "critical", "Crítica"
        WARNING = "warning", "Advertencia"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
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
        ordering = ["-creado_en"]

    def __str__(self) -> str:
        return f"Alerta {self.id!s:.8} — {self.nombre_documento}"


# ══════════════════════════════════════════════════════════════
# 12. MÓDULOS DE IA — Configuración del motor de procesamiento
# ══════════════════════════════════════════════════════════════

class ModuloIA(models.Model):
    """
    Catálogo de módulos de IA disponibles (OCR, clasificador,
    validador de vigencia, etc.). Permite activar/desactivar
    y versionar cada módulo sin desplegar código nuevo.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
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
        ordering = ["nombre_mostrar"]

    def __str__(self) -> str:
        return self.nombre_mostrar


# ══════════════════════════════════════════════════════════════
# 13. AUDITORÍA DE ESTADOS — Trazabilidad inmutable
# ══════════════════════════════════════════════════════════════

class AuditoriaEstado(models.Model):
    """
    Registro inmutable de todo cambio de estado en carpetas y documentos.
    Cumple con la Regla de Oro: todo cambio queda registrado para
    evitar "cuentos" entre empresas.

    ``entidad_id`` se guarda como UUIDField porque todas las PKs son UUID.
    """

    class TipoEntidad(models.TextChoices):
        CARPETA = "carpeta", "Carpeta"
        DOCUMENTO = "documento", "Documento"
        PROYECTO = "proyecto", "Proyecto"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tipo_entidad = models.CharField(
        max_length=20,
        choices=TipoEntidad.choices,
    )
    entidad_id = models.UUIDField(
        help_text="PK (UUID) de la entidad afectada.",
    )
    estado_anterior = models.CharField(max_length=50, blank=True)
    estado_nuevo = models.CharField(max_length=50)
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="auditorias",
    )
    organizacion = models.ForeignKey(
        Organizacion,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="auditorias",
    )
    detalle = models.TextField(
        blank=True,
        help_text="Descripción del cambio o motivo.",
    )
    metadata = models.JSONField(
        null=True,
        blank=True,
        help_text="Datos contextuales adicionales.",
    )
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "auditoría de estado"
        verbose_name_plural = "auditorías de estado"
        ordering = ["-creado_en"]
        indexes = [
            models.Index(
                fields=["tipo_entidad", "entidad_id", "-creado_en"],
                name="idx_auditoria_entidad",
            ),
        ]

    def __str__(self) -> str:
        return (
            f"{self.get_tipo_entidad_display()} #{self.entidad_id!s:.8}: "
            f"{self.estado_anterior} → {self.estado_nuevo}"
        )

