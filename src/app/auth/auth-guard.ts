import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';

// This guard checks if the user is logged in before allowing access to certain routes.
// If the user is not logged in, they are redirected to the login page.
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
