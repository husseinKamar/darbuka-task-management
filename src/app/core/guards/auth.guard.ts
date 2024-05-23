import { Injectable, inject } from '@angular/core';

import {
  Router,
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { StorageHelper } from '../helpers/storage.helper';

export const isAuthanticatedGuardFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const storage = new StorageHelper();

  if (storage.get('token')) return true;

  console.log('not authorized');
  router.navigate(['/auth/login']);
  return false;
};
