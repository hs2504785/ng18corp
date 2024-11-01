import { Route } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const appRoutes: Route[] = [
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users.component').then((m) => m.UsersComponent),
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
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
  },
];
