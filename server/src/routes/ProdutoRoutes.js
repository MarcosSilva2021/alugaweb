//rotas da api
const express = require('express');
const router = express.Router();
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const { eAdmin} = require('../middlewares/auth');
router.use(express.json());

const ProdutoController = require('./../controllers/ProdutoController');

// rota p buscar todos o proprietarios
router.get('/buscarprodutos', ProdutoController.buscarTodos);
// rota p buscar todos os produtos por paginação
router.get('/buscartodospag', ProdutoController.buscartodospag);
// rota p buscar todos um usuario do bd_seq
router.get('/buscarproduto/:id', ProdutoController.buscarUmSeq);
// buscar um registro de proprietario pelo id como parametro
//router.get('/owner/:codigo', eAdmin, ProdutoController.buscarUm);
//inserir dados --- editando em 23-05-15
router.post('/inserirproduto', ProdutoController.inserir);
// alterar campo(s) de um registro de um proprietario do bd (body)
//router.put('/alterarproduto/:id', ProdutoController.alterar);
router.put('/alterarproduto/', ProdutoController.alterar);
//deletar um registro de owner no bd
router.delete('/deletarproduto/:id', ProdutoController.excluir);

module.exports = router;