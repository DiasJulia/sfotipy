import express = require('express');
import bodyParser = require("body-parser");
//import { PlaylistService } from './src/playlist-service';

//import { MusicService } from './src/music-service';
import { Music } from '../common/music';
import { Playlist } from '../common/playlist';

const app = express();
const cors = require('cors');
const multipart = require('connect-multiparty')

//var musicService: MusicService = new MusicService();
//var playlistService = new PlaylistService();

var allowCrossDomain = function (req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(allowCrossDomain);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const multipartMiddleware = multipart({ uploadDir: './usuarios' });

app.post('/usuarios', multipartMiddleware, (req, res) => {
  const files = req.body;
  console.log(files)
  res.json({ message: files })
})


app.use((err: { message: any; }, req: any, res: { json: (arg0: { error: any; }) => void; }, next: any) => res.json({ error: err.message }))


var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
  server.close();
}

export { app, server, closeServer }
