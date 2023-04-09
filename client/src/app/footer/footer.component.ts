import { Component } from '@angular/core';
import { MusicPlayerService } from '../services/music-player.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(public musicPlayerService: MusicPlayerService) { }

  seek(event: MouseEvent) {
    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percent = x / progressBar.offsetWidth;
    const duration = this.musicPlayerService.audio.duration;
    this.musicPlayerService.audio.currentTime = duration * percent;
  }

}
