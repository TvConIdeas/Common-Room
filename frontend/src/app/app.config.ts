import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token-interceptor';
import { errorHandlerInterceptor } from './interceptors/error-handler-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Agregamos el interceptor para que Angular sepa que lo debe usar antes de cada petición

    provideHttpClient(
      withInterceptors([tokenInterceptor, errorHandlerInterceptor])
    )
  ]
};
