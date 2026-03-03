import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, UserRole } from '../../core/services/auth.service';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  selectedRole: UserRole = 'egis';

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

  ngOnInit(): void {
    // Leer el rol previamente seleccionado; si no existe, volver al inicio
    const role = this.auth.getRole();
    if (!role) {
      this.router.navigate(['/']);
      return;
    }
    this.selectedRole = role;
  }

  get roleLabel(): string {
    return this.selectedRole === 'egis' ? 'EGIS' : 'Constructora';
  }

  get roleIcon(): string {
    return this.selectedRole === 'egis' ? 'bi-briefcase-fill' : 'bi-tools';
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.getRawValue();
    this.loading = true;

    this.auth.login(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.alert.success('Sesión iniciada correctamente.');
        this.router.navigate([this.auth.getDashboardPath()]);
      },
      error: (err) => {
        this.loading = false;
        const msg = this.translateError(err?.message ?? '');
        this.alert.error(msg);
      },
    });
  }

  /** Traduce mensajes de error de Supabase al español */
  private translateError(msg: string): string {
    const lower = msg.toLowerCase();
    if (lower.includes('invalid login credentials')) return 'Correo o contraseña incorrectos.';
    if (lower.includes('email not confirmed')) return 'Debe confirmar su correo electrónico.';
    if (lower.includes('too many requests')) return 'Demasiados intentos. Espere un momento.';
    if (lower.includes('user not found')) return 'No se encontró una cuenta con ese correo.';
    if (lower.includes('network')) return 'Error de conexión. Verifique su internet.';
    return msg || 'Error al iniciar sesión. Intente de nuevo.';
  }
}
