import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../playlist.service';
import { Playlist } from '../../../../common/playlist';
import { UserService } from '../user.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './user_playlists.component.html',
  styleUrls: ['./user_playlists.component.css']
})

export class UserPlaylistsComponent implements OnInit {
  userId: number = 0;

  constructor(
    private router: Router, private playlistService: PlaylistService,
    private userService: UserService,
    private titleService: Title) { }

  numPlaylists: number = 0;  // Número de playlists cadastradas
  playlistsUser: Playlist[] = [];
  likedPlaylists: Playlist[] = [];
  playlists: Playlist[] = [];

  redirectplaylist(id: number) {
    this.router.navigate(['/playlist/', id]);
  }

  redirecionarParaCriarPlaylist() {
    this.router.navigate(['/criar_playlist']);
  }

  ngOnInit(): void {
    this.playlistService.getUserPlaylists(this.userId).subscribe(playlists => {
      this.playlists = playlists;
      this.numPlaylists = this.playlists.length;
      this.titleService.setTitle("Minhas Playlists");
      this.playlistService.getPlaylists().subscribe(
        as => {
          this.playlists = as;

          this.userService.getUserId().subscribe(
            as => { this.userId = as; },
            msg => { alert(msg.message); }
          );
          this.playlistsUser = this.playlists.filter(playlist => playlist.ownerId == this.userId);
          this.likedPlaylists = this.playlists.filter(playlists => playlists.followers.includes(this.userId));
          this.numPlaylists = this.playlistsUser.length
        },
        msg => { alert(msg.message); }
      );
    });
  }
}
