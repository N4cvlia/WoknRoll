import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private loginStatusSource = new Subject<void>();
  loginStatus$ = this.loginStatusSource.asObservable();
  private product : any;

  notifyLogin() {
    this.loginStatusSource.next()
  }
  setProduct(product: any) {
    this.product = product;
    localStorage.setItem('selectedProduct', JSON.stringify(product));
  }
  getProduct() {
    if (this.product) {
      return this.product;
    }
    const storedProduct = localStorage.getItem('selectedProduct');
    return storedProduct ? JSON.parse(storedProduct) : null;
  }
}
