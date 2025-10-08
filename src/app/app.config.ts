import {

  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch , withInterceptors} from '@angular/common/http';
import {authInterceptor} from './core/auth.interceptor';
import { routes } from './app.routes';
import {CartService} from './services/cart.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }), //co che phat hien thay doi cua Angular
    provideRouter(routes), //kich hoat he thong dinh tuyen va cung cap so do duong di
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])), //cau hinh interceptor
  ]
};
//khai bao cac provider se duoc su dung tren toan bo ung dung
