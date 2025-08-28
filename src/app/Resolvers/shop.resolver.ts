import { ResolveFn } from '@angular/router';

export const shopResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
