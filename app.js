const express = require('express');
const app = express();
const morgan = require('morgan');

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

app.use(morgan('dev'));//executa um callback que monitora a execução e apresenta o log
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