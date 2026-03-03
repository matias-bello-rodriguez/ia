import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_BASE_URL } from './api-config';
import type { DocQueueItem, DocumentoDetalle, FirmaHitoResponse, SemaforoCarpetaDetalle, SemaforoProyecto, VisadoResponse } from '../../shared/models';
import {
  type ApiDocumentoCola,
  type ApiSemaforoCarpeta,
  type ApiSemaforoProyecto,
  type ApiFirmaHitoResponse,
  mapDocQueue,
  mapSemaforoProyectos,
  mapSemaforoCarpeta,
  mapFirmaHito,
} from '../../shared/mappers';

export type VigenciaFilter = 'todos' | 'vigente' | 'por_vencer' | 'vencido';

@Injectable({ providedIn: 'root' })
export class DocumentosService {
  private readonly base = `${API_BASE_URL}/documentos`;

  constructor(private http: HttpClient) {}

  getCola(vigencia?: VigenciaFilter): Observable<DocQueueItem[]> {
    let params = new HttpParams();
    if (vigencia && vigencia !== 'todos') params = params.set('vigencia', vigencia);
    return this.http
      .get<ApiDocumentoCola[]>(`${this.base}/cola/`, { params })
      .pipe(map(mapDocQueue));
  }

  /** POST /api/documentos/visar/ — visado con IA */
  visar(file?: File, tipoDocumento?: string, carpetaId?: string): Observable<VisadoResponse> {
    const formData = new FormData();
    if (file) formData.append('file', file);
    if (tipoDocumento) formData.append('tipo_documento', tipoDocumento);
    if (carpetaId) formData.append('carpeta_id', String(carpetaId));
    return this.http.post<VisadoResponse>(`${this.base}/visar/`, formData);
  }

  /** GET /api/documentos/:id/ — detalle del documento */
  getDocumento(id: string): Observable<DocumentoDetalle> {
    return this.http.get<any>(`${this.base}/${id}/`).pipe(
      map((d) => ({
        id: d.id,
        nombreArchivo: d.nombre_archivo,
        tipoDocumento: d.tipo_documento,
        estado: d.estado,
        semaforo: d.semaforo,
        vigencia: d.vigencia,
        diasRestantes: d.dias_restantes,
        fechaEmision: d.fecha_emision,
        fechaVencimiento: d.fecha_vencimiento,
        scoreConfianza: d.score_confianza,
        resumenEjecutivo: d.resumen_ejecutivo,
        extraccionJson: d.extraccion_json,
        iaProcesado: d.ia_procesado,
      }))
    );
  }

  // ── Semáforo ────────────────────────────────────────────────

  /** GET /api/semaforo/proyectos/ */
  getSemaforoProyectos(): Observable<SemaforoProyecto[]> {
    return this.http
      .get<ApiSemaforoProyecto[]>(`${API_BASE_URL}/semaforo/proyectos/`)
      .pipe(map(mapSemaforoProyectos));
  }

  /** GET /api/semaforo/carpetas/:id/ */
  getSemaforoCarpeta(carpetaId: string): Observable<SemaforoCarpetaDetalle> {
    return this.http
      .get<ApiSemaforoCarpeta>(`${API_BASE_URL}/semaforo/carpetas/${carpetaId}/`)
      .pipe(map(mapSemaforoCarpeta));
  }

  // ── Firma HITO ──────────────────────────────────────────────

  /** POST /api/carpetas/:id/firma-hito/ */
  firmaHito(carpetaId: string, observacion?: string, tokenFirma?: string): Observable<FirmaHitoResponse> {
    return this.http
      .post<ApiFirmaHitoResponse>(`${API_BASE_URL}/carpetas/${carpetaId}/firma-hito/`, {
        observacion: observacion ?? '',
        token_firma: tokenFirma ?? '',
      })
      .pipe(map(mapFirmaHito));
  }
}
