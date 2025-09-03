import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  public isBought: boolean = false;
  public productInfo: any;

  constructor(private actR: ActivatedRoute, private cookies: CookieService, private routing: Router, private api: ApiService) { };
  ngOnInit(): void {
  this.productInfo = this.actR.snapshot.data["productInfo"];
  window.scrollTo(0,0);
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
          this.isBought = true;
          setTimeout(() => {
            this.isBought = false;
          }, 2000);
        }
      });
    }else {
      this.routing.navigate(["/login"], {skipLocationChange: true})
    }
  }
}
