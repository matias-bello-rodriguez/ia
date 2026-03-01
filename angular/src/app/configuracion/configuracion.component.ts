import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const SUBSIDY_RULES = [
  { id: 1, name: 'DS49', description: 'Fondo Solidario de Elección de Vivienda', minSavings: '15 UF', maxRSH: '40%', cutoffScore: 13484, maxUF: '800 UF', lastUpdate: '15/01/2026', source: 'Resolución Exenta 123/2026' },
  { id: 2, name: 'DS1', description: 'Sistema Integrado de Subsidio Habitacional', minSavings: '20 UF', maxRSH: '70%', cutoffScore: 13484, maxUF: '1.100 UF', lastUpdate: '20/01/2026', source: 'Resolución Exenta 456/2026' },
  { id: 3, name: 'DS27', description: 'Programa de Protección del Patrimonio Familiar', minSavings: '5 UF', maxRSH: '60%', cutoffScore: 11734, maxUF: '120 UF', lastUpdate: '10/02/2026', source: 'Resolución Exenta 789/2026' },
  { id: 4, name: 'DS19', description: 'Programa de Integración Social y Territorial', minSavings: '50 UF', maxRSH: '90%', cutoffScore: 14557, maxUF: '1.400 UF', lastUpdate: '05/02/2026', source: 'Resolución Exenta 101/2026' },
];

const DOCUMENT_RULES = [
  { name: 'Dominio Vigente', maxAge: 90, unit: 'días', required: true },
  { name: 'Certificado RSH', maxAge: 6, unit: 'meses', required: true },
  { name: 'Carnet de Identidad', maxAge: 0, unit: 'vigente', required: true },
  { name: 'Cartola de Ahorro', maxAge: 30, unit: 'días', required: true },
  { name: 'Factibilidad Técnica', maxAge: 12, unit: 'meses', required: true },
  { name: 'Informe Social', maxAge: 6, unit: 'meses', required: false },
];

const AI_MODULES = [
  { module: 'OCR / Extracción', status: 'Activo', version: 'v2.3' },
  { module: 'Validación Legal', status: 'Activo', version: 'v1.8' },
  { module: 'Match de Subsidios', status: 'Activo', version: 'v1.5' },
  { module: 'Redacción Ejecutiva', status: 'Activo', version: 'v2.0' },
  { module: 'Clasificación Territorial', status: 'Activo', version: 'v1.2' },
  { module: 'WhatsApp Cobranza', status: 'Activo', version: 'v1.1' },
];

export interface SubsidyRule {
  id: number;
  name: string;
  description: string;
  minSavings: string;
  maxRSH: string;
  cutoffScore: number;
  maxUF: string;
  lastUpdate: string;
  source: string;
}

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion.component.html',
})
export class ConfiguracionComponent {
  subsidyRules: SubsidyRule[] = SUBSIDY_RULES.map((r) => ({ ...r }));
  documentRules = DOCUMENT_RULES;
  aiModules = AI_MODULES;
  editingRow: number | null = null;

  startEdit(id: number): void {
    this.editingRow = id;
  }

  saveEdit(): void {
    this.editingRow = null;
  }
}
