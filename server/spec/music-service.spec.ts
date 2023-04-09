import 'jasmine';
import { Music } from '../../common/music';
import { MusicService } from '../src/music-service';

describe("O servico de músicas", () => {
    var musicService: MusicService;

    beforeAll(() => {
        process.stdout.write("music-service: ");
    });

    beforeEach(() => musicService = new MusicService());

    afterAll(() => {
        console.log("\n");
    });

    it("Inicialmente conta com 25 músicas", () => {
        expect(musicService.musics.length).toBe(25);
    })

    it("cadastra músicas corretamente", () => {
        const sample = <Music>{ 'name': "Someone New", 'author': "Hozier", 'image': "https://upload.wikimedia.org/wikipedia/pt/6/61/Coldplay_Hymn_for_the_Weekend.jpg", 'link': "", 'duration': 500, 'category': 6 }
        musicService.add(sample);

        expect(musicService.musics.length).toBe(26);
        const result = musicService.musics[25];
        expect(result.id).toBe(25);
        expect(result.name).toBe(sample.name);
        expect(result.author).toBe(sample.author);
        expect(result.image).toBe(sample.image);
        expect(result.link).toBe(sample.link);
        expect(result.duration).toBe(sample.duration);
        expect(result.category).toBe(sample.category);
    })

    it("atualiza música cadastrada", () => {
        const sample = <Music>{ 'name': "Someone New", 'author': "Hozier", 'image': "https://upload.wikimedia.org/wikipedia/pt/6/61/Coldplay_Hymn_for_the_Weekend.jpg", 'link': "", 'duration': 500, 'category': 6 }
        musicService.add(sample);

        expect(musicService.musics.length).toBe(26);

        sample.id = 25;
        sample.name = "Take me to Church";
        sample.duration = 600;

        musicService.update(sample);
        const result = musicService.musics[25];
        expect(result.id).toBe(25);
        expect(result.name).toBe("Take me to Church");
        expect(result.author).toBe(sample.author);
        expect(result.image).toBe(sample.image);
        expect(result.link).toBe(sample.link);
        expect(result.duration).toBe(sample.duration);
        expect(result.category).toBe(sample.category);
    });
})
