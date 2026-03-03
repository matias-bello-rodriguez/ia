import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfiguracionService } from '../../core/services';
import type { AiModule, DocumentRule, SubsidyRule } from '../../shared/models';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion.component.html',
})
export class ConfiguracionComponent implements OnInit {
  subsidyRules: SubsidyRule[] = [];
  documentRules: DocumentRule[] = [];
  aiModules: AiModule[] = [];
  editingRow: string | null = null;
  loading = true;

  constructor(private configuracionService: ConfiguracionService) {}

  ngOnInit(): void {
    this.configuracionService.getReglasSubsidio().subscribe({
      next: (list) => {
        this.subsidyRules = list;
      },
      error: () => {},
    });
    this.configuracionService.getReglasDocumento().subscribe({
      next: (list) => {
        this.documentRules = list;
      },
      error: () => {},
    });
    this.configuracionService.getModulosIA().subscribe({
      next: (list) => {
        this.aiModules = list;
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
    const row = this.subsidyRules.find((r) => r.id === this.editingRow);
    if (!row) {
      this.editingRow = null;
      return;
    }
    this.configuracionService.updateReglaSubsidio(this.editingRow, row).subscribe({
      next: (updated) => {
        const i = this.subsidyRules.findIndex((r) => r.id === updated.id);
        if (i >= 0) this.subsidyRules[i] = updated;
        this.editingRow = null;
      },
    });
  }
}
