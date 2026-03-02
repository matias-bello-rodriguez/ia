import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_BASE_URL } from './api-config';
import type { Project } from '../../shared/models';
import { type ApiProyecto, mapProyecto, mapProyectos, mapProjectToApi } from '../../shared/mappers';

@Injectable({ providedIn: 'root' })
export class ProyectosService {
  private readonly url = `${API_BASE_URL}/proyectos/`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Project[]> {
    return this.http.get<ApiProyecto[]>(this.url).pipe(map(mapProyectos));
  }

  getById(id: number): Observable<Project> {
    return this.http.get<ApiProyecto>(`${this.url}${id}/`).pipe(map(mapProyecto));
  }

  create(project: Partial<Project>): Observable<Project> {
    return this.http
      .post<ApiProyecto>(this.url, mapProjectToApi(project))
      .pipe(map(mapProyecto));
  }

  update(id: number, project: Partial<Project>): Observable<Project> {
    return this.http
      .patch<ApiProyecto>(`${this.url}${id}/`, mapProjectToApi(project))
      .pipe(map(mapProyecto));
  }
}
