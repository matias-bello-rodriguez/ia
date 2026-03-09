import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type EstadoEtapa = 'pendiente' | 'en_revision' | 'aprobado';

interface Etapa {
  id: number;
  nombre: string;
  proyecto: string;
  estado: EstadoEtapa;
}

@Component({
  selector: 'app-constructora-archivos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './constructora-archivos.component.html',
})
export class ConstructoraArchivosComponent {
  etapas: Etapa[] = [
    { id: 1, nombre: 'Obra Gruesa',              proyecto: 'Villa Los Aromos',  estado: 'aprobado'    },
    { id: 2, nombre: 'Instalaciones Sanitarias',  proyecto: 'Villa Los Aromos',  estado: 'en_revision' },
    { id: 3, nombre: 'Terminaciones',             proyecto: 'Villa Los Aromos',  estado: 'pendiente'   },
    { id: 4, nombre: 'Obra Gruesa',              proyecto: 'Condominio El Sol', estado: 'en_revision' },
    { id: 5, nombre: 'Instalaciones Eléctricas',  proyecto: 'Condominio El Sol', estado: 'pendiente'   },
  ];

  readonly estadoConfig: Record<EstadoEtapa, { label: string; color: string; icon: string }> = {
    pendiente:   { label: 'Pendiente',    color: 'bg-red-100 text-red-700',    icon: '🔴' },
    en_revision: { label: 'En Revisión',  color: 'bg-yellow-100 text-yellow-700', icon: '🟡' },
    aprobado:    { label: 'Aprobado',     color: 'bg-green-100 text-green-700',  icon: '🟢' },
  };

  subirArchivo(etapa: Etapa): void {
    // Placeholder — aquí se integraría la subida real a Supabase Storage
    alert(`Subida de archivo para etapa "${etapa.nombre}" del proyecto "${etapa.proyecto}" (simulado).`);
  }
}
