import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, map } from 'rxjs/operators';
import { User } from '../../../common/User';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService implements OnInit {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private appURL = 'http://localhost:3000';
    private lastId = 0;
    private userId = new BehaviorSubject<number>(0);

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {
        this.getTamanho().subscribe(tamanho => {
            this.lastId = tamanho;
        });
    }

    getUserId(): Observable<number> {
        return this.userId.asObservable()
    }

    setUserId(id: number): void {
        this.userId.next(id);
    }

    ngOnInit() {
        this.getTamanho().subscribe(tamanho => {
            this.lastId = tamanho;
        });
    }

    getTamanho(): Observable<number> {
        return this.http.get<any>(`${this.appURL}/users`).pipe(
            map((users: any) => users.length)
        );
    }

    getUserById(userId: number): Observable<User> {
        return this.http.get<User>(this.appURL + "/users/" + userId.toString())
            .pipe(
                retry(2)
            );
    }

    addUser(user: User) {
        user.id = this.lastId + 1;
        return this.http.post<User>(this.appURL + "/users", user);
    }

    emailExists(email: string): Observable<boolean> {
        return this.http.get<any[]>(`${this.appURL}/users?email=${email}`).pipe(
            map((users: any[]) => users.length > 0)
        );
    }
}