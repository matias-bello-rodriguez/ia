import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesService } from '../../core/services';
import type { Contact } from '../../shared/models';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificaciones.component.html',
})
export class NotificacionesComponent implements OnInit {
  contacts: Contact[] = [];
  selectedIndex = 0;
  sentMessages = new Set<string>();
  loading = true;

  constructor(private notificacionesService: NotificacionesService) {}

  ngOnInit(): void {
    this.notificacionesService.getContactosPendientes().subscribe({
      next: (list) => {
        this.contacts = list;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  get selected(): Contact | null {
    return this.contacts[this.selectedIndex] ?? null;
  }

  message(contact: Contact): string {
    const docList = contact.missing.join(' y ');
    const firstName = contact.name.split(' ')[0];
    return `Hola ${firstName}, para no perder su subsidio de vivienda, necesitamos que nos envíe una foto de su ${docList} vigente lo antes posible. Puede responder a este mensaje con la foto o acercarse a nuestra oficina. Cualquier duda estamos para ayudarle.`;
  }

  enviar(contact: Contact): void {
    const id = contact.id;
    if (id == null) return;
    this.notificacionesService.marcarEnviado(id).subscribe({
      next: () => {
        this.sentMessages = new Set(this.sentMessages).add(id);
      },
    });
  }
}
