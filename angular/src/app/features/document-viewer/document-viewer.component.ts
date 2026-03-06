import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DocumentosService } from '../../core/services/documentos.service';
import type { Documento, EstadoSemaforo } from '../../shared/models/database.types';
import { SEMAFORO_LABELS, SEMAFORO_COLORS } from '../../shared/models/database.types';

@Component({
  selector: 'app-document-viewer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './document-viewer.component.html',
})
export class DocumentViewerComponent implements OnInit {
  documento: Documento | null = null;
  loading = true;
  errorMsg = '';
  pdfUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private documentosService: DocumentosService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMsg = 'ID de documento inválido.';
      this.loading = false;
      return;
    }
    this.documentosService.getById(id).subscribe({
      next: (doc) => {
        this.documento = doc;
        // La URL del PDF viene directamente de ruta_almacenamiento (Supabase Storage)
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(doc.ruta_almacenamiento);
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Error al cargar el documento.';
        this.loading = false;
      },
    });
  }

  // ── Helpers ───────────────────────────────────────────────

  semaforoBadge(estado?: EstadoSemaforo): string {
    if (estado === 'aprobado_verde') return 'text-bg-success';
    if (estado === 'pendiente_amarillo') return 'text-bg-warning';
    if (estado === 'en_proceso_naranja') return 'text-bg-info';
    if (estado === 'rechazado_rojo') return 'text-bg-danger';
    return 'text-bg-secondary';
  }

  semaforoLabel(estado?: EstadoSemaforo): string {
    return estado ? SEMAFORO_LABELS[estado] : '—';
  }

  semaforoColor(estado?: EstadoSemaforo): string {
    return estado ? SEMAFORO_COLORS[estado] : '#6c757d';
  }
}
