import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { ShopComponent } from './Pages/shop/shop.component';
import { DetailsComponent } from './Pages/details/details.component';
import { shopResolver } from './Resolvers/shop.resolver';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: 'shop',
        component: ShopComponent,
        resolve: {
            ShopInfo: shopResolver
        }
    },
    {path: 'cart', loadComponent: () => import('./Pages/cart/cart.component').then(m => m.CartComponent)},
    {path: 'product/:id', loadComponent: () => import('./Pages/details/details.component').then(m => m.DetailsComponent)},
    {path: '**', redirectTo: ''}
];
