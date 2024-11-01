import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { environment } from '../environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { globalProviders } from '@lib/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    globalProviders,
    provideHttpClient(withInterceptors([])),
    provideRouter(appRoutes),
    { provide: 'ENV_CONFIG', useValue: environment },
  ],
};
