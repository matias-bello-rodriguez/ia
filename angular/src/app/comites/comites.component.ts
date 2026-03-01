import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const PROJECTS = [
  { id: 1, name: 'Villa Esperanza', location: 'Puente Alto, RM', type: 'Radicación', classification: 'Campamento', beneficiaries: 45, progress: 72 },
  { id: 2, name: 'Población Aurora', location: 'La Pintana, RM', type: 'Mejoramiento', classification: 'Vivienda Consolidada', beneficiaries: 32, progress: 45 },
  { id: 3, name: 'Comité Los Aromos', location: 'Cerro Navia, RM', type: 'Radicación', classification: 'Campamento', beneficiaries: 28, progress: 90 },
  { id: 4, name: 'Condominio Social Sol', location: 'San Bernardo, RM', type: 'Mejoramiento', classification: 'Vivienda Consolidada', beneficiaries: 60, progress: 15 },
];

const BENEFICIARIES = [
  { name: 'Maria Gonzalez Soto', rut: '12.345.678-9', rsh: '40%', savings: '25 UF', minSavings: '15 UF', suggestedSubsidy: 'DS49', matchScore: 92, status: 'approved' as const, committee: 'Villa Esperanza' },
  { name: 'Pedro Ramirez Lagos', rut: '11.222.333-4', rsh: '50%', savings: '30 UF', minSavings: '20 UF', suggestedSubsidy: 'DS1', matchScore: 85, status: 'pending' as const, committee: 'Población Aurora' },
  { name: 'Ana Muñoz Vera', rut: '15.678.901-2', rsh: '35%', savings: '10 UF', minSavings: '15 UF', suggestedSubsidy: 'DS49', matchScore: 67, status: 'alert' as const, committee: 'Comité Los Aromos' },
  { name: 'Carlos Diaz Fuentes', rut: '9.876.543-1', rsh: '60%', savings: '50 UF', minSavings: '30 UF', suggestedSubsidy: 'DS1', matchScore: 95, status: 'approved' as const, committee: 'Villa Esperanza' },
  { name: 'Luisa Torres Pino', rut: '14.567.890-K', rsh: '45%', savings: '12 UF', minSavings: '15 UF', suggestedSubsidy: 'DS49', matchScore: 58, status: 'alert' as const, committee: 'Población Aurora' },
  { name: 'Roberto Vega Marín', rut: '16.789.012-3', rsh: '30%', savings: '20 UF', minSavings: '15 UF', suggestedSubsidy: 'DS49', matchScore: 88, status: 'approved' as const, committee: 'Comité Los Aromos' },
];

@Component({
  selector: 'app-comites',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comites.component.html',
})
export class ComitesComponent {
  projects = PROJECTS;
  beneficiaries = BENEFICIARIES;
  search = '';
  activeTab = 'projects';

  get filteredBeneficiaries() {
    const s = this.search.toLowerCase();
    return this.beneficiaries.filter(
      (b) =>
        b.name.toLowerCase().includes(s) ||
        b.rut.includes(this.search) ||
        b.committee.toLowerCase().includes(s)
    );
  }

  /** Expone parseInt para usar en la plantilla (ej. "25 UF" → 25). */
  toNumber(s: string): number {
    return parseInt(s, 10) || 0;
  }
}
