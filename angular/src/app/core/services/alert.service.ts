/**
 * Servicio de notificaciones muy simple (sin dependencias externas).
 * Si quieres volver a SweetAlert2 más adelante, solo cambia aquí.
 */
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AlertService {
  success(message: string): void {
    console.log('[OK]', message);
  }

  error(message: string): void {
    console.error('[ERROR]', message);
    alert(message);
  }

  warning(message: string): void {
    console.warn('[WARN]', message);
  }

  info(message: string): void {
    console.info('[INFO]', message);
  }

  /** Diálogo modal sencillo */
  modal(title: string, text: string): void {
    alert(`${title}\n\n${text}`);
  }
}
