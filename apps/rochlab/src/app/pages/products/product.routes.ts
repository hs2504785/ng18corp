import { Route } from '@angular/router';
export const PRODUCT_ROUTES: Route[] = [
  {
    path: ':id/detail',
    loadComponent: () =>
      import('./components/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
];
