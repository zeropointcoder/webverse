import { Routes } from '@angular/router'
import { authGuard } from './core/guards/auth'
import { guestGuard } from './core/guards/guest'

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./auth/login/login')
    .then(c => c.LoginComponent)
  },
  { path: 'register',
    canActivate: [guestGuard],
    loadComponent: () => import('./auth/register/register')
    .then(c => c.RegisterComponent)
  },
  { path: 'dashboard', 
    canActivate: [authGuard],
    loadComponent: () => import('./dashboard/dashboard')
    .then(c => c.DashboardComponent)
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
]