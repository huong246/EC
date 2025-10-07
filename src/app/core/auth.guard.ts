import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/authService';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.isLoggedIn())
  {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
// kiem tra xem nguoi dung da dang nhap hay chua: su dung CanActiveFn(authGuard)
