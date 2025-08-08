import { Component } from '@angular/core';
import { AuthService } from '../auth/auth-service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, MatButtonModule, MatToolbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    setTimeout(() => this.router.navigate(['/login']), 0);
  }
}
