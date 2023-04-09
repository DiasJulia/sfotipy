import express = require('express');
import bodyParser = require("body-parser");
import fs = require('fs');
import { User } from '../common/user';
const cors = require('cors');
const multipart = require('connect-multiparty')

const app = express();

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

app.post('/users', multipartMiddleware, (req, res) => { //Cadastro
  const files = req.body;
  //  console.log(files)  <== Para demonstrar os arquivos cadastrados
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
        delete files.password;
        res.json(files);
      }
    });
  });
});

app.post('/login', (req, res) => { // Login
  const email = req.body.email;
  const password = req.body.password;

  // Ler o arquivo com os usuários do banco de dados
  const usersData = fs.readFileSync('usuarios/user.json', 'utf8');
  const users = JSON.parse(usersData);
  // Verificar se o usuário (email e senha) existe no banco de dados
  const user = users.find((u: User) => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true, id: user.id }); // Retorna uma mensagem de sucesso e o id do usuário logado
  } else {
    res.json({ success: false }); //Retorna uma mensagem de false porque não achou o usuário no banco de dados
  }
});

app.get('/users', (req, res) => { // Usuarios aparecendo no localhost:3000/users
  const filePath = './usuarios/user.json';

  // Verifica se o arquivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Falha ao carregar dados do usuário.' });
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

app.get('/users/:id', (req, res) => { // localhost:3000/users/1 retorna todos os dados do usuário 1 e assim sucessivamente
  const userId = parseInt(req.params.id); // converte o parâmetro da rota para um número inteiro
  const filePath = './usuarios/user.json';

  // Lê o arquivo JSON de usuários
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read user data.' });
      return;
    }

    const users = JSON.parse(data.toString());

    // Procura o usuário com o ID correspondente
    const user = users.find((u: { id: number }) => u.id === userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found.' });
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
