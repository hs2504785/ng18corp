import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService = inject(ApiService);
  private tokenKey = 'authToken';
  apiUrl = 'auth/login';

  // Signal to track if the user is logged in
  isLoggedInSignal = signal(this.isLoggedIn());

  constructor(private http: HttpClient, private router: Router) {}

  login(cred: any) {
    return this.apiService.create(this.apiUrl, cred).pipe(
      tap((res: any) => {
        this.setToken(res.token);
        this.isLoggedInSignal.set(true); // Update the signal on login
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSignal.set(false);
  }
}
