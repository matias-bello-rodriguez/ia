import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_BASE_URL } from './api-config';
import type { AiModule, DocumentRule, SubsidyRule } from '../../shared/models';
import {
  type ApiModuloIA,
  type ApiReglaDocumento,
  type ApiReglaSubsidio,
  mapAiModules,
  mapDocumentRules,
  mapSubsidyRule,
  mapSubsidyRules,
  mapSubsidyRuleToApi,
} from '../../shared/mappers';

@Injectable({ providedIn: 'root' })
export class ConfiguracionService {
  private readonly base = `${API_BASE_URL}/configuracion`;

  constructor(private http: HttpClient) {}

  getReglasSubsidio(): Observable<SubsidyRule[]> {
    return this.http
      .get<ApiReglaSubsidio[]>(`${this.base}/reglas-subsidio/`)
      .pipe(map(mapSubsidyRules));
  }

  getReglaSubsidio(id: string): Observable<SubsidyRule> {
    return this.http
      .get<ApiReglaSubsidio>(`${this.base}/reglas-subsidio/${id}/`)
      .pipe(map(mapSubsidyRule));
  }

  updateReglaSubsidio(id: string, rule: Partial<SubsidyRule>): Observable<SubsidyRule> {
    return this.http
      .patch<ApiReglaSubsidio>(`${this.base}/reglas-subsidio/${id}/`, mapSubsidyRuleToApi(rule))
      .pipe(map(mapSubsidyRule));
  }

  getReglasDocumento(): Observable<DocumentRule[]> {
    return this.http
      .get<ApiReglaDocumento[]>(`${this.base}/reglas-documento/`)
      .pipe(map(mapDocumentRules));
  }

  getModulosIA(): Observable<AiModule[]> {
    return this.http
      .get<ApiModuloIA[]>(`${this.base}/modulos-ia/`)
      .pipe(map(mapAiModules));
  }
}
