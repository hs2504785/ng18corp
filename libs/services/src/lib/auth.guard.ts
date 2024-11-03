import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import { ToastService } from '@lib/components';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private toastService = inject(ToastService);
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedInSignal()) {
      return true;
    } else {
      this.toastService.error('Please login to access secret page.');
      this.router.navigate(['/']);
      return false;
    }
  }
}
