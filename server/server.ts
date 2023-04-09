import express = require('express');
import bodyParser = require("body-parser");
import { PlaylistService } from './src/playlist-service';

import { MusicService } from './src/music-service';
import { CategoryService } from './src/category-service';
import fs = require('fs');
import { Music } from '../common/music';
import { Playlist } from '../common/playlist';
import { Category } from '../common/category';

const app = express();
const cors = require('cors');
const multipart = require('connect-multiparty')

var musicService: MusicService = new MusicService();
var playlistService = new PlaylistService();
var categoryService = new CategoryService();

var allowCrossDomain = function (req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(allowCrossDomain);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//ROTAS DE MUSICAS


app.post('/criar_playlist', (req: express.Request, res: express.Response) => {
  const newPlaylist = <Playlist>req.body;

  try {
    const result = playlistService.addPlaylist(newPlaylist);
    if (result) {
      return res.status(201).send(result);
    }
    return res.status(400).send({ message: 'Não foi possível criar a playlist.' });
  } catch (error) {
    return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
});

app.get('/musics', function (req, res) {
  const musics = musicService.get();
  res.send(JSON.stringify(musics));
});

app.get('/musics/:id', function (req, res) {
  const id: number = Number(req.params.id);
  const music = musicService.getById(id);
  if (music) {
    res.send(music);
  } else {
    res.status(404).send({ message: `Music ${id} could not be found` });
  }
});

app.delete('/musics/:id', function (req, res) {
  const id: number = Number(req.params.id);
  const music = musicService.delete(id);
  if (music) {
    res.status(200).send({ message: `Music ${id} deleted` });
  } else {
    res.status(404).send({ message: `Music ${id} could not be deleted` });
  }
});

app.post('/musics', function (req: express.Request, res: express.Response) {
  const music: Music = <Music>req.body;
  try {
    const result = musicService.add(music);
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(403).send({ message: "Music list is full" });
    }
  } catch (err) {
    const { message } = err;
    res.status(400).send({ message })
  }
});

app.put('/musics', function (req: express.Request, res: express.Response) {
  const music: Music = <Music>req.body;
  const result = musicService.update(music);
  if (result) {
    res.send(result);
  } else {
    res.status(404).send({ message: `Music ${music.id} could not be found.` });
  }
});

//ROTAS DE PLAYLIST

app.get('/playlists', function (req, res) {
  const playlists = playlistService.get();
  res.send(JSON.stringify(playlists));
});

app.get('/playlist/:id', function (req, res) {
  const id: number = Number(req.params.id);
  const playlist = playlistService.getById(id);
  if (playlist) {
    res.send(playlist);
  } else {
    res.status(404).send({ message: `Playlist ${id} could not be found` });
  }
});

app.delete('/playlist/:id', function (req, res) {
  const id: number = Number(req.params.id);
  const playlist = playlistService.delete(id);
  if (playlist) {
    res.status(200).send({ message: `Playlist ${id} deleted` });
  } else {
    res.status(404).send({ message: `Playlist ${id} could not be deleted` });
  }
});

app.post('/playlist', function (req: express.Request, res: express.Response) {
  const playlist: Playlist = <Playlist>req.body;
  try {
    const result = playlistService.addPlaylist(playlist);
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(403).send({ message: "Playlist list is full" });
    }
  } catch (err) {
    const { message } = err;
    res.status(400).send({ message })
  }
});

app.put('/playlist', function (req: express.Request, res: express.Response) {
  const playlist: Playlist = <Playlist>req.body;
  console.log(playlist)
  const result = playlistService.updatePlaylist(playlist);
  if (result) {
    res.send(result);
  } else {
    res.status(404).send({ message: `Playlist ${playlist.id} could not be found.` });
  }
});

app.post('/criar_playlist', (req: express.Request, res: express.Response) => {
  const newPlaylist = <Playlist>req.body;

  try {
    const result = playlistService.addPlaylist(newPlaylist);
    if (result) {
      return res.status(201).send(result);
    }
    return res.status(400).send({ message: 'Não foi possível criar a playlist.' });
  } catch (error) {
    return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
});

app.get('/minhas_playlists/:id', (req, res) => {
  const ownerId = parseInt(req.params.id);
  //console.log(ownerId) // busca o ownerId a partir dos parâmetros da requisição;
  
  //const ownerId = 1
  const userPlaylists = playlistService.getUserPlaylists(ownerId); // busca as playlists do usuário a partir do PlaylistService
  res.json(userPlaylists); // retorna as playlists como uma resposta JSON
});

app.get('/criar_playlist/:name', (req, res) => {
  const name = req.params.name;
  const result = playlistService.verificarNomePlaylistExistente(name);
  res.json(result);
});

// ROTAS DE CATEGORIAS

app.get('/category/:id', function (req: express.Request, res: express.Response) {
  const playlistId: number = Number(req.params.id);
  const categories: Category[] = playlistService.getPlaylistCategory(playlistId);

  if (categories) {
    res.send(categories);
  } else {
    res.status(404).send({ message: 'Playlist could not be found' });
  }
});

app.get('/category', function (req: express.Request, res: express.Response) {
  const allCategories = categoryService.get();
  if (allCategories) {
    res.send(allCategories);
  } else {
    res.status(404).send({ message: "Error getting categories" });
  }
});

app.post('/category/:id', function (req: express.Request, res: express.Response) {
  const id: number = Number(req.params.id);
  const newCategory: Category = req.body.category;
  const result = playlistService.addNewCategory(id, newCategory.id);
  if (result) {
    res.send({ "success": "The new category was registered" });
  } else {
    res.send({ "failure": "The category was not registered" });
  }
});


app.delete('/category/:id', function (req: express.Request, res: express.Response) {
  const id: number = Number(req.params.id);
  const category: number = req.body.category.id;
  const result = playlistService.deleteCategory(id, category);
  if (result) {
    res.send({ "success": "The category was deleted" });
  } else {
    res.send({ "failure": "The category was not deleted" });
  }
});

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
