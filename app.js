const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

app.use(morgan('dev'));//executa um callback que monitora a execução e apresenta o log
app.use(bodyParser.urlencoded({ extended: false })); //aceita apenas dados simples
app.use(bodyParser.json()); //api só aceitará o formato json

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*'); //no lugar * pode ser definido um servidor especifico
    res.header(
        'Acces-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

//quando não encontra a rota
app.use((req, res, next) => {
    const erro = new Error('Página não encontrada');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
});

/*app.use('/teste', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Hello, Node eu aqui de novo'
    })
});*/

module.exports = app;