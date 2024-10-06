import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StarshipsComponent } from './starships/starships.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './_helpers/alert.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, CommonModule, StarshipsComponent, HomeComponent, ReactiveFormsModule, AlertComponent, LoginComponent, RegisterComponent, NavbarComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private router: Router) {}

  switchView(view: string) {
    switch (view) {
      case 'login':
        this.router.navigate(['/login']);
        break;
      case 'register':
        this.router.navigate(['/register']);
        break;
      case 'home':
        this.router.navigate(['/']);
        break;
      case 'starships':
        this.router.navigate(['/starships']);
        break;
    }
  }
}
