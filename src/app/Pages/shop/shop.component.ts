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
  public isChecked: any = "checked";

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
      this.isChecked = "checked";
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
      this.isChecked = "";
    });
  }
  applyFilter() {
    this.api.getAllProducts().subscribe((res: any) => {
      this.allProducts = res;

      if(this.choosenSpicness == -1) {
        this.getAllProducts();
        this.noNuts = "";
        this.vegOnly = "";
      }
      if(this.choosenSpicness != -1) {
        this.allProducts = this.allProducts.filter((p: any) => p.spiciness == this.choosenSpicness);
        this.isChecked = "checked";
      }
      if(this.noNuts) {
        this.allProducts = this.allProducts.filter((p: any) => p.nuts == true);
      }
      if(this.vegOnly) {
        this.allProducts = this.allProducts.filter((p: any) => p.vegeterian == true);
      }
      console.log(this.allProducts);
    });
  }
  applyFilterReset() {
    this.choosenSpicness = -1;
    this.noNuts = "";
    this.vegOnly = "";
    this.getAllProducts();
  }
}
