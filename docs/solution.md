# Solution

1. Create and share a public repository on GitHub, Bitbucket, etc. - `Done`

   Source Code: https://github.com/hs2504785/ng18corp/tree/main

   Demo link - https://hs2504785.github.io/ng18corp/

   API - https://fakestoreapi.com/ ( may be we will use 2-3 endpoints (products, carts, categories ) to demonstrate the concept

2. Push the final source code to the master branch. - `Done`
3. Create an Angular project using version 15+ and include all plugins that help you in your daily coding.

Using `Angular 18`

4. Create an application with lazy loading modules. - `Done`

```js
// all routes users, products, categories lazy loaded
// lazy load component `loadComponent`
// lazy load routes `loadChildren` ( nested routes )
// apps/rochlab/src/app/app.routes.ts
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
```

5. Create a simple communication layer between the application and the lazy loaded module:
   - Set up a way for the main application to communicate with the lazy-loaded module. This could be achieved through Angular services, Input/Output decorators, or state management libraries like NgRx.
   - The communication layer will allow data or events to flow between the main application and the lazy-loaded module.

Angular 17+ have signal that we are using for state management. from any eager/lazy loaded module set signal value ( mySignal.set(val) ) that you can access from any other eager/lazy loaded module

Reference: `libs/services/src/lib/api.service.ts`, `libs/services/src/lib/resource.service.ts`

6. Dynamically register additional routes inside the lazy-loaded module when it is initialized:
   - When the lazy-loaded module gets initialized, it should dynamically register additional routes. This means the routes should not be predefined but instead added at runtime.
   - You can achieve this by modifying the router configuration within the lazy-loaded module using Angular’s `RouterModule` API.

```js
// inside this :id (path: ':id/detail') is dynamic, you should be able to get details of any product
// apps/rochlab/src/app/pages/products/product.routes.ts
export const PRODUCT_ROUTES: Route[] = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: ':id/detail',
        loadComponent: () => import('./components/product-detail/product-detail.component').then((m) => m.ProductDetailComponent),
      },
    ],
  },
];
```

7. Pass values through the communication layer to the lazy-loaded component, router, or router guard:
   - When navigating to a lazy-loaded module, pass values (e.g., via route parameters, query parameters, or a shared service).

- param is for small information for ex. path: ':id/detail' that we can receive with ActivatedRoute

```js
// apps/rochlab/src/app/pages/products/components/product-detail/product-detail.component.ts
const productId: any = this.route.snapshot.paramMap.get('id');
```

- queryParam is for also small information for ex. path: 'products?page=12&limit=20' that we can receive with ActivatedRoute

```js
// Not used anywhere yet
const pageNo: any = this.route.snapshot.queryParamMap.get('page');
const limit: any = this.route.snapshot.queryParamMap.get('limit');
```

If want to pass object you want to use shared services, in our case 'ProductService' for products feature.

For ex. if you want to see details of product we open details page

```js
// open details with product id
// update the signal `selectedProductId` with dynamic product id
// selected product autmatically updated if any of its dependency signal get update (selectedProductId)
goToDetails(item: any) {
    this.productService.selectProduct(item.id);
    this.router.navigate(['products', item.id, 'detail']);
}

// Derive the selected product based on selectedProductId and products
selectedProduct = computed(() => {
const productId = this.selectedProductId();
if (productId)
    return this.products().find((product) => product.id === +productId);

return null;
});

// now we can simply access product whereever we need it
selectedProduct = this.productService.selectedProduct;
```

- The values should be accessible by the lazy-loaded components, routers, or router guards. This might be useful for conditionally allowing navigation based on certain criteria, handling authentication, or passing data directly to the component.

  > using resolver we can fetch and pass data to components before they are activated

```js
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
]

// Access resolved data in any eager/lazy loaded component `this.route.snapshot.data['user']`
export class UserDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  selectedUser!: any;

  ngOnInit() {
    this.selectedUser = this.route.snapshot.data['user'];
  }
}
```

> for condinitional navigation we can use route guards

```js
// I want secret page to be accessible to authenticated user
// AuthGuard used for conditional routing
{
  path: 'secret',
  loadComponent: () =>
    import('./pages/secret/secret.component').then((m) => m.SecretComponent),
  canActivate: [AuthGuard],
},

// AuthGuard
// return true from canActivate to allow access, to bloclk access return false
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
```
