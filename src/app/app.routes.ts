import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VerifyComponent } from './pages/verify/verify.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'verify',
    component: VerifyComponent
  }
];