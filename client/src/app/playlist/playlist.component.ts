import { Component, HostListener } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Category } from '../../../../common/category';
import { MusicasService } from '../musicas.service';
import { PlaylistService } from '../playlist.service';

import { Music } from './../../../../common/music';
import { Playlist } from './../../../../common/playlist';
import { BehaviorSubject, take } from 'rxjs';
import { Location } from '@angular/common';

import { CategoryService } from '../category.service';


@Component({
  selector: 'app-root',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})

export class PlaylistComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private musicService: MusicasService,
    private categoryService: CategoryService,
    private location: Location) { }

  musicasFiltradas: string[] = [];
  musicas = this.musicService.getMusics()
  musicas_add: BehaviorSubject<Music[]> = new BehaviorSubject<Music[]>([]);
  exibirPopup: boolean = false;
  showLink: boolean = false;
  playlistId: number = 0;

  /*@HostListener('document:click', ['$event'])
  fecharPopup(event: MouseEvent) {
    const addMusicaElement = (event.target as Element)?.closest('.addmusic');
    if (!addMusicaElement) {
      this.exibirPopup = false;
    }
  }*/

  // show_followers(id: number) {
  //   const playlist = this.playlists.find(
  //       p => p.id === id);  // Procura a playlist correspondente ao id na
  //       lista
  //                           // de playlists
  //   if (playlist) window.alert(playlist.followers)
  // }

  playlistCategories: Category[] = [];
  categories: Category[] = [];

  redirectaddmusic() {
    console.log('musica')
  }

  selectedPlaylist: Playlist = new Playlist(<Playlist>{});

  playlistSongs: Music[] = [];
  showShareLink() {
    this.showLink = !this.showLink;
  }

  showPopup() {
    this.exibirPopup = true
  }

  adicionarMusica(musica: string) {
    this.musicas.pipe(take(1)).subscribe((musicasArray: Music[]) => {
      const musicaEncontrada = musicasArray.find(m => m.name === musica);

      if (musicaEncontrada) {
        this.musicas_add.next([...this.musicas_add.value, musicaEncontrada]);
      }
    })

  }

  updateMusicas() {
    const musics_id: number[] = this.selectedPlaylist.musics
    for (const music of this.musicas_add.getValue()) {
      if (musics_id.findIndex(musica => musica === music.id) === -1) {
        musics_id.push(music.id);
      }
    }

    const playlist: Playlist = this.selectedPlaylist
    playlist.musics = musics_id

    const update = this.playlistService.updatePlaylistMusics(playlist).subscribe()
    if (update) {
      alert('Músicas atualizadas com sucesso!')
      window.location.reload();
    }
  }

  filtrarMusicas(event: KeyboardEvent) {
    // filtra as músicas com base no texto de pesquisa e atualiza a lista de músicas filtradas
    const textoPesquisa = (event.target as HTMLInputElement).value.toLocaleLowerCase()
    console.log(textoPesquisa)
    this.musicas.subscribe(musicas => {
      this.musicasFiltradas = musicas.filter(musica =>
        musica.name.toLowerCase().startsWith(textoPesquisa)
      ).map(musica => musica.name);
    });
    ;

  }

  ngOnInit(): void {
    const playId = this.route.snapshot.params["id"];
    this.playlistId = playId;
    this.musicas.subscribe(musicas => {
      this.musicasFiltradas = musicas.map(musica => musica.name);

    });

    this.route.paramMap.subscribe(params => {
      if (params && params.get('id')) {
        const id = params?.get('id');
        if (id) {
          this.playlistId = Number(id)
          this.playlistService.getPlaylistById(parseInt(id))
            .subscribe(
              as => {
                this.selectedPlaylist = as;
                for (var i of this.selectedPlaylist.musics) {
                  this.musicService.getMusicsById(i)
                    .subscribe(
                      as => {
                        this.playlistSongs.push(as);
                        this.categoryService.getAllCategories().subscribe(
                          as => {
                            this.categories = as;
                            this.playlistCategories = this.categories.filter(c => this.selectedPlaylist.categories.includes(c.id));
                          },
                          msg => { alert(msg.message); }
                        );
                      },
                      msg => { alert(msg.message); }
                    );
                }
              },
              msg => { alert(msg.message); }
            );
        }
      }
    });
  }

  getCategories(): Category[] {
    return this.categories.filter(c => !this.playlistCategories.includes(c));
  }

  removeCategory(category: Category) {
    this.playlistService.deleteCategory(this.playlistId, category)
      .subscribe(
        ar => {
          if (ar) {
            var idx = this.playlistCategories.findIndex(ar => ar.name == category.name);
            console.log(idx);
            if (idx != -1) {
              this.playlistCategories.splice(idx, 1);
            }
          }
        }
      )
  }

  selectCategory(category: Category) {
    this.playlistService.addNewCategory(this.playlistId, category)
      .subscribe(
        ar => {
          if (ar) {
            this.playlistCategories.push(category);
            var idx = this.playlistCategories.findIndex(ar => ar.name == category.name);
            if (idx == -1) {
              this.playlistCategories.push(category);
            }
          }
        }
      )
  }

}
