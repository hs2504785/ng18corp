import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { UserInterface } from '../types/user.interface';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<UserInterface> {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserInterface> | Promise<UserInterface> | UserInterface {
    const userId = route.paramMap.get('id');
    const user = route.data['user']; // Check if user data is already available

    if (user) {
      return of(user);
    } else {
      return this.userService.getUser(userId);
    }
  }
}
