/**
 * Servicio de notificaciones toast usando SweetAlert2.
 * Mensajes en español para toda la plataforma.
 */
import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AlertService {
  /** Toast pequeño arriba a la derecha */
  private toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    didOpen: (t) => {
      t.onmouseenter = Swal.stopTimer;
      t.onmouseleave = Swal.resumeTimer;
    },
  });

  success(message: string): void {
    this.toast.fire({ icon: 'success', title: message });
  }

  error(message: string): void {
    this.toast.fire({ icon: 'error', title: message });
  }

  warning(message: string): void {
    this.toast.fire({ icon: 'warning', title: message });
  }

  info(message: string): void {
    this.toast.fire({ icon: 'info', title: message });
  }

  /** Diálogo modal centrado (para accesos no autorizados, etc.) */
  modal(title: string, text: string, icon: SweetAlertIcon = 'error'): void {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#173DDC',
    });
  }
}
