import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesService } from '../../core/services/notificaciones.service';
import type { HistorialConRelaciones } from '../../shared/models/database.types';
import { SEMAFORO_LABELS, SEMAFORO_COLORS } from '../../shared/models/database.types';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificaciones.component.html',
})
export class NotificacionesComponent implements OnInit {
  actividades: HistorialConRelaciones[] = [];
  selectedIndex = 0;
  loading = true;

  readonly semaforoLabels = SEMAFORO_LABELS;
  readonly semaforoColors = SEMAFORO_COLORS;

  constructor(private notificacionesService: NotificacionesService) {}

  ngOnInit(): void {
    this.notificacionesService.getActividadReciente(50).subscribe({
      next: (list) => {
        this.actividades = list;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  get selected(): HistorialConRelaciones | null {
    return this.actividades[this.selectedIndex] ?? null;
  }

  estadoLabel(estado: string): string {
    return (this.semaforoLabels as Record<string, string>)[estado] ?? estado;
  }

  estadoColor(estado: string): string {
    return (this.semaforoColors as Record<string, string>)[estado] ?? '#6c757d';
  }
}
