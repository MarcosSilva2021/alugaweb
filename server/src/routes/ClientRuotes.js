//rotas da api
const express = require('express');
const router = express.Router();

const ClientController = require('./../controllers/ClientController');

// ---- TODAS AS ROTAS DE CLIENTS ---------
// rota p buscar todos o cleits
router.get('/clients', ClientController.buscarTodos);
// buscar um registro de cleits pelo id como parametro
router.get('/client/:codigo', ClientController.buscarUm);
//inserir dados
router.post('/client', ClientController.inserir);
// alterar campo(s) de um registro de um cleits do bd (body)
router.put('/client/:codigo', ClientController.alterar);
// deletar um registro de cleits no bd
router.delete('/client/:codigo', ClientController.excluir);

module.exports = router;
