import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../../../../common/User';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private taUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    addUser(user: User) {
        return this.http.post<User>(this.taUrl + "/usuarios", user);
    }
}