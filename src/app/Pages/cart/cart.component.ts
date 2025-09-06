import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  public cartInfo: any;
  public total: number = 0;
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;

  constructor(private actR: ActivatedRoute, private api: ApiService) { }
  ngOnInit(): void {
    this.cartInfo = this.actR.snapshot.data["cartInfo"];
    this.calcTotal();
  }

  calcTotal(): void {
    this.cartInfo.forEach((item: any) => {
      this.total += item.price * item.quantity;
    })
  }
  deleteItem(id: number, index: number): void {
    this.api.deleteItem(id).subscribe({
      next: () => {
        this.total = 0;
        this.calcTotal();
      }
    });
    this.cartInfo.splice(index, 1);
  }
  quantityIncrease(data: any) {
    data.quantity += 1;

    const body = {
      quantity: data.quantity,
      price: data.price,
      productId: data.product.id
    }

    this.api.updateItem(body).subscribe({
      next: () => {
        this.total = 0;
        this.calcTotal();
      }
    });
  }
  quantityDecrease(data: any) {
    if(data.quantity > 1) {
      data.quantity -= 1;

    const body = {
      quantity: data.quantity,
      price: data.price,
      productId: data.product.id
    }

    this.api.updateItem(body).subscribe({
      next: () => {
        this.total = 0;
        this.calcTotal();
      }
    });
    }
  }
}
