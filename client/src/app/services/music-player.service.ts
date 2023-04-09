import { Injectable } from '@angular/core';
import { Music } from '../../../../common/music';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {

  playlist: Music[] = [
    new Music(<Music>{ 'id': 0, 'name': "Hymn for the Weekend", 'author': "Coldplay", 'image': "https://upload.wikimedia.org/wikipedia/pt/6/61/Coldplay_Hymn_for_the_Weekend.jpg", 'link': "", 'duration': 500, 'category': 3 }),
    new Music(<Music>{ 'id': 1, 'name': "Viva la Vida", 'author': "Coldplay", 'image': "https://upload.wikimedia.org/wikipedia/pt/d/d7/Vivalavida.jpg", 'link': "", 'duration': 500, 'category': 2 }),
    new Music(<Music>{ 'id': 2, 'name': "Yellow", 'author': "Coldplay", 'image': "https://i.pinimg.com/originals/f7/30/23/f7302371fb79c2d0cd817e9c28baaf62.jpg", 'link': "", 'duration': 500, 'category': 3 }),
    new Music(<Music>{ 'id': 3, 'name': "Paradise", 'author': "Coldplay", 'image': "https://cdns-images.dzcdn.net/images/cover/e0dd8263dfed37c50a868abbf65fd7da/500x500.jpg", 'link': "", 'duration': 500, 'category': 1 })
  ];

  currentIndex: number = 0;

  currentMusic: Music = this.playlist[this.currentIndex];

  audio: HTMLAudioElement = new Audio('assets/musics/' + this.currentMusic.id + '/audio.mp3');

  isPlaying: boolean = false;

  musicTime = {
    'minutes': Math.floor(this.currentMusic.duration / 60).toString().padStart(2, '0'),
    'seconds': Math.floor(this.currentMusic.duration % 60).toString().padStart(2, '0')
  };

  currentTime = { 'minutes': '00', 'seconds': '00' }

  updateInterval: any;

  constructor() {
    this.updateInterval = setInterval(() => {
      this.updateMusicInfo();
    }, 1000);

    this.audio.addEventListener('ended', () => {
      this.next();
    });
  }

  next() {
    if (this.currentIndex < this.playlist.length - 1) {
      this.playMusic(this.playlist[this.currentIndex + 1]);
    } else {
      this.playMusic(this.playlist[0]);
    }
  }

  back() {
    if (this.currentIndex > 0) {
      this.playMusic(this.playlist[this.currentIndex - 1]);
    }
  }

  updateMusicInfo() {
    this.currentTime = {
      'minutes': Math.floor(this.audio.currentTime / 60).toString().padStart(2, '0'),
      'seconds': Math.floor(this.audio.currentTime % 60).toString().padStart(2, '0')
    }
    this.musicTime = {
      'minutes': Math.floor(this.audio.duration / 60).toString().padStart(2, '0'),
      'seconds': Math.floor(this.audio.duration % 60).toString().padStart(2, '0')
    };
    this.getCurrentProgress();
  }

  playMusic(music: Music) {
    this.currentIndex = this.playlist.indexOf(music);
    this.currentMusic = music;
    this.audio.pause();
    this.audio.src = 'assets/musics/' + this.currentMusic.id + '/audio.mp3';
    this.musicTime = {
      'minutes': Math.floor(this.audio.duration / 60).toString().padStart(2, '0'),
      'seconds': Math.floor(this.audio.duration % 60).toString().padStart(2, '0')
    };
    this.currentTime = { 'minutes': '00', 'seconds': '00' }
    this.play();
  }

  play() {
    this.audio.play();
    this.isPlaying = true;
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
  }

  getCurrentTime(): string {
    return this.currentTime.minutes + ":" + this.currentTime.seconds;
  }

  getCurrentMusicTime(): string {
    return this.musicTime.minutes + ":" + this.musicTime.seconds;
  }

  getCurrentProgress(): number {
    return this.audio.currentTime / this.audio.duration * 100;
  }

  getCurrentMusic(): Music {
    return this.currentMusic;
  }

  getCurrentState(): boolean {
    return this.isPlaying;
  }

  getCurrentMusicName(): string {
    return this.currentMusic.name;
  }
}
