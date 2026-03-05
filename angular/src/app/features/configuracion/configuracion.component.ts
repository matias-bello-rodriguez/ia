import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfiguracionService } from '../../core/services/configuracion.service';
import type { Empresa, Usuario } from '../../shared/models/database.types';
import { TIPO_EMPRESA_LABELS } from '../../shared/models/database.types';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion.component.html',
})
export class ConfiguracionComponent implements OnInit {
  empresas: Empresa[] = [];
  usuarios: Usuario[] = [];
  editingRow: string | null = null;
  loading = true;

  readonly tipoLabels = TIPO_EMPRESA_LABELS;

  constructor(private configuracionService: ConfiguracionService) {}

  ngOnInit(): void {
    this.configuracionService.getEmpresas().subscribe({
      next: (list) => {
        this.empresas = list;
      },
      error: () => {},
    });
    this.configuracionService.getUsuarios().subscribe({
      next: (list) => {
        this.usuarios = list;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  startEdit(id: string): void {
    this.editingRow = id;
  }

  saveEdit(): void {
    if (this.editingRow == null) return;
    const row = this.empresas.find((r) => r.id === this.editingRow);
    if (!row) {
      this.editingRow = null;
      return;
    }
    this.configuracionService.updateEmpresa(this.editingRow, {
      razon_social: row.razon_social,
      nombre_fantasia: row.nombre_fantasia,
      nombre_representante_legal: row.nombre_representante_legal,
    }).subscribe({
      next: (updated) => {
        const i = this.empresas.findIndex((r) => r.id === updated.id);
        if (i >= 0) this.empresas[i] = updated;
        this.editingRow = null;
      },
    });
  }
}
