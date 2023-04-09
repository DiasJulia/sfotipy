import { Music } from "./music";
import { Category } from "./category";

export class Playlist {
    id: number;
    ownerId: number;
    name: string;
    categories: number[];
    musics: number[];
    image: string;
    link: string;
    owner: string;
    followers: number[];
    availability: string;
    accessPlaylits: number;

    constructor(playlist: Playlist) {
        this.id = playlist.id;
        this.ownerId = playlist.ownerId;
        this.name = playlist.name;
        this.categories = playlist.categories;
        this.musics = playlist.musics;
        this.image = playlist.image;
        this.link = playlist.link;
        this.owner = playlist.owner;
        this.followers = playlist.followers;
        this.availability = playlist.availability;
        this.accessPlaylits = playlist.accessPlaylits;
    }

    update(playlist: Playlist): void {
        if (playlist.name) {
            this.name = playlist.name;
        }
        if (playlist.categories) {
            this.categories = playlist.categories;
        }
        if (playlist.musics) {
            this.musics = playlist.musics;
        }
        if (playlist.image) {
            this.image = playlist.image;
        }
        if (playlist.link) {
            this.link = playlist.link;
        }
        if (playlist.owner) {
            this.owner = playlist.owner;
        }
        if (playlist.ownerId) {
            this.ownerId = playlist.ownerId;
        }
        if (playlist.followers) {
            this.followers = playlist.followers;
        }
        if (playlist.availability) {
            this.availability = playlist.availability;
        }
        if (playlist.accessPlaylits) {
            this.accessPlaylits = playlist.accessPlaylits;
        }
    }
}