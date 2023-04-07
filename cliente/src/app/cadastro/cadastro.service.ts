import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

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

    emailExists(email: string): Observable<boolean> {
        return this.http.get<any[]>(`${this.taUrl}/usuarios?email=${email}`).pipe(
            map((users: any[]) => users.length > 0)
        );
    }
}