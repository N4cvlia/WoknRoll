import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>("", [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>("", [
      Validators.required
    ])
  })

  public succ: boolean = false;
  public err: boolean = false;
  constructor(private routing: Router, private cookie: CookieService) {
    window.scrollTo(0,0);
  }

  login() {
    this.api.signIn(this.loginForm.value).subscribe({
      next: (data:any) => {
        this.cookie.set("User", data.access_token),
        setTimeout(() => {
          
          this.routing.navigate([""], {skipLocationChange: true})
          
        }, 3000);
        this.succ = true
        this.err = false;
      },
      error: (data:any) => {
        this.err = true;
      }
    })
  }
}
