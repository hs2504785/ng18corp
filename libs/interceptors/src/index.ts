// import { AuthInterceptor } from './lib/auth-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './lib/loader-interceptor.service';
import { CacheInterceptor } from './lib/cache.interceptor';
import { AuthInterceptor } from './lib/auth.interceptor';

export const globalProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  // { provide: ErrorHandler, useClass: GlobalErrorHandler },
  // { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
];
