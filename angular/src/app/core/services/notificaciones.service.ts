import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_BASE_URL } from './api-config';
import type { Contact } from '../../shared/models';
import {
  type ApiContactoPendiente,
  mapContact,
  mapContacts,
} from '../../shared/mappers';

@Injectable({ providedIn: 'root' })
export class NotificacionesService {
  private readonly base = `${API_BASE_URL}/notificaciones`;

  constructor(private http: HttpClient) {}

  getContactosPendientes(): Observable<Contact[]> {
    return this.http
      .get<ApiContactoPendiente[]>(`${this.base}/contactos-pendientes/`)
      .pipe(map(mapContacts));
  }

  marcarEnviado(contactoId: number): Observable<{ ok: boolean }> {
    return this.http.post<{ ok: boolean }>(
      `${this.base}/contactos-pendientes/${contactoId}/enviar/`,
      {}
    );
  }
}
