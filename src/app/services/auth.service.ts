import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterSignup } from '@app/models/user.interface'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private loggedIn = false;
  constructor(private http: HttpClient) {}

  signUp(user: InterSignup): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  onLogin(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

}
