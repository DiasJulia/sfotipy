import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { User } from '../../../../common/User';

@Injectable({
    providedIn: 'root'
})
export class RegisterService implements OnInit {


    private taUrl = 'http://localhost:3000';
    private lastId = 0;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getTamanho().subscribe(tamanho => {
            this.lastId = tamanho;
        });
    }

    getTamanho(): Observable<number> {
        return this.http.get<User[]>(`${this.taUrl}/usuarios`).pipe(
            map((users: User[]) => users.length)
        );
    }

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