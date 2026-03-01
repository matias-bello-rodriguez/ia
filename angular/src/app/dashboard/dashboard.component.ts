import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

const METRICS = [
  { title: 'Total UF en Proceso', value: '12.450', subtitle: 'UF activas en subsidios', trend: '+5.2% vs mes anterior', icon: 'bi-currency-dollar' },
  { title: 'Carpetas 100% Listas', value: '34', subtitle: 'Listas para SERVIU', trend: '8 nuevas esta semana', icon: 'bi-folder-check' },
  { title: 'Proyectos en Construcción', value: '12', subtitle: 'En ejecución activa', trend: '3 por iniciar', icon: 'bi-bricks' },
  { title: 'Alertas Críticas', value: '7', subtitle: 'Requieren atención', trend: '2 documentos por vencer hoy', icon: 'bi-exclamation-triangle' },
];

const BAR_DATA = [
  { name: 'Pendiente', value: 23, fill: 'var(--bs-warning)' },
  { name: 'En Proceso', value: 45, fill: 'var(--bs-primary)' },
  { name: 'Visado', value: 34, fill: '#6f42c1' },
  { name: 'Listo SERVIU', value: 34, fill: 'var(--bs-success)' },
  { name: 'Rechazado', value: 8, fill: 'var(--bs-danger)' },
];

const PIE_DATA = [
  { name: 'DS49', value: 45, color: 'var(--bs-primary)' },
  { name: 'DS1', value: 30, color: '#6f42c1' },
  { name: 'DS27', value: 15, color: 'var(--bs-info)' },
  { name: 'Otros', value: 10, color: 'var(--bs-secondary)' },
];

const ALERTS = [
  { beneficiary: 'Maria Gonzalez Soto', rut: '12.345.678-9', document: 'Dominio Vigente', daysLeft: 3, committee: 'Villa Esperanza', severity: 'critical' as const },
  { beneficiary: 'Pedro Ramirez Lagos', rut: '11.222.333-4', document: 'Certificado RSH', daysLeft: 7, committee: 'Población Aurora', severity: 'warning' as const },
  { beneficiary: 'Ana Muñoz Vera', rut: '15.678.901-2', document: 'Carnet de Identidad', daysLeft: 5, committee: 'Comité Los Aromos', severity: 'critical' as const },
  { beneficiary: 'Carlos Diaz Fuentes', rut: '9.876.543-1', document: 'Certificado de Ahorro', daysLeft: 12, committee: 'Villa Esperanza', severity: 'warning' as const },
  { beneficiary: 'Luisa Torres Pino', rut: '14.567.890-K', document: 'Dominio Vigente', daysLeft: 2, committee: 'Población Aurora', severity: 'critical' as const },
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  metrics = METRICS;
  barData = BAR_DATA;
  pieData = PIE_DATA;
  alerts = ALERTS;

  get barMax(): number {
    return Math.max(...this.barData.map((b) => b.value));
  }

  barHeight(value: number): number {
    const max = this.barMax;
    return max > 0 ? (value / max) * 200 : 0;
  }

  get pieChartBackground(): string {
    let acc = 0;
    const parts = this.pieData.map((p) => {
      const start = acc;
      acc += p.value;
      return `${p.color} ${start}% ${acc}%`;
    });
    return `conic-gradient(${parts.join(', ')})`;
  }
}
