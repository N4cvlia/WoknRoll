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
}
