import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportesService, ReporteProyectoRow } from '../../core/services/reportes.service';
import { DocumentosService } from '../../core/services/documentos.service';
import type { Documento, EstadoSemaforo } from '../../shared/models/database.types';
import { SEMAFORO_LABELS, ESTADO_PROYECTO_LABELS } from '../../shared/models/database.types';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
})
export class ReportesComponent implements OnInit {
  reporteGrid: ReporteProyectoRow[] = [];
  documentosProyecto: Documento[] = [];
  selectedProyectoId: string | null = null;
  activeTab = 'report';
  reportGenerated = true;
  isGenerating = false;
  loadingReporte = true;
  loadingDocumentos = false;

  constructor(
    private reportesService: ReportesService,
    private documentosService: DocumentosService,
  ) {}

  ngOnInit(): void {
    this.loadReporte();
  }

  loadReporte(): void {
    this.loadingReporte = true;
    this.reportesService.getReporteEjecutivo().subscribe({
      next: (rows: ReporteProyectoRow[]) => {
        this.reporteGrid = rows;
        this.loadingReporte = false;
        if (rows.length > 0 && !this.selectedProyectoId) {
          this.selectedProyectoId = rows[0].proyectoId;
        }
      },
      error: () => {
        this.loadingReporte = false;
      },
    });
  }

  selectProyectoForDocs(proyectoId: string): void {
    this.selectedProyectoId = proyectoId;
    this.loadDocumentosProyecto();
  }

  loadDocumentosProyecto(): void {
    if (this.selectedProyectoId == null) return;
    this.loadingDocumentos = true;
    this.reportesService.getDocumentosProyecto(this.selectedProyectoId).subscribe({
      next: (docs: Documento[]) => {
        this.documentosProyecto = docs;
        this.loadingDocumentos = false;
      },
      error: () => {
        this.loadingDocumentos = false;
      },
    });
  }

  get listosCount(): number {
    return this.reporteGrid.filter((r) => r.documentosAprobados === r.totalDocumentos && r.totalDocumentos > 0).length;
  }

  get totalDocs(): number {
    return this.reporteGrid.reduce((sum, r) => sum + r.totalDocumentos, 0);
  }

  actualizarReporte(): void {
    this.isGenerating = true;
    this.reportGenerated = false;
    this.reportesService.getReporteEjecutivo().subscribe({
      next: (rows: ReporteProyectoRow[]) => {
        this.reporteGrid = rows;
        this.isGenerating = false;
        this.reportGenerated = true;
      },
      error: () => {
        this.isGenerating = false;
        this.reportGenerated = true;
      },
    });
  }

  semaforoLabel(estado: EstadoSemaforo): string {
    return SEMAFORO_LABELS[estado] ?? estado;
  }

  onTabChange(tab: string): void {
    this.activeTab = tab;
    if (tab === 'documentos' && this.selectedProyectoId != null) {
      this.loadDocumentosProyecto();
    }
  }
}

