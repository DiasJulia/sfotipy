import { Component, Input } from '@angular/core';
import { Music } from '../../../../common/music';
import { CategoryService } from '../category.service';
import { MusicPlayerService } from '../services/music-player.service';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.scss']
})
export class MusicCardComponent {
  @Input() name!: string;
  @Input() author!: string;

  @Input() id!: number;
  @Input() music!: Music;

  category: string;

  constructor(private categoryService: CategoryService, public musicPlayerService: MusicPlayerService) {
    this.category = "";
  }

  ngOnInit() {
    this.category = this.categoryService.getCategorybyId(this.music.category)?.name || "";
  }

  playMusic() {
    if (!this.musicPlayerService.isPlaying && this.musicPlayerService.currentMusic.id == this.music.id) {
      this.musicPlayerService.play();
    } else {
      this.musicPlayerService.playMusic(this.music);
    }
  }

  pauseMusic() {
    this.musicPlayerService.pause();
  }

  isPausable(): boolean {
    return this.musicPlayerService.isPlaying && this.musicPlayerService.currentMusic.id == this.music.id;
  }
}
