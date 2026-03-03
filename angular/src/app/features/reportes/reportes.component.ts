import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportesService } from '../../core/services';
import type { CarpetaFile, ReporteRow } from '../../shared/models';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
})
export class ReportesComponent implements OnInit {
  reporteGrid: ReporteRow[] = [];
  carpetaFiles: CarpetaFile[] = [];
  selectedCarpetaId: string | null = null;
  activeTab = 'report';
  reportGenerated = true;
  isGenerating = false;
  loadingReporte = true;
  loadingCarpeta = false;
  informePlagas: string | null = null;
  seremiQuimicos = false;

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    this.loadReporte();
  }

  loadReporte(): void {
    this.loadingReporte = true;
    this.reportesService.getReporteEjecutivo().subscribe({
      next: (rows) => {
        this.reporteGrid = rows;
        this.loadingReporte = false;
        if (rows.length > 0 && !this.selectedCarpetaId) {
          this.selectedCarpetaId = rows[0].id;
        }
      },
      error: () => {
        this.loadingReporte = false;
      },
    });
  }

  selectCarpetaForFiles(id: string): void {
    this.selectedCarpetaId = id;
    this.loadCarpetaFiles();
  }

  loadCarpetaFiles(): void {
    if (this.selectedCarpetaId == null) return;
    this.loadingCarpeta = true;
    this.reportesService.getCarpetaArchivos(this.selectedCarpetaId).subscribe({
      next: (files) => {
        this.carpetaFiles = files;
        this.loadingCarpeta = false;
      },
      error: () => {
        this.loadingCarpeta = false;
      },
    });
  }

  puedeAptoParaCobro(row: ReporteRow): boolean {
    return !!(row.informeUniversidad && row.vistoBuenoITO && row.resolucion);
  }

  get listosCount(): number {
    return this.reporteGrid.filter((r) => r.listoParaFacturar).length;
  }

  marcarListoParaFacturar(row: ReporteRow): void {
    const id = row.id;
    if (!id) return;
    this.reportesService.marcarListoParaFacturar(id).subscribe({
      next: () => {
        row.listoParaFacturar = true;
      },
    });
  }

  actualizarReporte(): void {
    this.isGenerating = true;
    this.reportGenerated = false;
    this.reportesService.getReporteEjecutivo().subscribe({
      next: (rows) => {
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

  onTabChange(tab: string): void {
    this.activeTab = tab;
    if (tab === 'carpeta' && this.selectedCarpetaId != null) {
      this.loadCarpetaFiles();
    }
  }
}

