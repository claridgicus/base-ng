import { APP_BASE_HREF } from '@angular/common';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';
import { SeoService } from './services/seo.service';

function initSeo(): () => void {
  const seoService = inject(SeoService);
  return () => seoService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    { provide: APP_BASE_HREF, useValue: '/docs' },
    {
      provide: APP_INITIALIZER,
      useFactory: initSeo,
      multi: true,
    },
  ],
};
