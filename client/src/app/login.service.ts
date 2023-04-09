import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLogged = new BehaviorSubject<boolean>(true);
  
  constructor() { }

  getLoginStatus() {
    return this.isLogged.asObservable();
  }

  updateLoginStatus(newStatus: boolean) {
    this.isLogged.next(newStatus);
  }
}
