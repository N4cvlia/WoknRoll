import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SubjectsService } from '../../Services/subjects.service';
import { CookieService } from 'ngx-cookie-service';

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
  public sideButtons: any = [
    {
      boolean: false
    },
    {
      boolean: false
    }
  ]

  constructor(private api : ApiService, private actR: ActivatedRoute, private routing: Router, private subjects: SubjectsService, private cookies: CookieService) {
    scrollTo(0,0);
  }
  ngOnInit(): void {
    this.actR.data.subscribe((res) => {
      this.allCategorys = res['ShopInfo'].categories;
      this.allProducts = res['ShopInfo'].products;
    });
  }
  sidePanel(num:any) {
    this.sideButtons[num].boolean = !this.sideButtons[num].boolean
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
    });
  }
  applyFilterReset() {
    this.choosenSpicness = -1;
    this.noNuts = "";
    this.vegOnly = "";
    this.getAllProducts();
  }
  goToDetails(data: any) {
    this.routing.navigate(["/details"])
    this.subjects.setProduct(data);
  }
  addToCart(data: any) {
    if(this.cookies.get("User")) {
      const body = {
        quantity: 1,
        price: data.price,
        productId: data.id
      }
      this.api.addToCart(body).subscribe({
        next: () => {
            document.getElementById(`cart-message${data?.id}`)!.style.display = "flex"
            
            setTimeout(() => {
              document.getElementById(`cart-message${data?.id}`)!.style.display = "none"
            }, 2000);
        }
      });
    }else {
      this.routing.navigate(["/login"], {skipLocationChange: true})
    }
  }
}
