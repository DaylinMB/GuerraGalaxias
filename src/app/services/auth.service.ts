import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { InterSignup } from '@app/models/user.interface';  

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  
  private apiUrl = 'http://localhost:4200';

  // Propiedades para el estado de autenticación
  public isLogged = signal<boolean>(false);
  public isErrorOnLogin = signal<boolean>(false);
  public isLoggingIn: boolean = false;
  public errorMessage = signal<string>('');

  constructor() {}

  signUp(user: InterSignup): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user).pipe(
      tap({
        next: () => this.isLogged.set(true),
        error: (err) => this.errorMessage.set(err.error),
      })
    );
  }

  onLogin(data: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, data).pipe(
      tap({
        next: () => this.isLogged.set(true),
        error: (err) => {
          this.errorMessage.set(err.error);
          this.isLogged.set(false);
        },
      })
    );
  }

  isLoggedIn(): boolean {
    return this.isLogged();
  }

  onLogout(): void {
    this.isLogged.set(false);
    localStorage.removeItem('token');
  }
}