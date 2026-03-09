import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../../supabase.service';

type Portal = 'egis' | 'constructora';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  loading = signal(false);
  errorMsg = signal<string | null>(null);
  activeTab = signal<Portal>('egis');

  constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private router: Router,
  ) {
    this.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  selectTab(tab: Portal): void {
    this.activeTab.set(tab);
    this.errorMsg.set(null);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();
    this.loading.set(true);
    this.errorMsg.set(null);

    try {
      // 1. Autenticar contra Supabase Auth
      await this.supabase.signIn(email, password);

      // 2. Obtener sesión para extraer el user.id
      const session = await this.supabase.getSession();
      if (!session?.user) {
        this.errorMsg.set('No se pudo obtener la sesión. Intente de nuevo.');
        return;
      }

      // 3. Consultar rol y empresa_id en tabla pública "usuarios"
      const { data: perfil, error } = await this.supabase.client
        .from('usuarios')
        .select('rol, empresa_id')
        .eq('id', session.user.id)
        .single();

      if (error || !perfil) {
        this.errorMsg.set(
          'Su cuenta existe, pero no tiene un perfil asignado. Contacte al administrador.'
        );
        await this.supabase.signOut();
        return;
      }

      const rol: string = perfil.rol;
      const tab = this.activeTab();

      // 4. Verificar coherencia entre pestaña elegida y rol real
      const esRolEgis = rol === 'egis' || rol === 'hito_egis';
      const esRolConstructora = rol === 'dueño_constructora' || rol === 'constructora';

      if (tab === 'egis' && !esRolEgis) {
        this.errorMsg.set(
          'Su cuenta pertenece al portal de Constructora. Use la pestaña "Constructora" para ingresar.'
        );
        await this.supabase.signOut();
        return;
      }

      if (tab === 'constructora' && !esRolConstructora) {
        this.errorMsg.set(
          'Su cuenta pertenece al portal EGIS. Use la pestaña "EGIS" para ingresar.'
        );
        await this.supabase.signOut();
        return;
      }

      // 5. Redirigir según rol
      if (esRolEgis) {
        this.router.navigate(['/egis/dashboard']);
      } else if (esRolConstructora) {
        this.router.navigate(['/constructora/dashboard']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } catch (err: any) {
      this.errorMsg.set(this.translateError(err?.message ?? ''));
    } finally {
      this.loading.set(false);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  private translateError(msg: string): string {
    const lower = msg.toLowerCase();
    if (lower.includes('invalid login credentials')) return 'Correo o contraseña incorrectos.';
    if (lower.includes('email not confirmed'))       return 'Debe confirmar su correo electrónico.';
    if (lower.includes('too many requests'))          return 'Demasiados intentos. Espere un momento.';
    if (lower.includes('network'))                    return 'Error de conexión. Verifique su internet.';
    return msg || 'Error al iniciar sesión. Intente de nuevo.';
  }
}
