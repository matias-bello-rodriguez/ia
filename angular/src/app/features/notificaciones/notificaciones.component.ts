import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Contact {
  name: string;
  rut: string;
  phone: string;
  missing: string[];
  urgency: 'critical' | 'warning';
  lastContact: string;
  committee: string;
}

const CONTACTS: Contact[] = [
  { name: 'Maria Gonzalez Soto', rut: '12.345.678-9', phone: '+56 9 1234 5678', missing: ['Carnet Identidad'], urgency: 'critical', lastContact: 'Hace 3 días', committee: 'Villa Esperanza' },
  { name: 'Pedro Ramirez Lagos', rut: '11.222.333-4', phone: '+56 9 8765 4321', missing: ['Certificado RSH'], urgency: 'warning', lastContact: 'Hace 1 semana', committee: 'Población Aurora' },
  { name: 'Ana Muñoz Vera', rut: '15.678.901-2', phone: '+56 9 5555 1234', missing: ['Dominio Vigente', 'Cartola Ahorro'], urgency: 'critical', lastContact: 'Nunca contactado', committee: 'Comité Los Aromos' },
  { name: 'Luisa Torres Pino', rut: '14.567.890-K', phone: '+56 9 4444 5678', missing: ['Dominio Vigente'], urgency: 'warning', lastContact: 'Hace 2 días', committee: 'Población Aurora' },
];

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificaciones.component.html',
})
export class NotificacionesComponent {
  contacts = CONTACTS;
  selectedIndex = 0;
  sentMessages = new Set<number>();

  get selected(): Contact {
    return this.contacts[this.selectedIndex];
  }

  message(contact: Contact): string {
    const docList = contact.missing.join(' y ');
    const firstName = contact.name.split(' ')[0];
    return `Hola ${firstName}, para no perder su subsidio de vivienda, necesitamos que nos envíe una foto de su ${docList} vigente lo antes posible. Puede responder a este mensaje con la foto o acercarse a nuestra oficina. Cualquier duda estamos para ayudarle.`;
  }

  enviar(index: number): void {
    this.sentMessages = new Set(this.sentMessages).add(index);
  }
}
