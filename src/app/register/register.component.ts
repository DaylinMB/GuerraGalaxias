import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  error?: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: [
        '', 
        [Validators.required, Validators.email]
      ],
      password: [
        '', 
        [Validators.required, Validators.minLength(7)]
      ],
    });
  }

  get f() {
    return this.form.controls;
  }

  onRegister() {
    this.submitted = true;
    this.error = '';

    if (this.form.invalid) {
      return;
    }

    this.authService.signUp(this.form.value).subscribe({
      next: (response: any) => {
        console.log('Registration successful!', response);
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Registration error:', error);
        this.error = 'Registration failed. Please try again.';
      },
    });
  }
}
