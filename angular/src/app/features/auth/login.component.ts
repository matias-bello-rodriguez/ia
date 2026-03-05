import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private alert: AlertService,
    private router: Router
  ) {
    this.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.getRawValue();
    this.loading = true;

    this.auth.login(email, password).subscribe({
      next: (sesion) => {
        this.loading = false;
        this.alert.success(`Bienvenido, ${sesion.perfil.nombre_completo}`);
        this.router.navigate([this.auth.getDashboardPath()]);
      },
      error: (err) => {
        this.loading = false;
        const msg = this.translateError(err?.message ?? '');
        this.alert.error(msg);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  /** Traduce mensajes de error de Supabase al español */
  private translateError(msg: string): string {
    const lower = msg.toLowerCase();
    if (lower.includes('invalid login credentials')) return 'Correo o contraseña incorrectos.';
    if (lower.includes('email not confirmed')) return 'Debe confirmar su correo electrónico.';
    if (lower.includes('too many requests')) return 'Demasiados intentos. Espere un momento.';
    if (lower.includes('user not found')) return 'No se encontró una cuenta con ese correo.';
    if (lower.includes('no se encontró perfil')) return 'Su cuenta existe pero no tiene perfil configurado. Contacte al administrador.';
    if (lower.includes('network')) return 'Error de conexión. Verifique su internet.';
    return msg || 'Error al iniciar sesión. Intente de nuevo.';
  }
}
