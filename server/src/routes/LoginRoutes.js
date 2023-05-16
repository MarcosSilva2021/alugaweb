//rotas da api
const express = require('express');
const router = express.Router();

const LoginController = require('./../controllers/LoginController');

// ---- TODAS AS ROTAS DE OWNER ---------
// rota p buscar todos o proprietarios
router.get('/owners', LoginController.buscarTodos);
// buscar um registro de proprietario pelo id como parametro
router.get('/owner/:codigo', LoginController.buscarUm);
//inserir dados
router.post('/owner', LoginController.inserir);
// alterar campo(s) de um registro de um proprietario do bd (body)
router.put('/owner/:codigo', LoginController.alterar);
// deletar um registro de owner no bd
router.delete('/owner/:codigo', LoginController.excluir);

module.exports = router;