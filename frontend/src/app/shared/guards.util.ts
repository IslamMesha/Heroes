import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const canActivateHero: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const isLoggedUser = inject(AuthService).isLoggedUser();

  if (!isLoggedUser) {
    inject(Router).navigate(['/auth/login']);
  }

  return true;
};

export const canActivateAuth: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const isLoggedUser = inject(AuthService).isLoggedUser();

  if (isLoggedUser) {
    inject(Router).navigate(['/heroes']);
  }

  return true;
};
