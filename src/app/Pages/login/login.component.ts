import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { SubjectsService } from '../../Services/subjects.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
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
  constructor(private routing: Router, private cookie: CookieService, private api: ApiService, private subjects: SubjectsService) {
    window.scrollTo(0,0);
  }

  login() {
    this.api.signIn(this.loginForm.value).subscribe({
      next: (data:any) => {
        this.cookie.set("User", data.access_token),
        setTimeout(() => {
          
          this.routing.navigate(["shop"], {skipLocationChange: true})
          
        }, 3000);
        this.succ = true
        this.err = false;
        this.subjects.notifyLogin();
      },
      error: (data:any) => {
        this.err = true;
      }
    })
  }
}
