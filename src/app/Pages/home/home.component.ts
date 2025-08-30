import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewsComponent } from "../../Components/reviews/reviews.component";


@Component({
  selector: 'app-home',
  imports: [ReviewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private routing: Router) { }

  goToMenu(): void{
    this.routing.navigate(['/shop']);
  }
}
