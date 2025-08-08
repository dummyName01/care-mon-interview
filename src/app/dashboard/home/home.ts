import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { DashboardService } from '../dashboard-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  email = '';
  message = '';

  constructor(private auth: AuthService, private dashService: DashboardService) {}
  ngOnInit() {
    this.email = this.auth.getEmail();
    this.dashService.getDashboardData().subscribe({
      next: (data) => {
        this.message = data?.message || 'Welcome to the dashboard!';
      },
      error: (err) => { 
        this.message = 'Error loading dashboard data';
      }
    });
  }
}
