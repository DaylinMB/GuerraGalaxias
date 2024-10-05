// import { HttpClient } from '@angular/common/http';
// import { Injectable, inject, signal } from '@angular/core';
// import { Observable, tap } from 'rxjs';
// import { InterSignup } from '@app/models/user.interface';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   http = inject(HttpClient);

//   private apiUrl = 'http://localhost:3000';

//   // Propiedades para el estado de autenticación
//   public isLogged = signal<boolean>(false);
//   public isErrorOnLogin = signal<boolean>(false);
//   public isLoggingIn: boolean = false;
//   public errorMessage = signal<string>('');

//   constructor() {}

//   signUp(user: InterSignup): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/users`, user).pipe(
//       tap({
//         next: () => this.isLogged.set(true),
//         error: (err) => this.errorMessage.set(err.error),
//       })
//     );
//   }

//   onLogin(data: { email: string; password: string }): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/login`, data).pipe(
//       tap({
//         next: () => this.isLogged.set(true),
//         error: (err) => {
//           this.errorMessage.set(err.error);
//           this.isLogged.set(false);
//         },
//       })
//     );
//   }

//   isLoggedIn(): boolean {
//     return this.isLogged();
//   }

//   onLogout(): void {
//     this.isLogged.set(false);
//     localStorage.removeItem('token');
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterSignup } from '@app/models/user.interface'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private loggedIn = false; // Cambia esto según tu lógica de autenticación

  constructor(private http: HttpClient) {}

  signUp(user: InterSignup): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  onLogin(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si el token existe
  }

  logout(): void {
    localStorage.removeItem('token'); // Remueve el token para hacer logout
  }

}
