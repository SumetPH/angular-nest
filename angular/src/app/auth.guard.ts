import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UtilsService } from './utils.service';
import { AuthStoreService } from './store/authStore.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const utilsService = inject(UtilsService);
  const authStoreService = inject(AuthStoreService);

  const isAuthenticated = utilsService.isAuthenticated();

  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  authStoreService.setState({ userData: isAuthenticated });
  return true;
};
