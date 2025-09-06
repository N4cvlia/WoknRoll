import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  public profileVisib: boolean = false;
  public profile: any;
  private sub!: Subscription;
  @ViewChild("profileDropdown") profileDropdown! : ElementRef;
  @HostListener("document:click", ['$event'])
  onDocumentClick(event : Event) {
    if(!this.profileDropdown.nativeElement.contains(event.target)) {
      this.profileVisib = false
    }
  }

  constructor(private api : ApiService, private subjects: SubjectsService, private cookies: CookieService, private routing: Router){};
  ngOnInit(): void {
    this.getAuth();

    this.sub = this.subjects.loginStatus$.subscribe(() => {
      this.getAuth();
      this.isLoggedIn = false;
      this.profileVisib = false;
    })
  }
  profileDrop(event: Event) {
    event.stopPropagation();
    this.profileVisib = !this.profileVisib
  }

  getAuth() {
    if (this.cookies.get("User")) {
      this.api.getAuth().subscribe({
        next: (data:any) => {
          this.profile = data;
          this.isLoggedIn = true;
        }
      });
    }
  }
  logOut(): void {
    this.cookies.set("User", "")
    this.subjects.notifyLogin()
    alert("Succesfully Logged Out!")
    setTimeout(() => {
      this.routing.navigate([""])
    }, 1000);
    this.profileVisib = false;
    this.isLoggedIn = false;
  }
}
