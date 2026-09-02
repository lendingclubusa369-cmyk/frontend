import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { LoginComponent } from './pages/login/login.component';
import { SubmissionsComponent } from './pages/submissions/submissions.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'verify',
    component: VerifyComponent
  },
  {
    path: 'admin/login',
    component: LoginComponent
  },
  {
    path: 'admin/submissions',
    component: SubmissionsComponent,
    canActivate: [authGuard]
  }
];