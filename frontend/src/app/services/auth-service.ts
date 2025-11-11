import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import TokenResponse from '../models/TokenResponse';
import { UserBase } from '../models/UserBase';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.API_URL}/login`, { username, password }).pipe(
      tap((res) => {
        this.saveTokens(res);
      })
    );
  }

  register(user: UserBase): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.API_URL}/register`, user).pipe(
      tap((res) => {
        this.saveTokens(res)
      })
    );
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
