const express = require('express');
const router = express.Router();

// retorna todos os produtos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Recuperar todos os produtos'
    })
});

// insere um produto
router.post('/', (req, res, next) => {
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco,
    };
    res.status(201).send({
        mensagem: 'Inserir um produto',
        produtoCriado: produto
    })
});

// retorna um produtos
router.get('/:id_produto', (req, res, next) => {
    const idProduto = req.params.id_produto;

    res.status(200).send({
        id: idProduto,
        mensagem: 'Buscar um produto pelo seu id'
    })
});

// atualiza um produto
router.patch('/:id_produto', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Editar um produto'
    })
});

// deleta um produto
router.delete('/:id_produto', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Deletar um produto'
    })
});

module.exports = router;