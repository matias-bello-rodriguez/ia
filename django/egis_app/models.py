from __future__ import annotations

from django.db import models


class ReglaSubsidio(models.Model):
  nombre = models.CharField(max_length=20, unique=True)
  descripcion = models.CharField(max_length=255, blank=True)
  ahorro_minimo_uf = models.CharField(max_length=20)
  rsh_maximo_pct = models.CharField(max_length=10)
  puntaje_corte = models.IntegerField()
  tope_uf = models.CharField(max_length=20)
  fuente = models.CharField(max_length=100, blank=True)
  ultima_actualizacion = models.DateField(auto_now=True)
  creado_en = models.DateTimeField(auto_now_add=True)
  actualizado_en = models.DateTimeField(auto_now=True)

  def __str__(self) -> str:
      return self.nombre


class ReglaDocumento(models.Model):
  nombre = models.CharField(max_length=100, unique=True)
  vigencia_maxima = models.IntegerField(help_text="0 = debe estar vigente")
  unidad = models.CharField(max_length=20)  # dias, meses, vigente
  obligatorio = models.BooleanField(default=True)
  creado_en = models.DateTimeField(auto_now_add=True)

  def __str__(self) -> str:
      return self.nombre


class Proyecto(models.Model):
  nombre = models.CharField(max_length=150)
  ubicacion = models.CharField(max_length=150, blank=True)
  tipo = models.CharField(max_length=50, blank=True)
  clasificacion = models.CharField(max_length=80, blank=True)
  cantidad_beneficiarios = models.IntegerField(default=0)
  avance_pct = models.IntegerField(default=0)
  estado = models.CharField(max_length=30, default="activo")
  creado_en = models.DateTimeField(auto_now_add=True)
  actualizado_en = models.DateTimeField(auto_now=True)

  def __str__(self) -> str:
      return self.nombre


class Beneficiario(models.Model):
  ESTADO_CHOICES = [
      ("aprobado", "Aprobado"),
      ("alerta", "Alerta"),
      ("pendiente", "Pendiente"),
  ]

  proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE, related_name="beneficiarios")
  nombre = models.CharField(max_length=200)
  rut = models.CharField(max_length=20)
  telefono = models.CharField(max_length=30, blank=True)
  rsh_pct = models.CharField(max_length=10, blank=True)
  ahorro_uf = models.CharField(max_length=20, blank=True)
  ahorro_minimo_uf = models.CharField(max_length=20, blank=True)
  subsidio_sugerido = models.ForeignKey(
      ReglaSubsidio, on_delete=models.SET_NULL, null=True, blank=True, related_name="beneficiarios"
  )
  puntaje_match = models.IntegerField(null=True, blank=True)
  estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default="pendiente")
  creado_en = models.DateTimeField(auto_now_add=True)
  actualizado_en = models.DateTimeField(auto_now=True)

  class Meta:
      unique_together = ("proyecto", "rut")

  def __str__(self) -> str:
      return f"{self.nombre} ({self.rut})"


class Carpeta(models.Model):
  ESTADO_CHOICES = [
      ("pendiente", "Pendiente"),
      ("en_proceso", "En proceso"),
      ("visado", "Visado"),
      ("listo_serviu", "Listo SERVIU"),
      ("rechazado", "Rechazado"),
  ]

  beneficiario = models.OneToOneField(Beneficiario, on_delete=models.CASCADE, related_name="carpeta")
  estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default="pendiente")
  estado_subsidio = models.CharField(max_length=80, blank=True)
  monto_uf = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
  visto_bueno_ito = models.BooleanField(default=False)
  check_seremi = models.BooleanField(default=False)
  resolucion = models.BooleanField(default=False)
  informe_universidad = models.BooleanField(default=False)
  listo_para_facturar = models.BooleanField(default=False)
  creado_en = models.DateTimeField(auto_now_add=True)
  actualizado_en = models.DateTimeField(auto_now=True)

  def __str__(self) -> str:
      return f"Carpeta {self.id} - {self.beneficiario}"


class Documento(models.Model):
  ESTADO_CHOICES = [
      ("aprobado", "Aprobado"),
      ("rechazado", "Rechazado"),
      ("alerta", "Alerta"),
  ]
  VIGENCIA_CHOICES = [
      ("vigente", "Vigente"),
      ("por_vencer", "Por vencer"),
      ("vencido", "Vencido"),
  ]

  carpeta = models.ForeignKey(Carpeta, on_delete=models.CASCADE, related_name="documentos")
  regla_documento = models.ForeignKey(
      ReglaDocumento, on_delete=models.SET_NULL, null=True, blank=True, related_name="documentos"
  )
  nombre_archivo = models.CharField(max_length=255)
  ruta_archivo = models.CharField(max_length=500, blank=True)
  tipo_documento = models.CharField(max_length=100)
  folio = models.IntegerField(null=True, blank=True)
  estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default="aprobado")
  vigencia = models.CharField(max_length=20, choices=VIGENCIA_CHOICES, null=True, blank=True)
  extraccion_json = models.JSONField(null=True, blank=True)
  nota_rechazo = models.TextField(blank=True)
  creado_en = models.DateTimeField(auto_now_add=True)
  actualizado_en = models.DateTimeField(auto_now=True)

  def __str__(self) -> str:
      return self.nombre_archivo


class InformeTercero(models.Model):
  TIPO_CHOICES = [
      ("informe_plagas", "Informe Plagas"),
      ("seremi_quimicos", "Seremi Químicos"),
      ("otro", "Otro"),
  ]

  carpeta = models.ForeignKey(Carpeta, on_delete=models.CASCADE, related_name="informes_terceros")
  tipo_informe = models.CharField(max_length=80, choices=TIPO_CHOICES)
  nombre_archivo = models.CharField(max_length=255, blank=True)
  ruta_archivo = models.CharField(max_length=500, blank=True)
  seremi_aprobado = models.BooleanField(default=False)
  creado_en = models.DateTimeField(auto_now_add=True)
  actualizado_en = models.DateTimeField(auto_now=True)

  def __str__(self) -> str:
      return f"{self.tipo_informe} - {self.carpeta_id}"


class RegistroContacto(models.Model):
  URGENCIA_CHOICES = [
      ("critical", "Crítica"),
      ("warning", "Advertencia"),
  ]

  beneficiario = models.ForeignKey(Beneficiario, on_delete=models.CASCADE, related_name="contactos")
  documentos_faltantes = models.JSONField(default=list)
  urgencia = models.CharField(max_length=20, choices=URGENCIA_CHOICES)
  ultimo_contacto_en = models.DateTimeField(null=True, blank=True)
  mensaje_enviado_en = models.DateTimeField(null=True, blank=True)
  creado_en = models.DateTimeField(auto_now_add=True)
  actualizado_en = models.DateTimeField(auto_now=True)

  def __str__(self) -> str:
      return f"Contacto {self.id} - {self.beneficiario}"


class Alerta(models.Model):
  SEVERIDAD_CHOICES = [
      ("critical", "Crítica"),
      ("warning", "Advertencia"),
  ]

  beneficiario = models.ForeignKey(Beneficiario, on_delete=models.CASCADE, related_name="alertas")
  documento = models.ForeignKey(Documento, on_delete=models.SET_NULL, null=True, blank=True, related_name="alertas")
  nombre_documento = models.CharField(max_length=100)
  dias_restantes = models.IntegerField()
  severidad = models.CharField(max_length=20, choices=SEVERIDAD_CHOICES)
  resuelta_en = models.DateTimeField(null=True, blank=True)
  creado_en = models.DateTimeField(auto_now_add=True)

  def __str__(self) -> str:
      return f"Alerta {self.id} - {self.nombre_documento}"


class ModuloIA(models.Model):
  clave = models.CharField(max_length=80, unique=True)
  nombre_mostrar = models.CharField(max_length=100)
  version = models.CharField(max_length=20)
  estado = models.CharField(max_length=30, default="Activo")
  config_json = models.JSONField(null=True, blank=True)
  actualizado_en = models.DateTimeField(auto_now=True)

  def __str__(self) -> str:
      return self.nombre_mostrar

