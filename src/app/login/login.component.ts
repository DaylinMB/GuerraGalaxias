import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.form.controls;
  }

onSubmit() {
    this.submitted = true;

    this.error = '';

    if (this.form.invalid) {
        return;
    }

    this.loading = true;

    this.authService.onLogin(this.form.value).subscribe({
        next: (response: any) => {
            console.log('Login successful!', response);
            // Save the token in localStorage
            localStorage.setItem('token', response.accessToken);
            // Redirect to home
            this.router.navigate(['/home']);
        },
        error: (error: any) => {
            this.error = 'Login failed. Please try again.';
            this.loading = false;
        },
    });
    
}


  


}























// import { Component, inject } from '@angular/core';
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
//   styleUrls: ['./login.component.scss'],
// })
// export class LoginComponent {
  
//   private http: HttpClient = inject(HttpClient);
//   private _location = inject(Location);
//   private route = inject(ActivatedRoute);
//   private router = inject(Router);
//   public authService = inject(AuthService);
  
//   public loading = false; // Para el estado de carga
//   public submitted = false; // Inicializar la propiedad submitted
//   public loginForm: FormGroup = new FormGroup({
//     email: new FormControl('', [Validators.required, Validators.email]),
//     password: new FormControl('', [Validators.required]),
//   });

//   onClose(): void {
//     this.authService.isErrorOnLogin.set(false);
//     this._location.back();
//   }

//   onSubmit(e: SubmitEvent): void {
//     e.preventDefault();
//     this.submitted = true; // Establece submitted a true al enviar el formulario
//     this.onLogin(this.loginForm.value);
//   }

//   onLogin(data: { email: string; password: string }): void {
//     if (this.loginForm.invalid) {
//       return; // No hagas nada si el formulario es inválido
//     }

//     this.loading = true; // Establece el estado de carga

//     this.authService.onLogin({ 
//       email: data.email, 
//       password: data.password 
//     }).subscribe({
//       next: (res) => {
//         this.authService.isLogged.set(true);
//         localStorage.setItem('token', res.accessToken);
//         const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//         this.router.navigate([returnUrl]);
//       },
//       error: (err) => {
//         this.authService.isErrorOnLogin.set(true);
//         this.authService.errorMessage.set(err.error); // Establece el mensaje de error
//         this.loading = false; // Detén el estado de carga
//       },
//     });
//   }
// }















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