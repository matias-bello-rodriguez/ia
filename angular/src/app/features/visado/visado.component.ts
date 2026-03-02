import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentosService } from '../../core/services/documentos.service';
import type { DocQueueItem, ExtractedField } from '../../shared/models';

type VigenciaDoc = 'vigente' | 'por_vencer' | 'vencido';
type Status = 'approved' | 'rejected' | 'alert';

@Component({
  selector: 'app-visado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visado.component.html',
})
export class VisadoComponent implements OnInit {
  extractionResults: ExtractedField[] = [];
  documentQueue: DocQueueItem[] = [];
  vigenciaFilter: 'todos' | VigenciaDoc = 'todos';
  isScanning = false;
  showResults = false;
  loadingQueue = true;

  constructor(private documentosService: DocumentosService) {}

  ngOnInit(): void {
    this.loadQueue();
  }

  loadQueue(): void {
    const vigencia = this.vigenciaFilter === 'todos' ? undefined : this.vigenciaFilter;
    this.loadingQueue = true;
    this.documentosService.getCola(vigencia).subscribe({
      next: (list) => {
        this.documentQueue = list;
        this.loadingQueue = false;
      },
      error: () => {
        this.loadingQueue = false;
      },
    });
  }

  onFilterChange(): void {
    this.loadQueue();
  }

  get filteredQueue(): DocQueueItem[] {
    return this.documentQueue;
  }

  scan(): void {
    this.isScanning = true;
    this.showResults = false;
    this.documentosService.visar().subscribe({
      next: (res) => {
        this.extractionResults = res.resultados;
        this.isScanning = false;
        this.showResults = true;
        this.loadQueue();
      },
      error: () => {
        this.isScanning = false;
        this.showResults = true;
      },
    });
  }

  statusClass(s: ExtractedField['status']): string {
    if (s === 'approved') return 'bg-success';
    if (s === 'rejected') return 'bg-danger';
    return 'bg-warning';
  }

  statusLabel(s: ExtractedField['status']): string {
    if (s === 'approved') return 'Aprobado';
    if (s === 'rejected') return 'Rechazado';
    return 'Alerta';
  }
}
