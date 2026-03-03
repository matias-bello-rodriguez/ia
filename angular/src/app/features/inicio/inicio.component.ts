import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, UserRole } from '../../core/services/auth.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
})
export class InicioComponent {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}


  selectProfile(role: UserRole): void {
    this.auth.selectRole(role);
    this.router.navigate(['/login']);
  }
}
