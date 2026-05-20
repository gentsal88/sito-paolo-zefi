import { Routes } from '@angular/router';
import { LoginComponent } from '@pages/login/login.component';
import { AdminComponent } from '@pages/admin/admin.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { AdminGuard } from '@core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
  },
  {
    path: '**',
    redirectTo: 'admin',
  },
];
