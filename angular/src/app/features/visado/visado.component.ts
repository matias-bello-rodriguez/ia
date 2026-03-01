import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type VigenciaDoc = 'vigente' | 'por_vencer' | 'vencido';
type Status = 'approved' | 'rejected' | 'alert';

interface ExtractedField {
  label: string;
  value: string;
  status: Status;
  note?: string;
}

interface DocQueueItem {
  name: string;
  type: string;
  status: Status;
  vigencia: VigenciaDoc;
}

const MOCK_RESULTS: ExtractedField[] = [
  { label: 'RUT', value: '12.345.678-9', status: 'approved' },
  { label: 'Nombre Completo', value: 'Maria Gonzalez Soto', status: 'approved' },
  { label: 'Fecha Emisión', value: '15/01/2026', status: 'approved' },
  { label: 'Vigencia', value: '15/04/2026', status: 'approved' },
  { label: 'Dominio Vigente', value: 'Emitido hace 95 días', status: 'rejected', note: 'Documento > 90 días, solicitar actualización en el CBR' },
  { label: 'Monto Ahorro', value: '12 UF', status: 'alert', note: 'Ahorro insuficiente - mínimo requerido: 15 UF' },
];

const DOC_QUEUE: DocQueueItem[] = [
  { name: '12345678-9_DOMINIO_2026.pdf', type: 'Dominio Vigente', status: 'rejected', vigencia: 'vencido' },
  { name: '12345678-9_RSH_2026.pdf', type: 'Certificado RSH', status: 'approved', vigencia: 'vigente' },
  { name: '12345678-9_AHORRO_2026.pdf', type: 'Cartola Ahorro', status: 'alert', vigencia: 'por_vencer' },
  { name: '12345678-9_CI_2026.pdf', type: 'Carnet Identidad', status: 'approved', vigencia: 'vigente' },
  { name: '11222333-4_DOMINIO_2026.pdf', type: 'Dominio Vigente', status: 'approved', vigencia: 'vigente' },
];

@Component({
  selector: 'app-visado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visado.component.html',
})
export class VisadoComponent {
  extractionResults = MOCK_RESULTS;
  documentQueue = DOC_QUEUE;
  vigenciaFilter: 'todos' | VigenciaDoc = 'todos';
  isScanning = false;
  showResults = true;

  get filteredQueue(): DocQueueItem[] {
    if (this.vigenciaFilter === 'todos') return this.documentQueue;
    return this.documentQueue.filter((d) => d.vigencia === this.vigenciaFilter);
  }

  scan(): void {
    this.isScanning = true;
    this.showResults = false;
    setTimeout(() => {
      this.isScanning = false;
      this.showResults = true;
    }, 2000);
  }

  statusClass(s: Status): string {
    if (s === 'approved') return 'bg-success';
    if (s === 'rejected') return 'bg-danger';
    return 'bg-warning';
  }

  statusLabel(s: Status): string {
    if (s === 'approved') return 'Aprobado';
    if (s === 'rejected') return 'Rechazado';
    return 'Alerta';
  }
}
