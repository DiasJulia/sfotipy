import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CriacaoCategoriasComponent } from './pages/criacao-categorias/criacao-categorias.component';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NavbarComponent } from './navbar/navbar.component';
import { PlaylistCardComponent } from './playlist-card/playlist-card.component';
import { MusicCardComponent } from './music-card/music-card.component';
import { PageBuscaComponent } from './pages/page-busca/page-busca.component';
import { PlayerComponent } from './player/player.component';
import { PlaylistRecomendadasComponent } from './pages/playlist-recomendadas/playlist-recomendadas.component';
import { PlaylistCardRecomendComponent } from './playlist-card-recomend/playlist-card-recomend.component';
import { MusicsFilterPipe } from './musics-filter.pipe';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProfilepageComponent } from './navbar/profilepage/profilepage.component';
import { PlaylistsFilterPipe } from './playlists-filter.pipe';
import { PlaylistEmAltaComponent } from './playlist-em-alta/playlist-em-alta.component';
import { MusicasEmAltaComponent } from './musicas-em-alta/musicas-em-alta.component';
import { ArtistasEmAltaComponent } from './artistas-em-alta/artistas-em-alta.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { CompartilhamentoComponent } from './compartilhamento/compartilhamento.component';
import { FooterComponent } from './footer/footer.component';
import { UserPlaylistsComponent } from './user-playlists/user_playlists.component';
import { CriarPlaylistComponent } from './criar-playlist/criar_playlist.component';


@NgModule({
  declarations: [
    AppComponent,
    CriacaoCategoriasComponent,
    NavbarComponent,
    PlayerComponent,
    PlaylistCardComponent,
    MusicCardComponent,
    PageBuscaComponent,
    PlayerComponent,
    AppComponent,
    PlaylistRecomendadasComponent,
    PlaylistCardRecomendComponent,
    MusicsFilterPipe,
    HomepageComponent,
    ProfilepageComponent,
    PlaylistsFilterPipe,
    ProfilepageComponent,
    PlaylistEmAltaComponent,
    MusicasEmAltaComponent,
    ArtistasEmAltaComponent,
    PlaylistComponent,
    CompartilhamentoComponent,
    FooterComponent,
    UserPlaylistsComponent,
    CriarPlaylistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    RouterModule.forRoot([
      {
        path: '',
        component: HomepageComponent
      },
      {
        path: 'busca',
        component: PageBuscaComponent
      },
      {
        path: 'explorar',
        component: PlaylistRecomendadasComponent
      },
      {
        path: 'em-alta',
        component: PlaylistEmAltaComponent
      },
      {
        path: 'categorias/:id',
        component: CriacaoCategoriasComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
