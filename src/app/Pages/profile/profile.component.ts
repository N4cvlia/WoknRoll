import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SubjectsService } from '../../Services/subjects.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  public authInfo: any;
  constructor(private actR: ActivatedRoute, private cookies: CookieService, private routing: Router, private subjects: SubjectsService) {
    window.scrollTo(0, 0);
  }
  ngOnInit(): void {
    this.authInfo = this.actR.snapshot.data["profileInfo"];
  }

  logOut(): void {
    this.cookies.set("User", "")
    this.subjects.notifyLogin()
    alert("Succesfully Logged Out!")
    setTimeout(() => {
      this.routing.navigate([""])
    }, 1000);
  }
}
