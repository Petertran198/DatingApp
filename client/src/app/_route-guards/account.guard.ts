import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AccountService } from '../_services/AccountService';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

// Angular 16+ switched to using authGuard function
export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const accountService: AccountService = inject(AccountService);
  const toastrService: ToastrService = inject(ToastrService);

  return accountService.currentUser$.pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        toastrService.error('Must be logged in');
        return false;
      }
    })
  );
};
