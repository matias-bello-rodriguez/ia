import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_BASE_URL } from './api-config';
import type { BarDataItem, DashboardAlert, MetricItem, PieDataItem } from '../../shared/models';
import {
  type ApiDashboardResponse,
  mapDashboardAlerts,
  mapDashboardBarData,
  mapDashboardPieData,
} from '../../shared/mappers';

const METRIC_ICONS = {
  totalUfProceso: 'bi-currency-dollar',
  carpetasListas: 'bi-folder-check',
  proyectosConstruccion: 'bi-bricks',
  alertasCriticas: 'bi-exclamation-triangle',
} as const;

export interface DashboardData {
  metrics: MetricItem[];
  barData: BarDataItem[];
  pieData: PieDataItem[];
  alerts: DashboardAlert[];
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly url = `${API_BASE_URL}/dashboard/`;

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<DashboardData> {
    return this.http.get<ApiDashboardResponse>(this.url).pipe(
      map((res) => {
        const m = res.metricas;
        const metrics: MetricItem[] = [
          {
            title: 'Total UF en Proceso',
            value: String(m.totalUfProceso),
            subtitle: 'UF activas en subsidios',
            trend: '+5.2% vs mes anterior',
            icon: METRIC_ICONS.totalUfProceso,
          },
          {
            title: 'Carpetas 100% Listas',
            value: String(m.carpetasListas),
            subtitle: 'Listas para SERVIU',
            trend: '8 nuevas esta semana',
            icon: METRIC_ICONS.carpetasListas,
          },
          {
            title: 'Proyectos en Construcción',
            value: String(m.proyectosConstruccion),
            subtitle: 'En ejecución activa',
            trend: '3 por iniciar',
            icon: METRIC_ICONS.proyectosConstruccion,
          },
          {
            title: 'Alertas Críticas',
            value: String(m.alertasCriticas),
            subtitle: 'Requieren atención',
            trend: '2 documentos por vencer hoy',
            icon: METRIC_ICONS.alertasCriticas,
          },
        ];
        return {
          metrics,
          barData: mapDashboardBarData(res.estadoCarpetas),
          pieData: mapDashboardPieData(res.subsidiosActivos),
          alerts: mapDashboardAlerts(res.alertas),
        };
      })
    );
  }
}
