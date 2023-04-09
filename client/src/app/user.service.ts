import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, map } from 'rxjs/operators';
import { User } from '../../../common/user';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private appURL = 'http://localhost:3000';
  private userId = new BehaviorSubject<number>(0);

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getUserId() : Observable<number> {
    return this.userId.asObservable()
  }

  setUserId(id: number) : void {
    this.userId.next(id);
  }

  getUserById(userId : number) : Observable<User> {
    return this.http.get<User>(this.appURL + "/users/" + userId.toString())
      .pipe(
        retry(2)
      );
  }
}
