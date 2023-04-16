import { Component } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { MusicPlayerService } from '../services/music-player.service';
import { Playlist } from '../../../../common/playlist';
import { async } from 'rxjs';
import { rejects } from 'assert';
import { resolve } from 'dns';

@Component({
  selector: 'app-playlist-em-alta',
  templateUrl: './playlist-em-alta.component.html',
  styleUrls: ['./playlist-em-alta.component.scss']
})
export class PlaylistEmAltaComponent {

  mostAccessedPlaylists: Playlist[] = [];

  constructor(private playlistService: PlaylistService) { }
    ngOnInit() {
      // debugger
    this.playlistService.getPlaylists().subscribe(async as => {
    //  this.mostAccessedPlaylists = as
      console.log('this.playlistService.getPlaylists()::: ', as)
      console.log('this.mostAccessedPlaylists::: ', this.mostAccessedPlaylists)
      await getMostAccessedPlaylist(4, as)
      // this.mostAccessedPlaylists.sort((a, b) => b.accessPlaylits - a.accessPlaylits).slice(0, 4)
      debugger
    });
    const getMostAccessedPlaylist = (numPlaylist: any, list:any) =>{
      return new Promise((resolve, reject) => {
        if(!Array.isArray(this.mostAccessedPlaylists)){
          reject(new Error('mostAccessedPlaylist is not an array'))
        }
        else{
          const sortedPlaylist = this.mostAccessedPlaylists.sort((a: { accessPlaylits: number; },b: { accessPlaylits: number; }) => b.accessPlaylits - a.accessPlaylits);
          this.mostAccessedPlaylists = sortedPlaylist.slice(0,numPlaylist)
          resolve(this.mostAccessedPlaylists);
        }
      })
    }
  }
  getFirstPlaylistTitle(): string {
    return this.mostAccessedPlaylists[0].image;
  }
  getSecondPlaylistTitle(): string {
    return this.mostAccessedPlaylists[1].image;
  }
  getThirdPlaylistTitle(): string {
    return this.mostAccessedPlaylists[2].image;
  }
  getFourthPlaylistTitle(): string {
    return this.mostAccessedPlaylists[3].image;
  }
  getFirstPlaylistLink(): string {
    return this.mostAccessedPlaylists[0].link;
  }
  getSecondPlaylistLink(): string {
    return this.mostAccessedPlaylists[1].link;
  }
  getThirdPlaylistLink(): string {
    return this.mostAccessedPlaylists[2].link;
  }
  getFourthPlaylistLink(): string {
    return this.mostAccessedPlaylists[3].link;
  }

  // mostAccessedPlaylists: Playlist[] = [
  //   new Playlist(<Playlist><unknown>{
  //     "id": 0,
  //     "name": "Mix de Coldplay",
  //     "categories": [1],
  //     "musics": [0, 1, 2, 3, 4, 5, 6, 7, 8],
  //     "image": "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2f679c136425765.61f96b4f03c85.jpg",
  //     "link": "",
  //     "owner": "João",
  //     "followers": ['a', 'b'],
  //     "availability": "public",
  //     "accessPlaylits": 4,
  //     "ownerId": 1
  //   }),
  //   new Playlist(<Playlist><unknown>{
  //     'id': 1,
  //     'name': 'Melhores Pop',
  //     'categories': [1],
  //     'musics': [1],
  //     'image':
  //       'https://cdn.ibispaint.com/movie/190/771/190771621/image190771621l.png',
  //     'link': '',
  //     'owner': 'sfotipy',
  //     'followers': ['a'],
  //     'availability': 'public',
  //     'accessPlaylits': 2,
  //     'ownerId': 2
  //   }),
  //   new Playlist(<Playlist><unknown>{
  //     'id': 2,
  //     'name': 'Melhores Indie',
  //     'categories': [3],
  //     'musics': [1, 2],
  //     'image':
  //       'https://i.pinimg.com/originals/5c/0b/34/5c0b34be1d361293b0bd2eb124967cd9.png',
  //     'link': '',
  //     'owner': 'sfotipy',
  //     'followers': ['b'],
  //     'ownerId': 2,
  //     'accessPlaylits': 3,
  //     'availability': 'public'
  //   }),
  //   new Playlist(<Playlist><unknown>{
  //     'id': 3,
  //     'name': 'Para Você',
  //     'categories': [2],
  //     'musics': [0, 1, 2],
  //     'image':
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVzSe2QANTVbnbNBQX3qMXejQHPLRBtAMDgA&usqp=CAU',
  //     'link': '',
  //     'owner': 'sfotipy',
  //     'followers': ['c'],
  //     'availability': 'private',
  //     "accessPlaylits": 24,
  //     "ownerId": 2
  //   }),
  //   new Playlist(<Playlist><unknown>{
  //     'id': 4,
  //     'name': 'Para Dormir',
  //     'categories': [4],
  //     'musics': [1, 2],
  //     'image':
  //       'https://thumbs.dreamstime.com/b/listen-to-sleep-music-color-line-icon-autonomous-sensory-meridian-response-sound-waves-as-symbol-enjoying-sounds-editable-211152511.jpg',
  //     'link': '',
  //     'owner': 'sfotipy',
  //     'followers': ['a', 'b', 'c'],
  //     'availability': 'public',
  //     "accessPlaylits": 5,
  //     "ownerId": 2
  //   }),
  //   new Playlist(<Playlist><unknown>{
  //     'id': 5,
  //     'name': 'Melhores Rock',
  //     'categories': [2, 4],
  //     'musics': [1],
  //     'image':
  //       'https://assets.dragoart.com/images/140589_502/how-to-draw-strange-music-logo-strange-music-step-5_5e4cb46a6013c9.70891777_74088_5_3.gif',
  //     'link': '',
  //     'owner': 'sfotipy',
  //     'followers': ['b', 'c'],
  //     'availability': 'public',
  //     "accessPlaylits": 6,
  //     "ownerId": 2
  //   }),
  //   new Playlist(<Playlist><unknown>{
  //     "id": 6,
  //     "name": "Rocking with Imagine Dragons",
  //     "categories": [3, 5],
  //     "musics": [10, 11, 12, 13, 14],
  //     "image": "https://i.pinimg.com/736x/98/e6/d8/98e6d8ab4d4414eef0e90bb1382bfb86.jpg",
  //     "link": "",
  //     "owner": "Maria",
  //     "followers": ['a', 'b', 'c', 'd'],
  //     "availability": "public",
  //     "accessPlaylits": 7,
  //     "ownerId": 3
  //   }),
  //   new Playlist(<Playlist><unknown>{
  //     "id": 7,
  //     "name": "Eminem's Greatest Hits",
  //     "categories": [1, 4],
  //     "musics": [15, 16, 17],
  //     "image": "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/eminem-miracle-studio.jpg",
  //     "link": "",
  //     "owner": "Julia",
  //     "followers": ['a', 'd'],
  //     "availability": "public",
  //     "accessPlaylits": 8,
  //     "ownerId": 4
  //   }),
  //   new Playlist(<Playlist><unknown>{
  //     "id": 8,
  //     "name": "League of Legends Mix",
  //     "categories": [1, 6],
  //     "musics": [18, 19, 20],
  //     "image": "https://cdns-images.dzcdn.net/images/artist/21e53b8e8285f84f60601d895c39c900/500x500.jpg",
  //     "link": "",
  //     "owner": "Mario",
  //     "followers": ['a', 'b'],
  //     "availability": "public",
  //     "accessPlaylits": 9,
  //     "ownerId": 5
  //   }),
  //   new Playlist(<Playlist><unknown>{
  //     "id": 9,
  //     "name": "The NBHD",
  //     "categories": [2, 1],
  //     "musics": [21, 22, 23, 24],
  //     "image": "https://i.pinimg.com/564x/78/35/fb/7835fb0bef03a3332c89c681f020da87--music-bands-.jpg",
  //     "link": "",
  //     "owner": "Luigi",
  //     "followers": ['a', 'b', 'd'],
  //     "availability": "public",
  //     "accessPlaylits": 10,
  //     "ownerId": 6
  //   })
  // ];
  // ngOnInit(){
  //   this.mostAccessedPlaylists = this.mostAccessedPlaylists.sort((a, b) => b.accessPlaylits - a.accessPlaylits).slice(0, 4);
  // }

  // getFirstPlaylistTitle(): string {
  //   return this.mostAccessedPlaylists[0].image;
  // }
  // getSecondPlaylistTitle(): string {
  //   return this.mostAccessedPlaylists[1].image;
  // }
  // getThirdPlaylistTitle(): string {
  //   return this.mostAccessedPlaylists[2].image;
  // }
  // getFourthPlaylistTitle(): string {
  //   return this.mostAccessedPlaylists[3].image;
  // }
  // getFirstPlaylistLink(): string {
  //   return this.mostAccessedPlaylists[0].link;
  // }
  // getSecondPlaylistLink(): string {
  //   return this.mostAccessedPlaylists[1].link;
  // }
  // getThirdPlaylistLink(): string {
  //   return this.mostAccessedPlaylists[2].link;
  // }
  // getFourthPlaylistLink(): string {
  //   return this.mostAccessedPlaylists[3].link;
  // }


}