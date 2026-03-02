import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_BASE_URL } from './api-config';
import type { CarpetaFile, ReporteRow } from '../../shared/models';
import {
  type ApiCarpetaArchivo,
  type ApiCarpetaResumen,
  mapCarpetaFiles,
  mapReporteGrid,
} from '../../shared/mappers';

@Injectable({ providedIn: 'root' })
export class ReportesService {
  private readonly base = API_BASE_URL;

  constructor(private http: HttpClient) {}

  getReporteEjecutivo(): Observable<ReporteRow[]> {
    return this.http
      .get<ApiCarpetaResumen[]>(`${this.base}/reportes/ejecutivo/`)
      .pipe(map(mapReporteGrid));
  }

  getCarpetaArchivos(carpetaId: number): Observable<CarpetaFile[]> {
    return this.http
      .get<ApiCarpetaArchivo[]>(`${this.base}/carpetas/${carpetaId}/archivos/`)
      .pipe(map(mapCarpetaFiles));
  }

  marcarListoParaFacturar(carpetaId: number): Observable<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(
      `${this.base}/carpetas/${carpetaId}/listo-facturar/`,
      {}
    );
  }

  getInformesTerceros(carpetaId: number): Observable<Array<{ tipo_informe: string; nombre_archivo: string; seremi_aprobado: boolean }>> {
    return this.http.get<Array<{ tipo_informe: string; nombre_archivo: string; seremi_aprobado: boolean }>>(
      `${this.base}/carpetas/${carpetaId}/informes-terceros/`
    );
  }
}
