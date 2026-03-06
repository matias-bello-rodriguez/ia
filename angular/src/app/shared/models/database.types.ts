/**
 * Tipos TypeScript que mapean exactamente el esquema de Supabase.
 * Estos tipos reflejan las tablas, ENUMs y relaciones de la BD.
 */

// ══════════════════════════════════════════════════════════════
// ENUMS — Coinciden 1:1 con los CREATE TYPE de PostgreSQL
// ══════════════════════════════════════════════════════════════

export type TipoEmpresa = 'egis' | 'constructora' | 'serviu';

export type RolUsuario =
  | 'admin_egis'
  | 'hito_egis'
  | 'dueño_constructora'
  | 'admin_constructora'
  | 'oficina_partes_serviu'
  | 'hito_serviu';

export type EstadoSemaforo =
  | 'pendiente_amarillo'
  | 'en_proceso_naranja'
  | 'aprobado_verde'
  | 'rechazado_rojo';

export type EstadoProyecto =
  | 'recopilacion_antecedentes'
  | 'en_revision_egis'
  | 'ingresado_serviu'
  | 'en_ejecucion'
  | 'finalizado';

// ══════════════════════════════════════════════════════════════
// INTERFACES DE TABLAS — Forma exacta de cada fila en Supabase
// ══════════════════════════════════════════════════════════════

/** Tabla public.empresas */
export interface Empresa {
  id: string;               // UUID
  rut: string;
  razon_social: string;
  nombre_fantasia: string | null;
  tipo: TipoEmpresa;
  nombre_representante_legal: string | null;
  rut_representante_legal: string | null;
  fecha_creacion: string;    // TIMESTAMPTZ como ISO string
}

/** Tabla public.usuarios — referencia auth.users(id) */
export interface Usuario {
  id: string;               // UUID (= auth.users.id)
  empresa_id: string | null;
  rut: string;
  nombre_completo: string;
  correo: string;
  rol: RolUsuario;
  fecha_registro: string;
}

/** Tabla public.beneficiarios */
export interface Beneficiario {
  id: string;               // UUID
  rut: string;
  nombre_completo: string;
  direccion: string;
  comuna: string;
  junta_de_vecinos: string | null;
  fecha_registro: string;
}

/** Tabla public.proyectos */
export interface Proyecto {
  id: string;               // UUID
  beneficiario_id: string;
  egis_id: string;
  constructora_id: string | null;
  codigo_proyecto: string | null;
  tipo_subsidio: string;
  monto_uf: number;
  plazo_ejecucion_meses: number | null;
  fecha_firma_contrato: string | null; // DATE como ISO string
  estado_actual: EstadoProyecto;
  fecha_creacion: string;
}

/** Tabla public.documentos */
export interface Documento {
  id: string;               // UUID
  proyecto_id: string;
  subido_por_usuario_id: string;
  tipo_documento: string;
  nombre_archivo: string;
  ruta_almacenamiento: string;
  estado_actual: EstadoSemaforo;
  resumen_inteligencia_artificial: string | null;
  fecha_subida: string;
  ultima_actualizacion: string;
}

/** Tabla public.historial_estados_documento */
export interface HistorialEstadoDocumento {
  id: string;               // UUID
  documento_id: string;
  usuario_accion_id: string;
  estado_anterior: EstadoSemaforo | null;
  nuevo_estado: EstadoSemaforo;
  comentario_rechazo_aprobacion: string | null;
  firma_electronica_hash: string | null;
  fecha_cambio: string;
}

// ══════════════════════════════════════════════════════════════
// TIPOS CON RELACIONES (para consultas con joins)
// ══════════════════════════════════════════════════════════════

/** Proyecto con datos del beneficiario y empresas expandidos */
export interface ProyectoConRelaciones extends Proyecto {
  beneficiario?: Beneficiario;
  egis?: Empresa;
  constructora?: Empresa;
}

/** Documento con usuario que lo subió y proyecto */
export interface DocumentoConRelaciones extends Documento {
  proyecto?: Proyecto;
  subido_por_usuario?: Usuario;
}

/** Historial con datos del usuario y documento */
export interface HistorialConRelaciones extends HistorialEstadoDocumento {
  documento?: Documento;
  usuario_accion?: Usuario;
}

/** Usuario con datos de su empresa expandidos */
export interface UsuarioConEmpresa extends Usuario {
  empresa?: Empresa;
}

// ══════════════════════════════════════════════════════════════
// PAYLOADS DE INSERCIÓN (sin campos auto-generados)
// ══════════════════════════════════════════════════════════════

export type EmpresaInsert = Omit<Empresa, 'id' | 'fecha_creacion'> & {
  id?: string;
  fecha_creacion?: string;
};

export type UsuarioInsert = Omit<Usuario, 'fecha_registro'> & {
  fecha_registro?: string;
};

export type BeneficiarioInsert = Omit<Beneficiario, 'id' | 'fecha_registro'> & {
  id?: string;
  fecha_registro?: string;
};

export type ProyectoInsert = Omit<Proyecto, 'id' | 'fecha_creacion' | 'estado_actual'> & {
  id?: string;
  fecha_creacion?: string;
  estado_actual?: EstadoProyecto;
};

export type DocumentoInsert = Omit<Documento, 'id' | 'fecha_subida' | 'ultima_actualizacion' | 'estado_actual' | 'resumen_inteligencia_artificial'> & {
  id?: string;
  fecha_subida?: string;
  ultima_actualizacion?: string;
  estado_actual?: EstadoSemaforo;
  resumen_inteligencia_artificial?: string | null;
};

export type HistorialInsert = Omit<HistorialEstadoDocumento, 'id' | 'fecha_cambio' | 'firma_electronica_hash'> & {
  id?: string;
  fecha_cambio?: string;
  firma_electronica_hash?: string | null;
};

// ══════════════════════════════════════════════════════════════
// HELPERS PARA LA UI
// ══════════════════════════════════════════════════════════════

/** Mapeo de estado semáforo a colores CSS */
export const SEMAFORO_COLORS: Record<EstadoSemaforo, string> = {
  pendiente_amarillo: '#ffc107',
  en_proceso_naranja: '#fd7e14',
  aprobado_verde: '#198754',
  rechazado_rojo: '#dc3545',
};

/** Mapeo de estado semáforo a etiquetas legibles */
export const SEMAFORO_LABELS: Record<EstadoSemaforo, string> = {
  pendiente_amarillo: 'Pendiente',
  en_proceso_naranja: 'En Proceso',
  aprobado_verde: 'Aprobado',
  rechazado_rojo: 'Rechazado',
};

/** Mapeo de estado proyecto a etiquetas legibles */
export const ESTADO_PROYECTO_LABELS: Record<EstadoProyecto, string> = {
  recopilacion_antecedentes: 'Recopilación de Antecedentes',
  en_revision_egis: 'En Revisión EGIS',
  ingresado_serviu: 'Ingresado SERVIU',
  en_ejecucion: 'En Ejecución',
  finalizado: 'Finalizado',
};

/** Mapeo de tipo empresa a etiquetas legibles */
export const TIPO_EMPRESA_LABELS: Record<TipoEmpresa, string> = {
  egis: 'EGIS',
  constructora: 'Constructora',
  serviu: 'SERVIU',
};

/** Roles que pertenecen a EGIS */
export const ROLES_EGIS: RolUsuario[] = ['admin_egis', 'hito_egis'];

/** Roles que pertenecen a Constructora */
export const ROLES_CONSTRUCTORA: RolUsuario[] = ['dueño_constructora', 'admin_constructora'];

/** Roles que pertenecen a SERVIU */
export const ROLES_SERVIU: RolUsuario[] = ['oficina_partes_serviu', 'hito_serviu'];

/** Determina si un rol es de tipo EGIS */
export function esRolEgis(rol: RolUsuario): boolean {
  return ROLES_EGIS.includes(rol);
}

/** Determina si un rol es de tipo Constructora */
export function esRolConstructora(rol: RolUsuario): boolean {
  return ROLES_CONSTRUCTORA.includes(rol);
}

/** Determina si un rol es de tipo SERVIU */
export function esRolServiu(rol: RolUsuario): boolean {
  return ROLES_SERVIU.includes(rol);
}
