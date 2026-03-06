import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
})
export class InicioComponent {
  constructor(private router: Router) {}

  /** Navegar directamente al login (el rol se determina desde la tabla usuarios) */
  irAlLogin(): void {
    this.router.navigate(['/login']);
  }
}
