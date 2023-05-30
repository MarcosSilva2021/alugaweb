//rotas da api
const express = require('express');
const router = express.Router();
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const { eAdmin} = require('../middlewares/auth');
router.use(express.json());

const ProdAlugados = require('./../controllers/ProdAlugadosController');

// rota p buscar todos o proprietarios
router.get('/buscarprodutalugados', ProdAlugados.buscarTodos);
// rota p buscar todos os produtos por paginação
router.get('/buscarprodalugadospag', ProdAlugados.buscartodospag);
// rota p buscar todos um usuario do bd_seq
router.get('/buscarprodalugado/:id', ProdAlugados.buscarUmSeq);
// buscar um registro de proprietario pelo id como parametro
//router.get('/owner/:codigo', eAdmin, ProdAlugados.buscarUm);
//inserir dados --- editando em 23-05-15
router.post('/alugar', ProdAlugados.inserir);
// alterar campo(s) de um registro de um proprietario do bd (body)
router.put('/alterarprodalugado/:id', ProdAlugados.alterar);
//deletar um registro de owner no bd
router.delete('/excluirprodalugado/:id', ProdAlugados.excluir);

module.exports = router;