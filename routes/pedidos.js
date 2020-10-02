const express = require('express');
const router = express.Router();

// retorna todos os pedidos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Get na rota de pedidos'
    })
});

// insere um pedido
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Post na rota de pedidos'
    })
});

// retorna um pedidos
router.get('/:id_pedido', (req, res, next) => {
    const idPedido = req.params.id_pedido;

    res.status(200).send({
        id: idPedido,
        mensagem: 'Get com parâmetro "' + idPedido + '" na rota de pedidos'
    })
});

// deleta um pedido
router.delete('/:id_pedido', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Delete na rota de pedidos'
    })
});

module.exports = router;