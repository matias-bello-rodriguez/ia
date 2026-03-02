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
  id: number;
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
  id?: number;
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

export interface DocQueueItem {
  id?: number;
  name: string;
  type: string;
  status: 'approved' | 'rejected' | 'alert';
  vigencia?: 'vigente' | 'por_vencer' | 'vencido';
}

export interface ExtractedField {
  label: string;
  value: string;
  status: 'approved' | 'rejected' | 'alert';
  note?: string;
}

export interface ReporteRow {
  id: string;
  beneficiario: string;
  comite: string;
  estadoSubsidio: string;
  montoUF: string;
  vistoBuenoITO: boolean;
  checkSeremi: boolean;
  resolucion: boolean;
  informeUniversidad: boolean;
  listoParaFacturar?: boolean;
}

export interface CarpetaFile {
  id?: number;
  name: string;
  type: string;
  folio: number;
  status: 'ok' | 'generated';
}

export interface Contact {
  id?: number;
  name: string;
  rut: string;
  phone: string;
  missing: string[];
  urgency: 'critical' | 'warning';
  lastContact: string;
  committee: string;
}

export interface SubsidyRule {
  id: number;
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
