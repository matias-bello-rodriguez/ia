import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProyectosService } from '../../core/services/proyectos.service';
import { BeneficiariosService } from '../../core/services/beneficiarios.service';
import type { Proyecto, Beneficiario } from '../../shared/models/database.types';
import { ESTADO_PROYECTO_LABELS } from '../../shared/models/database.types';

@Component({
  selector: 'app-comites',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comites.component.html',
})
export class ComitesComponent implements OnInit {
  projects: Proyecto[] = [];
  beneficiaries: Beneficiario[] = [];
  search = '';
  activeTab = 'projects';
  loadingProjects = true;
  loadingBeneficiaries = false;

  readonly estadoLabels = ESTADO_PROYECTO_LABELS;

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

  get filteredBeneficiaries(): Beneficiario[] {
    const s = this.search.toLowerCase();
    return this.beneficiaries.filter(
      (b) =>
        b.nombre_completo.toLowerCase().includes(s) ||
        b.rut.includes(this.search) ||
        (b.comuna ?? '').toLowerCase().includes(s)
    );
  }
}
