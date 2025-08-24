
import { ApplicationConfig, provideAppInitializer, inject, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ConfigService } from './services/config.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),

    // 🔧 DÜZELTİLDİ: doğrudan Promise döndür
    provideAppInitializer(() => {
      const cfg = inject(ConfigService);
      return cfg.load();
    }),
  ]
};
