import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_BASE_URL } from './api-config';
import type { Beneficiary } from '../../shared/models';
import {
  type ApiBeneficiario,
  mapBeneficiario,
  mapBeneficiarios,
  mapBeneficiarioToApi,
} from '../../shared/mappers';

export interface BeneficiariosQuery {
  proyectoId?: number;
  q?: string;
}

@Injectable({ providedIn: 'root' })
export class BeneficiariosService {
  private readonly url = `${API_BASE_URL}/beneficiarios/`;

  constructor(private http: HttpClient) {}

  getAll(query?: BeneficiariosQuery): Observable<Beneficiary[]> {
    let params = new HttpParams();
    if (query?.proyectoId != null) params = params.set('proyectoId', query.proyectoId);
    if (query?.q) params = params.set('q', query.q);
    return this.http
      .get<ApiBeneficiario[]>(this.url, { params })
      .pipe(map(mapBeneficiarios));
  }

  getById(id: number): Observable<Beneficiary> {
    return this.http.get<ApiBeneficiario>(`${this.url}${id}/`).pipe(map(mapBeneficiario));
  }

  create(beneficiary: Partial<Beneficiary>, proyectoId: number): Observable<Beneficiary> {
    return this.http
      .post<ApiBeneficiario>(this.url, mapBeneficiarioToApi(beneficiary, proyectoId))
      .pipe(map(mapBeneficiario));
  }

  update(id: number, beneficiary: Partial<Beneficiary>, proyectoId: number): Observable<Beneficiary> {
    return this.http
      .patch<ApiBeneficiario>(`${this.url}${id}/`, mapBeneficiarioToApi(beneficiary, proyectoId))
      .pipe(map(mapBeneficiario));
  }
}
