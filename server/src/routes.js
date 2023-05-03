//rotas da api
const express = require('express');
const router = express.Router();

const OwnerController = require('./controllers/OwnerController');

// rota p buscar todos o proprietarios
router.get('/owners', OwnerController.buscarTodos);
// buscar um registro de proprietario pelo id como parametro
router.get('/owner/:codigo', OwnerController.buscarUm);
//inserir dados
router.post('/owner', OwnerController.inserir);
// alterar campo(s) de um registro de um proprietario do bd (body)
router.put('/owner/:codigo', OwnerController.alterar);
// deletar um registro de owner no bd
router.delete('/owner/:codigo', OwnerController.excluir);




module.exports = router;
