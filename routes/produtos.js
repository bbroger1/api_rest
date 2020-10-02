const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// retorna todos os produtos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }

        conn.query(
            'SELECT * FROM produtos',
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: "Aconteceu algo inesperado e não foi possível apresentar os produtos"
                    })
                }

                return res.status(200).send({
                    response: resultado
                })
            }
        )

    });
});

// insere um produto
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }

        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: "Aconteceu algo inesperado e não foi possível cadastrar o produto"
                    })
                }

                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso.',
                    id_produto: resultado.insertId
                })
            }
        )

    });
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