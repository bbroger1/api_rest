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
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: "Aconteceu algo inesperado e não foi possível apresentar os produtos"
                    })
                }

                const response = {
                    quantidade: result.length,
                    descricao: 'Retorna todos os produtos',
                    produtos: result.map(prod => {
                        return {
                            id_produto: prod.id_produto,
                            nome: prod.nome,
                            preco: prod.preco,
                            request: {
                                tipo: 'GET',
                                descricao: 'aqui será inserida a descrição do Produto',
                                url: 'http://localhost:3000/produtos/' + prod.id_produto
                            }
                        }
                    })
                }
                return res.status(200).send({
                    response
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
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: "Aconteceu algo inesperado e não foi possível cadastrar o produto"
                    })
                }

                const response = {
                    mensagem: 'Produto inserido com sucesso.',
                    descricao: 'Insere um produtos',
                    produtoCriado: {
                        id_produto: result.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            tipo: 'POST',
                            descricao: 'aqui será inserida a descrição do Produto',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }
                res.status(201).send({
                    response
                })
            }
        )

    });
});

// retorna um produtos
router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }

        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?',
            [req.params.id_produto],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: "Aconteceu algo inesperado e não foi possível apresentar o produto"
                    })
                }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Produto não encontrado'
                    })
                }

                const response = {
                    descricao: 'Retorna um produto pelo seu ID',
                    produto: {
                        id_produto: result[0].id_produto,
                        nome: result[0].nome,
                        preco: result[0].preco,
                        request: {
                            tipo: 'GET',
                            descricao: 'aqui será inserida a descrição do Produto',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }
                res.status(201).send({
                    response
                })
            }
        )

    });
});

// atualiza um produto
router.patch('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }

        conn.query(
            'UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?',
            [req.body.nome, req.body.preco, req.body.id_produto],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: "Aconteceu algo inesperado e não foi possível editar o produto"
                    })
                }

                const response = {
                    mensagem: 'Produto atualizado com sucesso',
                    produtoAtualizado: {
                        id_produto: req.body.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            tipo: 'GET',
                            descricao: 'aqui será inserida a descrição do Produto',
                            url: 'http://localhost:3000/produtos/' + req.body.id_produto
                        }
                    }
                }

                res.status(202).send({
                    response
                })
            }
        )

    });
});

// deleta um produto
router.delete('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error })
        }

        conn.query(
            'DELETE FROM produtos WHERE id_produto = ?',
            [req.body.id_produto],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: "Aconteceu algo inesperado e não foi possível deletar o produto"
                    })
                }

                const response = {
                    mensagem: 'Produto deletado com sucesso',
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna a lista de produtos',
                        url: 'http://localhost:3000/produtos'
                    }
                }

                res.status(202).send({
                    response
                })
            }
        )

    });
});

module.exports = router;