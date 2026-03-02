/**
 * Mappers: respuestas API (snake_case) -> modelos del frontend (camelCase).
 */

import type {
  AiModule,
  BarDataItem,
  Beneficiary,
  CarpetaFile,
  Contact,
  DashboardAlert,
  DocumentRule,
  DocQueueItem,
  PieDataItem,
  Project,
  ReporteRow,
  SubsidyRule,
} from '../models';

/** Respuesta GET /api/dashboard/ */
export interface ApiDashboardResponse {
  metricas: {
    totalUfProceso: number;
    carpetasListas: number;
    proyectosConstruccion: number;
    alertasCriticas: number;
  };
  estadoCarpetas: Array<{ name: string; value: number }>;
  subsidiosActivos: Array<{ name: string; value: number }>;
  alertas: Array<{
    id?: number;
    beneficiario_nombre: string;
    rut: string;
    nombre_documento: string;
    dias_restantes: number;
    committee: string;
    severidad: string;
  }>;
}

const BAR_FILLS: Record<string, string> = {
  'Pendiente': 'var(--bs-warning)',
  'En Proceso': 'var(--bs-primary)',
  'Visado': '#6f42c1',
  'Listo SERVIU': 'var(--bs-success)',
  'Rechazado': 'var(--bs-danger)',
};

const PIE_COLORS = ['var(--bs-primary)', '#6f42c1', 'var(--bs-info)', 'var(--bs-secondary)'];

export function mapDashboardAlerts(alertas: ApiDashboardResponse['alertas']): DashboardAlert[] {
  return alertas.map((a) => ({
    beneficiary: a.beneficiario_nombre,
    rut: a.rut,
    document: a.nombre_documento,
    daysLeft: a.dias_restantes,
    committee: a.committee,
    severity: (a.severidad === 'critical' ? 'critical' : 'warning') as 'critical' | 'warning',
  }));
}

export function mapDashboardBarData(estadoCarpetas: ApiDashboardResponse['estadoCarpetas']): BarDataItem[] {
  return estadoCarpetas.map((e) => ({
    name: e.name,
    value: e.value,
    fill: BAR_FILLS[e.name] ?? 'var(--bs-secondary)',
  }));
}

export function mapDashboardPieData(subsidiosActivos: ApiDashboardResponse['subsidiosActivos']): PieDataItem[] {
  return subsidiosActivos.map((s, i) => ({
    name: s.name,
    value: s.value,
    color: PIE_COLORS[i % PIE_COLORS.length],
  }));
}

/** Respuesta GET /api/proyectos/ */
export interface ApiProyecto {
  id: number;
  nombre: string;
  ubicacion: string;
  tipo: string;
  clasificacion: string;
  cantidad_beneficiarios: number;
  avance_pct: number;
  estado?: string;
}

export function mapProyecto(p: ApiProyecto): Project {
  return {
    id: p.id,
    name: p.nombre,
    location: p.ubicacion,
    type: p.tipo,
    classification: p.clasificacion,
    beneficiaries: p.cantidad_beneficiarios,
    progress: p.avance_pct,
    status: p.estado,
  };
}

export function mapProyectos(list: ApiProyecto[]): Project[] {
  return list.map(mapProyecto);
}

/** Respuesta GET /api/beneficiarios/ */
export interface ApiBeneficiario {
  id?: number;
  proyecto?: ApiProyecto;
  proyecto_id?: number;
  nombre: string;
  rut: string;
  telefono?: string;
  rsh_pct?: string;
  ahorro_uf?: string;
  ahorro_minimo_uf?: string;
  subsidio_sugerido?: number;
  subsidio_sugerido_nombre?: string;
  puntaje_match?: number;
  estado: string;
}

export function mapBeneficiario(b: ApiBeneficiario): Beneficiary {
  return {
    id: b.id,
    name: b.nombre,
    rut: b.rut,
    rsh: b.rsh_pct ?? '',
    savings: b.ahorro_uf ?? '',
    minSavings: b.ahorro_minimo_uf ?? '',
    suggestedSubsidy: b.subsidio_sugerido_nombre ?? '',
    matchScore: b.puntaje_match ?? 0,
    status: (b.estado as Beneficiary['status']) ?? 'pending',
    committee: b.proyecto?.nombre ?? '',
    phone: b.telefono,
  };
}

export function mapBeneficiarios(list: ApiBeneficiario[]): Beneficiary[] {
  return list.map(mapBeneficiario);
}

/** Payload para POST /api/proyectos/ */
export function mapProjectToApi(p: Partial<Project>): Record<string, unknown> {
  return {
    nombre: p.name,
    ubicacion: p.location,
    tipo: p.type,
    clasificacion: p.classification,
    cantidad_beneficiarios: p.beneficiaries ?? 0,
    avance_pct: p.progress ?? 0,
    estado: p.status ?? 'activo',
  };
}

/** Payload para POST /api/beneficiarios/ */
export function mapBeneficiarioToApi(b: Partial<Beneficiary>, proyectoId: number): Record<string, unknown> {
  return {
    proyecto_id: proyectoId,
    nombre: b.name,
    rut: b.rut,
    telefono: b.phone ?? '',
    rsh_pct: b.rsh ?? '',
    ahorro_uf: b.savings ?? '',
    ahorro_minimo_uf: b.minSavings ?? '',
    puntaje_match: b.matchScore,
    estado: b.status ?? 'pendiente',
  };
}

/** Respuesta GET /api/documentos/cola/ */
export interface ApiDocumentoCola {
  id: number;
  nombre_archivo: string;
  tipo_documento: string;
  folio?: number;
  estado: string;
  vigencia?: string;
}

export function mapDocQueueItem(d: ApiDocumentoCola): DocQueueItem {
  return {
    id: d.id,
    name: d.nombre_archivo,
    type: d.tipo_documento,
    status: (d.estado as DocQueueItem['status']) ?? 'approved',
    vigencia: d.vigencia as DocQueueItem['vigencia'],
  };
}

export function mapDocQueue(list: ApiDocumentoCola[]): DocQueueItem[] {
  return list.map(mapDocQueueItem);
}

/** Respuesta GET /api/reportes/ejecutivo/ (lista de carpetas con beneficiario) */
export interface ApiCarpetaResumen {
  id: number;
  beneficiario: ApiBeneficiario & { proyecto?: ApiProyecto };
  estado_subsidio: string;
  monto_uf: string;
  visto_bueno_ito: boolean;
  check_seremi: boolean;
  resolucion: boolean;
  informe_universidad: boolean;
  listo_para_facturar: boolean;
}

export function mapReporteRow(c: ApiCarpetaResumen): ReporteRow {
  const b = c.beneficiario;
  return {
    id: String(c.id),
    beneficiario: b?.nombre ?? '',
    comite: b?.proyecto?.nombre ?? '',
    estadoSubsidio: c.estado_subsidio ?? '',
    montoUF: c.monto_uf ?? '',
    vistoBuenoITO: c.visto_bueno_ito,
    checkSeremi: c.check_seremi,
    resolucion: c.resolucion,
    informeUniversidad: c.informe_universidad,
    listoParaFacturar: c.listo_para_facturar,
  };
}

export function mapReporteGrid(list: ApiCarpetaResumen[]): ReporteRow[] {
  return list.map(mapReporteRow);
}

/** Respuesta GET /api/carpetas/:id/archivos/ */
export interface ApiCarpetaArchivo {
  id: number;
  nombre_archivo: string;
  tipo_documento: string;
  folio: number | null;
  estado: string;
}

export function mapCarpetaFile(f: ApiCarpetaArchivo): CarpetaFile {
  return {
    id: f.id,
    name: f.nombre_archivo,
    type: f.tipo_documento,
    folio: f.folio ?? 0,
    status: f.estado === 'aprobado' ? 'ok' : 'generated',
  };
}

export function mapCarpetaFiles(list: ApiCarpetaArchivo[]): CarpetaFile[] {
  return list.map(mapCarpetaFile);
}

/** Respuesta GET /api/notificaciones/contactos-pendientes/ */
export interface ApiContactoPendiente {
  id: number;
  beneficiario_nombre: string;
  rut: string;
  telefono: string;
  documentos_faltantes: string[];
  urgencia: string;
  ultimo_contacto_en: string | null;
  committee: string;
}

function formatLastContact(ultimo: string | null): string {
  if (!ultimo) return 'Nunca contactado';
  try {
    const d = new Date(ultimo);
    if (isNaN(d.getTime())) return ultimo;
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Hace 1 día';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semana(s)`;
    return ultimo;
  } catch {
    return ultimo ?? 'Nunca contactado';
  }
}

export function mapContact(c: ApiContactoPendiente): Contact {
  return {
    id: c.id,
    name: c.beneficiario_nombre,
    rut: c.rut,
    phone: c.telefono ?? '',
    missing: c.documentos_faltantes ?? [],
    urgency: (c.urgencia === 'critical' ? 'critical' : 'warning') as 'critical' | 'warning',
    lastContact: formatLastContact(c.ultimo_contacto_en),
    committee: c.committee,
  };
}

export function mapContacts(list: ApiContactoPendiente[]): Contact[] {
  return list.map(mapContact);
}

/** Respuesta GET /api/configuracion/reglas-subsidio/ */
export interface ApiReglaSubsidio {
  id: number;
  nombre: string;
  descripcion: string;
  ahorro_minimo_uf: string;
  rsh_maximo_pct: string;
  puntaje_corte: number;
  tope_uf: string;
  ultima_actualizacion: string;
  fuente: string;
}

export function mapSubsidyRule(r: ApiReglaSubsidio): SubsidyRule {
  return {
    id: r.id,
    name: r.nombre,
    description: r.descripcion,
    minSavings: r.ahorro_minimo_uf,
    maxRSH: r.rsh_maximo_pct,
    cutoffScore: r.puntaje_corte,
    maxUF: r.tope_uf,
    lastUpdate: r.ultima_actualizacion,
    source: r.fuente,
  };
}

export function mapSubsidyRules(list: ApiReglaSubsidio[]): SubsidyRule[] {
  return list.map(mapSubsidyRule);
}

/** Payload para PUT/PATCH regla subsidio */
export function mapSubsidyRuleToApi(r: Partial<SubsidyRule>): Record<string, unknown> {
  return {
    nombre: r.name,
    descripcion: r.description,
    ahorro_minimo_uf: r.minSavings,
    rsh_maximo_pct: r.maxRSH,
    puntaje_corte: r.cutoffScore,
    tope_uf: r.maxUF,
    fuente: r.source,
  };
}

/** Respuesta GET /api/configuracion/reglas-documento/ */
export interface ApiReglaDocumento {
  id?: number;
  nombre: string;
  vigencia_maxima: number;
  unidad: string;
  obligatorio: boolean;
}

export function mapDocumentRule(r: ApiReglaDocumento): DocumentRule {
  return {
    name: r.nombre,
    maxAge: r.vigencia_maxima,
    unit: r.unidad,
    required: r.obligatorio,
  };
}

export function mapDocumentRules(list: ApiReglaDocumento[]): DocumentRule[] {
  return list.map(mapDocumentRule);
}

/** Respuesta GET /api/configuracion/modulos-ia/ */
export interface ApiModuloIA {
  clave: string;
  nombre_mostrar: string;
  version: string;
  estado: string;
}

export function mapAiModule(m: ApiModuloIA): AiModule {
  return {
    module: m.nombre_mostrar,
    status: m.estado,
    version: m.version,
  };
}

export function mapAiModules(list: ApiModuloIA[]): AiModule[] {
  return list.map(mapAiModule);
}
