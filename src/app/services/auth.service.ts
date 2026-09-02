import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly STORAGE_KEY = 'admin_logged_in';
  private readonly VALID_USERNAME = 'jadenturner';
  private readonly VALID_PASSWORD = 'Godisgreat@369';

  constructor(private readonly router: Router) {}

  login(username: string, password: string): boolean {
    if (
      username === this.VALID_USERNAME &&
      password === this.VALID_PASSWORD
    ) {
      localStorage.setItem(this.STORAGE_KEY, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.router.navigate(['/admin/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) === 'true';
  }
}
