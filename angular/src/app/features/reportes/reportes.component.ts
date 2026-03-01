import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ReporteRow {
  id: string;
  beneficiario: string;
  comite: string;
  estadoSubsidio: string;
  montoUF: string;
  vistoBuenoITO: boolean;
  checkSeremi: boolean;
  resolucion: boolean;
  informeUniversidad: boolean;
}

const REPORTE_GRID: ReporteRow[] = [
  { id: '1', beneficiario: 'Maria Gonzalez Soto', comite: 'Villa Esperanza', estadoSubsidio: 'Elegible DS49', montoUF: '25', vistoBuenoITO: true, checkSeremi: true, resolucion: true, informeUniversidad: true },
  { id: '2', beneficiario: 'Juan Perez Rojas', comite: 'Villa Esperanza', estadoSubsidio: 'En revisión', montoUF: '18', vistoBuenoITO: true, checkSeremi: false, resolucion: false, informeUniversidad: true },
  { id: '3', beneficiario: 'Ana Lopez Diaz', comite: 'Los Aromos', estadoSubsidio: 'Elegible DS49', montoUF: '22', vistoBuenoITO: false, checkSeremi: false, resolucion: false, informeUniversidad: false },
];

const CARPETA_FILES = [
  { name: '12345678-9_DOMINIO_2026.pdf', type: 'Dominio Vigente', folio: 1, status: 'ok' as const },
  { name: '12345678-9_RSH_2026.pdf', type: 'Certificado RSH', folio: 2, status: 'ok' as const },
  { name: '12345678-9_AHORRO_2026.pdf', type: 'Cartola de Ahorro', folio: 3, status: 'ok' as const },
  { name: '12345678-9_CI_2026.pdf', type: 'Carnet de Identidad', folio: 4, status: 'ok' as const },
  { name: '12345678-9_FACTIBILIDAD_2026.pdf', type: 'Factibilidad Técnica', folio: 5, status: 'ok' as const },
  { name: '12345678-9_INDICE_FOLIADO.pdf', type: 'Índice Foliado', folio: 0, status: 'generated' as const },
];

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
})
export class ReportesComponent {
  reporteGrid = REPORTE_GRID;
  carpetaFiles = CARPETA_FILES;
  listoParaFacturar: Record<string, boolean> = {};
  activeTab = 'report';
  reportGenerated = true;
  isGenerating = false;
  informePlagas: string | null = 'Informe_UBB_Silofagos_2026.pdf';
  seremiQuimicos = false;

  puedeAptoParaCobro(row: ReporteRow): boolean {
    return !!(row.informeUniversidad && row.vistoBuenoITO && row.resolucion);
  }

  marcarListoParaFacturar(id: string): void {
    this.listoParaFacturar = { ...this.listoParaFacturar, [id]: true };
  }

  get listosCount(): number {
    return Object.keys(this.listoParaFacturar).length;
  }

  actualizarReporte(): void {
    this.isGenerating = true;
    this.reportGenerated = false;
    setTimeout(() => {
      this.isGenerating = false;
      this.reportGenerated = true;
    }, 2000);
  }
}
