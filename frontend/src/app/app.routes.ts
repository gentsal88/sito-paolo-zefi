import { Routes } from '@angular/router';
import { LoginComponent } from '@pages/login/login.component';
import { AdminComponent } from '@pages/admin/admin.component';
import { HomeComponent } from '@pages/public/home/home.page';
import { AuthGuard } from '@core/guards/auth.guard';
import { AdminGuard } from '@core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
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
    path: 'content/:id',
    loadComponent: () => import('@pages/public/content/content-page.component').then(m => m.ContentPageComponent)
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
