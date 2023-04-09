import { Component } from '@angular/core';
import { PlaylistService } from '../../../../server/src/playlist-service';
import { Playlist } from '../../../../common/playlist';

@Component({
  selector: 'app-playlist-em-alta',
  templateUrl: './playlist-em-alta.component.html',
  styleUrls: ['./playlist-em-alta.component.scss']
})
export class PlaylistEmAltaComponent {
  mostAccessedPlaylists: Playlist[] = [];

  constructor(private playlistService: PlaylistService) { }
  ngOnInit() {
    this.mostAccessedPlaylists = this.playlistService.getMostAccessedPlaylist();
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

}