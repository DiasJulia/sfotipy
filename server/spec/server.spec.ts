import 'jasmine';
import request = require("request-promise");
import { closeServer } from '../server';

const baseUrl = "http://localhost:3000";
const playlistURl = `${baseUrl}/playlist`
const musicUrl = `${baseUrl}/musics`

describe("O servidor", () => {
  var server: any;

  beforeAll(() => { server = require('../server'); process.stdout.write("server: "); });

  afterAll(() => { server.closeServer(); console.log("\n") });

  it("inicialmente retorna uma lista de músicas com músicas", () => {
    return request.get(musicUrl).then(body => expect(body).not.toBe("[]")).catch(e => expect(e).toEqual(null));
  })

  it("cadastra música com sucesso", () => {
    const body = { 'name': "Someone New", 'author': "Hozier", 'image': "https://upload.wikimedia.org/wikipedia/pt/6/61/Coldplay_Hymn_for_the_Weekend.jpg", 'link': "", 'duration': 500, 'category': 6 }
    const options: any = { method: 'POST', uri: (musicUrl), body, json: true };
    const newCar = { id: 25, ...body };
    return request(options).then(body => {
      expect(body).toEqual(newCar);
    });
  });

})
