import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Documento {
  id: number;
  nombre: string;
  proyecto: string;
  fechaSubida: string;
  aprobado: boolean;
}

@Component({
  selector: 'app-egis-documentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './egis-documentos.component.html',
})
export class EgisDocumentosComponent {
  documentos: Documento[] = [
    { id: 1, nombre: 'Permiso de Edificación',   proyecto: 'Villa Los Aromos',  fechaSubida: '2026-02-15', aprobado: false },
    { id: 2, nombre: 'Certificado de Dominio',    proyecto: 'Villa Los Aromos',  fechaSubida: '2026-02-18', aprobado: true  },
    { id: 3, nombre: 'Plano de Arquitectura',     proyecto: 'Condominio El Sol', fechaSubida: '2026-03-01', aprobado: false },
    { id: 4, nombre: 'Informe Geotécnico',        proyecto: 'Condominio El Sol', fechaSubida: '2026-03-05', aprobado: false },
    { id: 5, nombre: 'Escritura de Propiedad',    proyecto: 'Villa Los Aromos',  fechaSubida: '2026-03-07', aprobado: true  },
  ];

  toggleAprobacion(doc: Documento): void {
    doc.aprobado = !doc.aprobado;
  }
}
