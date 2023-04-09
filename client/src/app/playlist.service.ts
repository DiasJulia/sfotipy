import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, map } from 'rxjs/operators';
import { Playlist } from '../../../common/playlist';
import { Music } from '../../../common/music';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../../../common/category';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private appURL = 'http://localhost:3000';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  addPlaylist(playlist: Playlist) {
    return this.http.post(`${this.appURL}/criar_playlist`, playlist, this.httpOptions)
      .pipe(retry(2));
  }

  verificarNomePlaylistExistente(name: string): Observable<boolean> {
    const url = `${this.appURL}/criar_playlist/${name}`;
    return this.http.get<boolean>(url).pipe(
      map((result) => {
        return result;
      })
    );
  }

  updatePlaylistMusics(playlist : Playlist) {
    return this.http.put(`${this.appURL}/playlist`, playlist, this.httpOptions)
      .pipe(retry(2))
  }

  getUserPlaylists(ownerId: any): Observable<Playlist[]>  {
    const url = `${this.appURL}/minhas_playlists/${ownerId}`;
    return this.http.get<any[]>(url).pipe(
      map(response => {
        return response.map(item => new Playlist(<Playlist>{ ...item }));
      }),
      map(playlists => {
        return playlists.filter(playlist => playlist.ownerId === ownerId);
      })
    );
  }

  getCategories(id: number) {
    this.http.get<string[]>(this.appURL + "playlist/category/" + id)
      .pipe(
        retry(2)
      );
  }

  getPlaylistCategories(id: number): Observable<Category[]> {
    return this.http.get<Category[]>(this.appURL + "/category/" + id)
      .pipe(
        retry(2)
      );
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.appURL + "/category")
      .pipe(
        retry(2)
      );
  }

  addNewCategory(id: number, category: Category): Observable<Category | null> {
    return this.http.post<any>(this.appURL + "/category/" + id, { category: category }, this.httpOptions)
      .pipe(
        retry(2),
        map(res => { if (res.success) { return category; } else { return null; } })
      )
  }

  deleteCategory(id: number, category: Category) {
    const data = { category: category }
    return this.http.delete<any>(this.appURL + "/category/" + id, { body: data })
      .pipe(
        retry(2),
        map(res => { if (res.success) { return category; } else { return null; } })
      )
  }

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.appURL + "/playlists")
      .pipe(
        retry(2)
      );
  }

  getPlaylistById(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(this.appURL + "/playlist/" + id)
      .pipe(
        retry(2)
      );
  }

  recommendPlaylists(userPlaylists: Playlist[], allPlaylists: Playlist[]): Observable<Playlist[]> {
    const otherPlaylists = allPlaylists.filter(p => !userPlaylists.includes(p));

    const categoriesMine = new Set(userPlaylists.flatMap(p => p.categories));
    let sortPlaylist = (otherPlaylists.sort((p1, p2) => {
      const categoriesP1 = new Set(p1.categories);
      const categoriesP2 = new Set(p2.categories);
      const similarityP1 = this.getSimilarityScore(categoriesMine, categoriesP1);
      const similarityP2 = this.getSimilarityScore(categoriesMine, categoriesP2);
      return similarityP2 - similarityP1;
    }));

    const recommendedPlaylist = new BehaviorSubject<Playlist[]>(sortPlaylist);
    return recommendedPlaylist.asObservable();
  }

  getSimilarityScore(setA: Set<number>, setB: Set<number>): number {
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return intersection.size / union.size;
  }

  addFollower(idPlaylist: number, idUser: number): void {
    this.getPlaylistById(idPlaylist).subscribe(
      (playlist: Playlist) => {
        if (!playlist.followers.includes(idUser)) {
          playlist.followers.push(idUser);
          this.http.put<Playlist>(`${this.appURL}/playlist/`, playlist)
            .subscribe();
        }
      },
      (error: any) => {
        console.error(`Erro ao buscar playlist: ${error}`);
      }
    );
  }
}
