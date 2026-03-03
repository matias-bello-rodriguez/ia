/** Modelos usados en el frontend (compatibles con vistas y mappers). */

export interface MetricItem {
  title: string;
  value: string;
  subtitle: string;
  trend: string;
  icon: string;
}

export interface BarDataItem {
  name: string;
  value: number;
  fill?: string;
}

export interface PieDataItem {
  name: string;
  value: number;
  color?: string;
}

export interface DashboardAlert {
  beneficiary: string;
  rut: string;
  document: string;
  daysLeft: number;
  committee: string;
  severity: 'critical' | 'warning';
}

export interface Project {
  id: string;
  name: string;
  location: string;
  type: string;
  classification: string;
  beneficiaries: number;
  progress: number;
  status?: string;
}

export type BeneficiaryStatus = 'approved' | 'pending' | 'alert';

export interface Beneficiary {
  id?: string;
  name: string;
  rut: string;
  rsh: string;
  savings: string;
  minSavings: string;
  suggestedSubsidy: string;
  matchScore: number;
  status: BeneficiaryStatus;
  committee: string;
  phone?: string;
}

export type Semaforo = 'rojo' | 'amarillo' | 'verde';

export interface DocQueueItem {
  id?: string;
  name: string;
  type: string;
  status: 'approved' | 'rejected' | 'alert';
  vigencia?: 'vigente' | 'por_vencer' | 'vencido';
  semaforo?: Semaforo;
  diasRestantes?: number;
  fechaVencimiento?: string;
  iaProcesado?: boolean;
}

export interface ExtractedField {
  label: string;
  value: string;
  status: 'approved' | 'rejected' | 'alert';
  note?: string;
}

export interface VisadoResponse {
  resultados: ExtractedField[];
  resumen_ejecutivo?: string;
  score_confianza?: number;
  alertas_monto?: string[];
}

export interface ReporteRow {
  id: string;
  beneficiario: string;
  comite: string;
  estadoSubsidio: string;
  montoUF: string;
  montoContratoUF?: string;
  montoResolucionUF?: string;
  alertaMontoInconsistente?: boolean;
  vistoBuenoITO: boolean;
  checkSeremi: boolean;
  resolucion: boolean;
  informeUniversidad: boolean;
  listoParaFacturar?: boolean;
  firmaHitoUsuario?: string;
  firmaHitoEn?: string;
}

export interface CarpetaFile {
  id?: string;
  name: string;
  type: string;
  folio: number;
  status: 'ok' | 'generated';
}

export interface Contact {
  id?: string;
  name: string;
  rut: string;
  phone: string;
  missing: string[];
  urgency: 'critical' | 'warning';
  lastContact: string;
  committee: string;
}

export interface SubsidyRule {
  id: string;
  name: string;
  description: string;
  minSavings: string;
  maxRSH: string;
  cutoffScore: number;
  maxUF: string;
  lastUpdate: string;
  source: string;
}

export interface DocumentRule {
  name: string;
  maxAge: number;
  unit: string;
  required: boolean;
}

export interface AiModule {
  module: string;
  status: string;
  version: string;
}

// ── Semáforo para Constructora ──────────────────────────────

export interface SemaforoProyecto {
  proyectoId: string;
  proyectoNombre: string;
  totalCarpetas: number;
  carpetasVerde: number;
  carpetasAmarillo: number;
  carpetasRojo: number;
  avancePct: number;
  alertaMonto: boolean;
}

export interface SemaforoCarpetaDetalle {
  carpetaId: string;
  beneficiario: string;
  estado: string;
  alertaMontoInconsistente: boolean;
  montoContratoUF: string;
  montoResolucionUF: string;
  documentos: DocumentoDetalle[];
}

export interface DocumentoDetalle {
  id: string;
  nombreArchivo: string;
  tipoDocumento: string;
  estado: string;
  semaforo: Semaforo;
  vigencia?: string;
  diasRestantes?: number;
  fechaEmision?: string;
  fechaVencimiento?: string;
  scoreConfianza?: number;
  resumenEjecutivo?: string;
  extraccionJson?: ExtractedField[];
  iaProcesado: boolean;
}

// ── Firma HITO ──────────────────────────────────────────────

export interface FirmaHitoResponse {
  ok: boolean;
  mensaje: string;
  carpetaId: string;
  firmadoPor: string;
  firmadoEn: string;
}

// ── Perfil de usuario ───────────────────────────────────────

export interface PerfilUsuario {
  id: string | null;
  username: string;
  email: string;
  organizacion: string | null;
  organizacionNombre: string;
  rol: string;
  rolDisplay: string;
  esEgis: boolean;
  esHito: boolean;
  esConstructora: boolean;
  activo: boolean;
}

// ── Auditoría ───────────────────────────────────────────────

export interface AuditoriaItem {
  id: string;
  tipoEntidad: string;
  entidadId: string;
  estadoAnterior: string;
  estadoNuevo: string;
  usuarioNombre: string;
  organizacionNombre: string;
  detalle: string;
  creadoEn: string;
}
