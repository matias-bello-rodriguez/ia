import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DocumentosService } from '../../core/services/documentos.service';
import { API_BASE_URL } from '../../core/services/api-config';
import type { DocumentoDetalle, ExtractedField } from '../../shared/models';

@Component({
  selector: 'app-document-viewer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './document-viewer.component.html',
})
export class DocumentViewerComponent implements OnInit {
  documento: DocumentoDetalle | null = null;
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
    this.documentosService.getDocumento(id).subscribe({
      next: (doc) => {
        this.documento = doc;
        // Construir URL del PDF para el iframe
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `${API_BASE_URL}/documentos/${doc.id}/archivo/`
        );
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Error al cargar el documento.';
        this.loading = false;
      },
    });
  }

  // ── Helpers ───────────────────────────────────────────────

  semaforoBadge(s?: string): string {
    if (s === 'verde') return 'text-bg-success';
    if (s === 'amarillo') return 'text-bg-warning';
    if (s === 'rojo') return 'text-bg-danger';
    return 'text-bg-secondary';
  }

  semaforoLabel(s?: string): string {
    if (s === 'verde') return 'Vigente';
    if (s === 'amarillo') return 'Por Vencer';
    if (s === 'rojo') return 'Vencido';
    return '—';
  }

  estadoBadge(e?: string): string {
    if (e === 'aprobado') return 'text-bg-success';
    if (e === 'rechazado') return 'text-bg-danger';
    return 'text-bg-secondary';
  }

  scoreColor(score?: number): string {
    if (!score) return 'text-secondary';
    if (score >= 0.8) return 'text-success';
    if (score >= 0.5) return 'text-warning';
    return 'text-danger';
  }

  statusLabel(s: ExtractedField['status']): string {
    if (s === 'approved') return 'Aprobado';
    if (s === 'rejected') return 'Rechazado';
    return 'Alerta';
  }
}
