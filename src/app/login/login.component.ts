import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@app/services/auth.service'; 
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent {
  
  private http: HttpClient = inject(HttpClient);
  private _location = inject(Location);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public authService = inject(AuthService);
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onClose(): void {
    // this.authService.isLoggingIn = false;
    this.authService.isErrorOnLogin.set(false);
    this._location.back();
  }

  onSubmit(e: SubmitEvent): void {
    e.preventDefault();
    // this.onLogin(this.loginForm.value);
  }

  onLogin(data: { email: string; password: string }): void {
    if (this.loginForm.controls['email'].invalid) {
      this.authService.errorMessage.set('Invalid email');
      return;
    }
    if (this.loginForm.controls['password'].invalid) {
      this.authService.errorMessage.set('Password is required');
      return;
    }
    
    // Cambiar aquí para llamar a onLogin correctamente
    this.authService.onLogin({ 
      email: data.email, 
      password: data.password 
    }).subscribe({
      next: (res) => {
        this.authService.isLogged.set(true);
        this.authService.isLoggingIn = false;
        localStorage.setItem('token', res.accessToken);
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
      },
      error: (err) => {
        this.authService.isErrorOnLogin.set(true);
        console.log(err);
      },
    });
  }
  
}







// import { Component, inject, signal } from '@angular/core';
// import { MatIconModule } from '@angular/material/icon';
// import { AuthService } from '@app/services/auth.service'; 
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { CommonModule, Location } from '@angular/common';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [MatIconModule, CommonModule, ReactiveFormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss',
// })

// export class LoginComponent {
  
//   private http: HttpClient = inject(HttpClient);
//   private _location = inject(Location);
//   private route = inject(ActivatedRoute);
//   private router = inject(Router);
//   public authService = inject(AuthService);
//   public loginForm: FormGroup = new FormGroup({
//     email: new FormControl('', [Validators.required, Validators.email]),
//     password: new FormControl('', [Validators.required]),
//   });

//   onClose(): void {
//     // this.authService.isLoggingIn = false;
//     this.authService.isErrorOnLogin.set(false);
//     this._location.back();
//   }

//   onSubmit(e: SubmitEvent): void {
//     e.preventDefault();
//     this.onLogin(this.loginForm.value);
//   }

//   onLogin(data: { email: string; password: string }): void {
//     if (this.loginForm.controls['email'].invalid) {
//       this.authService.errorMessage.set('Invalid email');
//       return;
//     }
//     if (this.loginForm.controls['password'].invalid) {
//       this.authService.errorMessage.set('Password is required');
//       return;
//     }
    
//     // Cambiar aquí para llamar a onLogin correctamente
//     this.authService.onLogin({ 
//       email: data.email, 
//       password: data.password 
//     }).subscribe({
//       next: (res) => {
//         this.authService.isLogged.set(true);
//         this.authService.isLoggingIn = false;
//         localStorage.setItem('token', res.accessToken);
//         const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//         this.router.navigate([returnUrl]);
//       },
//       error: (err) => {
//         this.authService.isErrorOnLogin.set(true);
//         console.log(err);
//       },
//     });
//   }
  
// }