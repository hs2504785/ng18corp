import { Route } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from '@lib/services';

export const appRoutes: Route[] = [
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/user.routes').then((m) => m.USER_ROUTES),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./pages/products/product.routes').then((m) => m.PRODUCT_ROUTES),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./pages/categories/categories.component').then(
        (m) => m.CategoriesComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'secret',
    loadComponent: () =>
      import('./pages/secret/secret.component').then((m) => m.SecretComponent),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
  },
];
