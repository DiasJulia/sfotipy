import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../common/User';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private URL = '../../usuarios-cadastrados.json';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.URL);
    }

    addUser(user: User): Observable<User[]> {
        return this.http.post<User[]>(this.URL, user);
    }
}