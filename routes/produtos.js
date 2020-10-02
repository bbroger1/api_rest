const express = require('express');
const router = express.Router();

// retorna todos os produtos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Get na rota de produtos'
    })
});

// insere um produto
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Post na rota de produtos'
    })
});

// retorna um produtos
router.get('/:id_produto', (req, res, next) => {
    const idProduto = req.params.id_produto;

    res.status(200).send({
        id: idProduto,
        mensagem: 'Get com parâmetro "' + idProduto + '" na rota de produtos'
    })
});

// atualiza um produto
router.patch('/:id_produto', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Patch na rota de produtos'
    })
});

// deleta um produto
router.delete('/:id_produto', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Delete na rota de produtos'
    })
});

module.exports = router;