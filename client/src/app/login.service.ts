import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../common/User';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private isLogged = new BehaviorSubject<boolean>(false);
    private appURL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    login(values: { email: string, password: string }) {
        return this.http.get<User[]>(`${this.appURL}/users?email=${values.email}`)
    }

    getLoginStatus() {
        return this.isLogged.asObservable();
    }

    updateLoginStatus(newStatus: boolean) {
        this.isLogged.next(newStatus);
    }
}