import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get('https://restaurant.stepprojects.ge/api/Products/GetAll');
  }
  getAllCategories() {
    return this.http.get('https://restaurant.stepprojects.ge/api/Categories/GetAll');
  }
  getProductsByCategory(id: number) {
    return this.http.get(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`);
  }
  signIn(body: any) {
    return this.http.post("https://api.everrest.educata.dev/auth/sign_in", body)
  }
  signUp(body: any) {
    return this.http.post("https://api.everrest.educata.dev/auth/sign_up", body)
  }
  getAuth() {
    return this.http.get("https://api.everrest.educata.dev/auth")
  }
  getCart() {
    return this.http.get("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
  }
  deleteItem(id: number) {
    return this.http.delete(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`)
  }
  updateItem(body: any) {
    return this.http.put(`https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket`, body)
  }
  addToCart(body: any) {
    return this.http.post(`https://restaurant.stepprojects.ge/api/Baskets/AddToBasket`, body)
  }
}
