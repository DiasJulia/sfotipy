import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, map } from 'rxjs/operators';
import { User } from '../../../common/User';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService implements OnInit {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private appURL = 'http://localhost:3000';
    private playlistCategories: string[] = [];
    private allCategories: string[] = [];
    private lastId = 0;

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getTamanho().subscribe(tamanho => {
            this.lastId = tamanho;
        });
    }

    getUserById(userId: number): Observable<User> {
        return this.http.get<User>(this.appURL + "/users/${userId}")
            .pipe(
                retry(2)
            );
    }

    getTamanho(): Observable<number> {
        return this.http.get<User[]>(`${this.appURL}/usuarios`).pipe(
            map((users: User[]) => users.length)
        );
    }

    addUser(user: User) {
        user.id = ++this.lastId;
        return this.http.post<User>(this.appURL + "/usuarios", user);
    }

    emailExists(email: string): Observable<boolean> {
        return this.http.get<any[]>(`${this.appURL}/usuarios?email=${email}`).pipe(
            map((users: any[]) => users.length > 0)
        );
    }
}