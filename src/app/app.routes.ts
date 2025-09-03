import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { ShopComponent } from './Pages/shop/shop.component';
import { DetailsComponent } from './Pages/details/details.component';
import { shopResolver } from './Resolvers/shop.resolver';
import { loginGuard } from './Guards/login.guard';
import { profileResolver } from './Resolvers/profile.resolver';
import { profileGuard } from './Guards/profile.guard';
import { detailsResolver } from './Resolvers/details.resolver';
import { cartResolver } from './Resolvers/cart.resolver';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: 'shop',
        component: ShopComponent,
        resolve: {
            ShopInfo: shopResolver
        }
    },
    {
        path: 'cart',
        loadComponent: () => import('./Pages/cart/cart.component').then(m => m.CartComponent),
        canActivate: [profileGuard],
        resolve: {
            cartInfo: cartResolver
        }
    },
    {
        path: 'details',
        loadComponent: () => import('./Pages/details/details.component').then(m => m.DetailsComponent),
        resolve: {
            productInfo: detailsResolver
        }
    },
    {
        path: 'login',
        loadComponent: () => import('./Pages/login/login.component').then(m => m.LoginComponent),
        canActivate: [loginGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./Pages/register/register.component').then(m => m.RegisterComponent),
        canActivate: [loginGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./Pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [profileGuard],
        resolve: {
            profileInfo: profileResolver
        }
    },
    {path: '**', redirectTo: ''}
];
