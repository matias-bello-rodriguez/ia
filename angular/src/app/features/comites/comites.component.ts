import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProyectosService, BeneficiariosService } from '../../core/services';
import type { Beneficiary, Project } from '../../shared/models';

@Component({
  selector: 'app-comites',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comites.component.html',
})
export class ComitesComponent implements OnInit {
  projects: Project[] = [];
  beneficiaries: Beneficiary[] = [];
  search = '';
  activeTab = 'projects';
  loadingProjects = true;
  loadingBeneficiaries = false;

  constructor(
    private proyectosService: ProyectosService,
    private beneficiariosService: BeneficiariosService,
  ) {}

  ngOnInit(): void {
    this.proyectosService.getAll().subscribe({
      next: (list) => {
        this.projects = list;
        this.loadingProjects = false;
      },
      error: () => {
        this.loadingProjects = false;
      },
    });
    this.loadBeneficiaries();
  }

  private loadBeneficiaries(): void {
    this.loadingBeneficiaries = true;
    this.beneficiariosService.getAll().subscribe({
      next: (list) => {
        this.beneficiaries = list;
        this.loadingBeneficiaries = false;
      },
      error: () => {
        this.loadingBeneficiaries = false;
      },
    });
  }

  get filteredBeneficiaries(): Beneficiary[] {
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
