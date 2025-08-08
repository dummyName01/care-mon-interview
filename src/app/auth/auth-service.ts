import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:3000/api';
  constructor(private http: HttpClient, private cookie: CookieService) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.API_URL}/login`, { email, password }).pipe(
      tap(res => {
        this.cookie.set('token', res.token);
        this.cookie.set('userEmail', res.user.email);
      }),
      // Catch errors and rethrow or handle as needed
      catchError((error) => {
        // Optionally, you can handle the error here or rethrow it
        // For example, you can return a user-friendly error message
        throw error?.error || new Error('Login failed');
      })
    );
  }

  logout() {
    this.cookie.deleteAll();
  }

  isLoggedIn() {
    return this.cookie.check('token');
  }

  getEmail() {
    return this.cookie.get('userEmail');
  }
}
