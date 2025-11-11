import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const router = inject(Router)
  // si el user esta logueado, devuelve true, sino redirige al login
  return auth.isLoggedIn() ? true : router.parseUrl('/login')
};
