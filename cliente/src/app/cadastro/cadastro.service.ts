import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { User } from '../../../../common/User';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private taUrl = 'http://localhost:3000';
    private lastId = 0;

    constructor(private http: HttpClient) { }

    addUser(user: User) {
        user.id = ++this.lastId;
        return this.http.post<User>(this.taUrl + "/usuarios", user);
    }

    emailExists(email: string): Observable<boolean> {
        return this.http.get<any[]>(`${this.taUrl}/usuarios?email=${email}`).pipe(
            map((users: any[]) => users.length > 0)
        );
    }
}