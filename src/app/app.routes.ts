import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {authGuard} from './core/auth.guard';
import {CartComponent} from './components/cart.component/cart.component';
import {CreateShopComponent} from './components/create-shop.component/create-shop.component';
import {ShopComponent} from './components/shop.component/shop.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'home/category/:categoryId',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home/cart/:itemId',
    component: CartComponent,
    canActivate: [authGuard],
  },
  {
    path:'home/create-shop',
    component: CreateShopComponent,
    canActivate: [authGuard],
  },
  {
    path: 'shop',
    component: ShopComponent,
    canActivate: [authGuard],
  }
];
