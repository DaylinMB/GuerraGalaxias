import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { InterSignup } from '@app/models/user.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  user: InterSignup = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  };
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.error = null;
    console.log('Usuario registrado:', this.user);

    this.authService.signUp(this.user).subscribe(
      (response: any) => {
        console.log('Registration successful!', response);
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Registration error:', error);
        this.error = 'Registration failed. Please try again.';
      }
    );
  }
}
