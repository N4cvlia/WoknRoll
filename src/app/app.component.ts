import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./Components/nav-bar/nav-bar.component";
import { FooterComponent } from "./Components/footer/footer.component";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WoknRoll';

  constructor(private cookies: CookieService) {
    this.logout();
  }

  logout(): void {
    setInterval(() => {
      this.cookies.set("User", "")
    }, 600000);
  }
}
