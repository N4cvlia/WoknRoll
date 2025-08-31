import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  imports: [FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{
  public allCategorys: any;
  public allProducts: any;
  public choosenSpicness: number = -1;
  public noNuts: any = "";
  public vegOnly: any = "";

  constructor(private api : ApiService, private actR: ActivatedRoute) {
    scrollTo(0,0);
  }
  ngOnInit(): void {
    this.actR.data.subscribe((res) => {
      this.allCategorys = res['ShopInfo'].categories;
      console.log(this.allCategorys);
      this.allProducts = res['ShopInfo'].products;
    });
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
  getProductByCategory(id: number) {
    this.api.getProductsByCategory(id).subscribe((res: any) => {
      this.allProducts = res.products;
      console.log(res);
    });
  }
}
