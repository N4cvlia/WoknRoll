import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private loginStatusSource = new Subject<void>();
  loginStatus$ = this.loginStatusSource.asObservable();

  notifyLogin() {
    this.loginStatusSource.next()
  }
}
