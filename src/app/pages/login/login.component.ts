import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  username = '';
  password = '';
  errorMessage = '';
  isSubmitting = false;
  showPassword = false;

  ngOnInit(): void {
    // If already logged in, redirect to submissions
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin/submissions']);
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Please enter both username and password.';
      return;
    }

    this.isSubmitting = true;

    // Simulate a brief delay for UX
    setTimeout(() => {
      const success = this.authService.login(
        this.username.trim(),
        this.password
      );

      if (success) {
        this.router.navigate(['/admin/submissions']);
      } else {
        this.errorMessage = 'Invalid username or password.';
      }

      this.isSubmitting = false;
    }, 500);
  }
}
