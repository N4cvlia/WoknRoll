import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  public reviews: any = [
    { text: 'The best wok I’ve ever tasted. Perfect balance of flavor and spice!', author: 'Anna K.' },
    { text: 'Fast delivery, fresh ingredients, and amazing taste every time.', author: 'James R.' },
    { text: 'My go-to place for late night cravings. Always hits the spot!', author: 'Maria L.' },
    { text: 'The noodles are out of this world. 5 stars from me.', author: 'David W.' },
    { text: 'Every bite feels authentic and crafted with care.', author: 'Sophia M.' }
  ];
}
