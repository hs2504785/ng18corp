import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { UserInterface } from '../types/user.interface';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<UserInterface> {
  constructor(private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserInterface> {
    const userId = route.paramMap.get('id');
    const user = route.data['user'];

    if (user) {
      return of(user);
    } else if (userId) {
      return this.userService.getById(userId).pipe(
        catchError(() => {
          return of({} as UserInterface);
        }),
        map((user) => user || ({} as UserInterface))
      );
    }

    return of({} as UserInterface);
  }
}
