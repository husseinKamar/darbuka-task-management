import { Injectable, inject } from '@angular/core';

import {
  Router,
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

export const isAuthanticatedGuardFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // const router = inject(Router);

  // if(isAuthorized){
  return true;
  // }

  //   router.navigate(['/auth/login']);
  //   return false;
};
