import { Pipe, PipeTransform } from '@angular/core';
import { Playlist } from '../../../common/playlist';

@Pipe({
  name: 'playlistsFilter'
})
export class PlaylistsFilterPipe implements PipeTransform {

  transform(playlists: Playlist[], filterText: string, filterCategory: number[]): Playlist[] {
    if (!playlists) {
      return [];
    }
    if (!filterText && !filterCategory.length) {
      return playlists;
    }

    return playlists.filter(playlist => {
      return this.playlistContainsFilterText(playlist, filterText, filterCategory);
    });
  }

  private playlistContainsFilterText(playlist: Playlist, filterText: string, filterCategory: number[]): boolean {
    filterText = filterText.toLocaleLowerCase();
    const filterTerms = filterText.split(' ');
    for (const filterTerm of filterTerms) {
      const hasFilterTerm = this.playlistContainsFilterTerm(playlist, filterTerm, filterCategory);
      if (hasFilterTerm === false) {
        return false;
      }
    }

    return true;
  }

  private playlistContainsFilterTerm(playlist: Playlist, filterTerm: string, filterCategory: number[]) {
    return (!filterTerm || playlist.name.toLocaleLowerCase().includes(filterTerm)) && (!filterCategory.length || filterCategory.some(e => playlist.categories.includes(e)))
  }

}
