import { Route } from '@angular/router';
import { UserResolver } from './services/user.resolver';
export const USER_ROUTES: Route[] = [
  {
    path: ':id/detail',
    loadComponent: () =>
      import('./components/user-detail/user-detail.component').then(
        (m) => m.UserDetailComponent
      ),
    resolve: {
      user: UserResolver,
    },
  },
  {
    path: '',
    loadComponent: () =>
      import('./user-list/user-list.component').then(
        (m) => m.UserListComponent
      ),
  },
];
