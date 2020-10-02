//para iniciar o servidor use node server.js
//após a inclusão do nodemon use npm start
//CORS implementado para segurança no acesso ao site

const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);