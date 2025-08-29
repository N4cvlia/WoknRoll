import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-shop',
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{
  public allCategorys: any;
  public allProducts: any;

  constructor(private api : ApiService) {}
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategorys();
  }

  getAllProducts() {
    this.api.getAllProducts().subscribe((res) => {
      this.allProducts = res;
      console.log(res);
    });
  }
  getAllCategorys() {
    this.api.getAllCategories().subscribe((res) => {
      this.allCategorys = res;
      console.log(res);
    });
  }
}
