import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import TokenResponse from '../models/TokenResponse';
import { RegisterRequest } from '../models/RegisterRequest';
import { Token } from '@angular/compiler';
import { LoginRequest } from '../models/LoginRequest';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:8080/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(user: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.API_URL}/login`, user).pipe(
      tap((res) => {
        this.saveTokens(res);
      })
    );
  }

  register(user: RegisterRequest): Observable<TokenResponse> {
    console.log(user);
    return this.http.post<TokenResponse>(`${this.API_URL}/register`, user).pipe(
      tap((res) => {
        this.saveTokens(res);
      })
    );
  }

  logout() {
    this.http.post<void>('http://localhost:8080/logout', {}).subscribe({
      next: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        this.router.navigate(['/']);
      },
      error: (e) => console.error(e)
    });
  }

  saveTokens(response: TokenResponse) {
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    localStorage.setItem('username', response.username);
    localStorage.setItem('role', response.role);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
