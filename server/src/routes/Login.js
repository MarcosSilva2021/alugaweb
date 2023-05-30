//rotas da api
const express = require('express');
const router = express.Router();
//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { eAdmin} = require('../middlewares/auth');
router.use(express.json());

const LoginController = require('./../controllers/LoginController');


// rota p fazer Login
router.post('/fazerlogin', LoginController.fazerLogin);
// rota p buscar todos o proprietarios
router.get('/userslogin', eAdmin, LoginController.buscarTodos);
// rota p buscar todos um usuario do bd_seq
router.get('/buscarumseq/:id', LoginController.buscarUmSeq);
// buscar um registro de proprietario pelo id como parametro
router.get('/owner/:codigo', eAdmin, LoginController.buscarUm);
//inserir dados --- editando em 23-05-15
router.post('/inserirusuario', eAdmin, LoginController.inserir);
// alterar campo(s) de um registro de um proprietario do bd (body)
router.put('/alterarusuario/:id', LoginController.alterar);
//deletar um registro de owner no bd
router.delete('/deletarusuario/:id', LoginController.excluir);

module.exports = router;