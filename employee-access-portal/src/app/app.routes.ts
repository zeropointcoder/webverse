import { Routes } from '@angular/router'
import { guestGuard } from './guards/guest'
import { authGuard } from './guards/auth'

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./components/login/login')
    .then(c => c.LoginComponent)
  },
  { path: 'register',
    canActivate: [guestGuard],
    loadComponent: () => import('./components/register/register')
    .then(c => c.RegisterComponent)
  },
  { path: 'dashboard', 
    canActivate: [authGuard],
    loadComponent: () => import('./components/dashboard/dashboard')
    .then(c => c.DashboardComponent)
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
]