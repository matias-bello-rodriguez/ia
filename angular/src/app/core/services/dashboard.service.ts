import { Injectable } from '@angular/core';
import { from, map, Observable, forkJoin } from 'rxjs';
import { getSupabaseClient } from './supabase-client';
import type { EstadoSemaforo, EstadoProyecto, Proyecto, Documento } from '../../shared/models/database.types';
import { SEMAFORO_LABELS, ESTADO_PROYECTO_LABELS } from '../../shared/models/database.types';

type ProyectoRow = Pick<Proyecto, 'id' | 'monto_uf' | 'estado_actual' | 'tipo_subsidio'>;
type DocumentoRow = Pick<Documento, 'id' | 'estado_actual'>;

// ── Tipos para la UI del Dashboard ──────────────────────────
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

export interface DashboardData {
  metrics: MetricItem[];
  barData: BarDataItem[];
  pieData: PieDataItem[];
}

const SEMAFORO_FILLS: Record<EstadoSemaforo, string> = {
  pendiente_amarillo: 'var(--bs-warning)',
  en_proceso_naranja: '#fd7e14',
  aprobado_verde: 'var(--bs-success)',
  rechazado_rojo: 'var(--bs-danger)',
};

const PIE_COLORS = ['var(--bs-primary)', '#6f42c1', 'var(--bs-info)', 'var(--bs-secondary)', 'var(--bs-success)'];

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private supabase = getSupabaseClient();

  /**
   * Consulta directa a Supabase para armar los datos del dashboard.
   * Usa forkJoin para hacer las queries en paralelo.
   */
  getDashboard(): Observable<DashboardData> {
    const proyectos$ = from(
      this.supabase.from('proyectos').select('id, monto_uf, estado_actual, tipo_subsidio')
    );
    const documentos$ = from(
      this.supabase.from('documentos').select('id, estado_actual')
    );

    return forkJoin([proyectos$, documentos$]).pipe(
      map(([proyectosRes, documentosRes]) => {
        if (proyectosRes.error) throw proyectosRes.error;
        if (documentosRes.error) throw documentosRes.error;

        const proyectos: ProyectoRow[] = proyectosRes.data ?? [];
        const documentos: DocumentoRow[] = documentosRes.data ?? [];

        // ── Métricas ────────────────────────────────────────
        const totalUf = proyectos.reduce((sum: number, p: ProyectoRow) => sum + (Number(p.monto_uf) || 0), 0);
        const docsAprobados = documentos.filter((d: DocumentoRow) => d.estado_actual === 'aprobado_verde').length;
        const proyectosEjecucion = proyectos.filter((p: ProyectoRow) => p.estado_actual === 'en_ejecucion').length;
        const docsRechazados = documentos.filter((d: DocumentoRow) => d.estado_actual === 'rechazado_rojo').length;

        const metrics: MetricItem[] = [
          {
            title: 'Total UF en Proceso',
            value: totalUf.toLocaleString('es-CL'),
            subtitle: 'UF activas en subsidios',
            trend: `${proyectos.length} proyectos activos`,
            icon: 'bi-currency-dollar',
          },
          {
            title: 'Documentos Aprobados',
            value: String(docsAprobados),
            subtitle: 'Con semáforo verde',
            trend: `de ${documentos.length} totales`,
            icon: 'bi-folder-check',
          },
          {
            title: 'Proyectos en Ejecución',
            value: String(proyectosEjecucion),
            subtitle: 'En ejecución activa',
            trend: `${proyectos.filter((p: ProyectoRow) => p.estado_actual === 'recopilacion_antecedentes').length} en recopilación`,
            icon: 'bi-bricks',
          },
          {
            title: 'Documentos Rechazados',
            value: String(docsRechazados),
            subtitle: 'Requieren atención',
            trend: `${documentos.filter((d: any) => d.estado_actual === 'pendiente_amarillo').length} pendientes`,
            icon: 'bi-exclamation-triangle',
          },
        ];

        // ── Gráfico de barras: conteo de docs por estado semáforo ──
        const conteoEstados: Record<string, number> = {};
        for (const doc of documentos) {
          const estado = doc.estado_actual as EstadoSemaforo;
          const label = SEMAFORO_LABELS[estado] ?? estado;
          conteoEstados[label] = (conteoEstados[label] ?? 0) + 1;
        }
        const barData: BarDataItem[] = Object.entries(conteoEstados).map(([name, value]) => {
          const estadoKey = Object.entries(SEMAFORO_LABELS).find(([, v]) => v === name)?.[0] as EstadoSemaforo | undefined;
          return {
            name,
            value,
            fill: estadoKey ? SEMAFORO_FILLS[estadoKey] : 'var(--bs-secondary)',
          };
        });

        // ── Gráfico circular: conteo de proyectos por tipo_subsidio ──
        const conteoSubsidios: Record<string, number> = {};
        for (const p of proyectos) {
          const tipo = p.tipo_subsidio ?? 'Sin tipo';
          conteoSubsidios[tipo] = (conteoSubsidios[tipo] ?? 0) + 1;
        }
        const pieData: PieDataItem[] = Object.entries(conteoSubsidios).map(([name, value], i) => ({
          name,
          value,
          color: PIE_COLORS[i % PIE_COLORS.length],
        }));

        return { metrics, barData, pieData };
      })
    );
  }
}
