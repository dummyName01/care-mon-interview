import { Component } from '@angular/core';
import { AuthService } from '../auth/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  loginError = '';
  error = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.loginError =  err?.message || 'Login failed';
        this.error = true;
      }
    });
  }
}
