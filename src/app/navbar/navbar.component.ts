import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'], // Cambiado a 'styleUrls'
})
export class NavbarComponent {
  constructor(public router: Router, private authService: AuthService) {}

  logout(): void {
    this.authService.logout(); // Llamamos al servicio de autenticación para hacer logout
    this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
  }

  navigateTo(route: string) {
    console.log(`Navigating to ${route}`);
    this.router.navigate([`/${route}`]);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Usamos el servicio de autenticación para verificar si está loggeado
  }

  onStarshipsClick() {
    if (!localStorage.getItem('token')) {
        this.router.navigate(['/login']);
    } else {
        this.router.navigate(['/starships']);
    }
}

}
