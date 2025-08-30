import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { forkJoin } from 'rxjs';

export const shopResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const api = inject(ApiService);

  return forkJoin({
    categories: api.getAllCategories(),
    products: api.getAllProducts()
  })
};
