import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, type SesionActiva } from '../../core/services/auth.service';
import { ConfiguracionService } from '../../core/services/configuracion.service';
import { AlertService } from '../../core/services/alert.service';
import type { Usuario, Empresa } from '../../shared/models/database.types';
import { TIPO_EMPRESA_LABELS } from '../../shared/models/database.types';

@Component({
  selector: 'app-mi-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mi-cuenta.component.html',
})
export class MiCuentaComponent implements OnInit {
  perfil: Usuario | null = null;
  empresa: Empresa | null = null;
  loading = true;

  // Formulario de datos personales
  nombreCompleto = '';
  correo = '';
  guardandoPerfil = false;

  // Formulario de cambio de contraseña
  nuevaPassword = '';
  confirmarPassword = '';
  guardandoPassword = false;

  // Formulario de cambio de correo
  nuevoCorreo = '';
  guardandoCorreo = false;

  readonly tipoLabels = TIPO_EMPRESA_LABELS;

  constructor(
    private auth: AuthService,
    private configuracionService: ConfiguracionService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    const sesion = this.auth.getSesion();
    if (sesion) {
      this.perfil = sesion.perfil;
      this.empresa = sesion.empresa;
      this.nombreCompleto = sesion.perfil.nombre_completo;
      this.correo = sesion.perfil.correo;
    }
    this.loading = false;
  }

  guardarPerfil(): void {
    if (!this.perfil) return;
    if (!this.nombreCompleto.trim()) {
      this.alertService.error('El nombre no puede estar vacío.');
      return;
    }

    this.guardandoPerfil = true;
    this.configuracionService
      .actualizarPerfil(this.perfil.id, {
        nombre_completo: this.nombreCompleto.trim(),
      })
      .subscribe({
        next: (updated) => {
          this.perfil = updated;
          this.alertService.success('Perfil actualizado correctamente.');
          this.guardandoPerfil = false;
        },
        error: (err) => {
          this.alertService.error('Error al actualizar perfil: ' + (err.message ?? err));
          this.guardandoPerfil = false;
        },
      });
  }

  cambiarPassword(): void {
    if (!this.nuevaPassword || this.nuevaPassword.length < 6) {
      this.alertService.error('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (this.nuevaPassword !== this.confirmarPassword) {
      this.alertService.error('Las contraseñas no coinciden.');
      return;
    }

    this.guardandoPassword = true;
    this.configuracionService.cambiarPassword(this.nuevaPassword).subscribe({
      next: () => {
        this.alertService.success('Contraseña actualizada correctamente.');
        this.nuevaPassword = '';
        this.confirmarPassword = '';
        this.guardandoPassword = false;
      },
      error: (err) => {
        this.alertService.error('Error al cambiar contraseña: ' + (err.message ?? err));
        this.guardandoPassword = false;
      },
    });
  }

  cambiarCorreo(): void {
    if (!this.nuevoCorreo.trim()) {
      this.alertService.error('Ingrese un correo válido.');
      return;
    }

    this.guardandoCorreo = true;
    this.configuracionService.cambiarCorreo(this.nuevoCorreo.trim()).subscribe({
      next: () => {
        this.alertService.success(
          'Se ha enviado un enlace de confirmación al nuevo correo. Revise su bandeja de entrada.',
        );
        this.nuevoCorreo = '';
        this.guardandoCorreo = false;
      },
      error: (err) => {
        this.alertService.error('Error al cambiar correo: ' + (err.message ?? err));
        this.guardandoCorreo = false;
      },
    });
  }
}
