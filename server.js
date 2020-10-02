//para iniciar o servidor use node server.js
//após a inclusão do nodemon use npm start
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);