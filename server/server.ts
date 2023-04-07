import express = require('express');
import bodyParser = require("body-parser");
import fs = require('fs');
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
  //const userJson = JSON.stringify(files);
  const filePath = './usuarios/user.json';

  // Verifica se o arquivo já existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    let users = [];

    // Se o arquivo já existe, lê o conteúdo e adiciona ao array
    if (!err) {
      const fileContent = fs.readFileSync(filePath);
      users = JSON.parse(fileContent.toString());
    }

    // Adiciona o novo usuário ao array
    users.push(files);

    // Grava o array de usuários no arquivo
    fs.writeFile(filePath, JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save user data.' });
      } else {
        res.json({ message: 'User data saved.' });
      }
    });
  });
});

app.get('/usuarios', (req, res) => {
  const filePath = './usuarios/user.json';

  // Verifica se o arquivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to load user data.' });
    } else {
      // Lê o conteúdo do arquivo
      const fileContent = fs.readFileSync(filePath);
      const users = JSON.parse(fileContent.toString());

      // Verifica se foi passado um email na consulta
      const email = req.query.email;
      if (email) {
        // Filtra o array de usuários pelo email
        const filteredUsers = users.filter((user: { email: string; }) => user.email === email as string);
        res.json(filteredUsers);
      } else {
        // Retorna todos os usuários
        res.json(users);
      }
    }
  });
});

app.use((err: { message: any; }, req: any, res: { json: (arg0: { error: any; }) => void; }, next: any) => res.json({ error: err.message }))


var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
  server.close();
}

export { app, server, closeServer }
