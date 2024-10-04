// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }



import { Inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

http = Inject(HttpClient);
  public isLogged = signal(false);
  public isErrorOnLogin = signal<boolean>(false);
  public isLoggingIn: boolean = false;
  public isRegistering: boolean = false;
  public errorMessage = signal<string>('');

  constructor() {}

  onRegister(data: { firstName: string; lastName: string; username: string; password: string }): Observable<any> {
    return this.http.post('http://localhost:4200/users', data).pipe(
      tap({
        next: () => this.isLogged.set(true),
        error: (err) => this.errorMessage.set(err.error),
      })
    );
  }

  onLogin(data: { email: string; password: string }): Observable<any> {
    return this.http.post('http://localhost:4200/login', data).pipe(
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
  }
}