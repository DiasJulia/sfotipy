import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private isLogged = new BehaviorSubject<boolean>(false);
    private appURL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<any>(`${this.appURL}/login`, { email, password });
    }

    getLoginStatus() {
        return this.isLogged.asObservable();
    }

    updateLoginStatus(newStatus: boolean) {
        this.isLogged.next(newStatus);
    }
}