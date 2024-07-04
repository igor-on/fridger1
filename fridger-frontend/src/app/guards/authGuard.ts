import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const expirationDate = localStorage.getItem('expirationDate');

  if (
    !token ||
    !expirationDate ||
    new Date(expirationDate).getTime() < Date.now()
  ) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
