export class User {
    id?: number;
    name?: string;
    picture?: string;
    email?: string;
    password?: string;
    followers?: number;
    artist?: boolean;
    //playlists?: Playlist[];
    playlists?: [];

    constructor(user: Partial<User> = {}) {
        this.id = user.id;
        this.name = user.name || '';
        this.picture = user.picture || '';
        this.email = user.email || '';
        this.password = user.password || '';
        this.followers = user.followers || 0;
        this.artist = user.artist || false;
        this.playlists = user.playlists || [];
    }
}