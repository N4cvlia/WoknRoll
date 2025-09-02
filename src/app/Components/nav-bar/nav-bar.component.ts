import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../Services/api.service';
import { SubjectsService } from '../../Services/subjects.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public profile: any;
  private sub!: Subscription;

  constructor(private api : ApiService, private subjects: SubjectsService, private cookies: CookieService){};
  ngOnInit(): void {
    this.getAuth();

    this.sub = this.subjects.loginStatus$.subscribe(() => {
      this.getAuth();
    })
  }

  getAuth() {
    if (this.cookies.get("User")) {
      this.api.getAuth().subscribe({
        next: (data:any) => {
          this.profile = data;
          console.log(data)
          this.isLoggedIn = true;
        }
      });
    }else {
      console.log("logged in")
    }
  }

}
