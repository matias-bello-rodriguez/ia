import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_BASE_URL } from './api-config';
import type { DocQueueItem, ExtractedField } from '../../shared/models';
import {
  type ApiDocumentoCola,
  mapDocQueue,
  mapDocQueueItem,
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

  /** POST /api/documentos/visar/ — devuelve resultados de extracción IA (mock en backend). */
  visar(file?: File): Observable<{ resultados: ExtractedField[] }> {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.post<{ resultados: ExtractedField[] }>(`${this.base}/visar/`, formData);
    }
    return this.http.post<{ resultados: ExtractedField[] }>(`${this.base}/visar/`, {});
  }
}
