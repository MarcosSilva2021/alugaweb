//rotas da api
const express = require('express');
const router = express.Router();

const OwnerController = require('./controllers/OwnerController');

// rota p buscar todos o proprietarios
router.get('/owners', OwnerController.buscarTodos);
// buscar um proprietario
router.get('/owner/:codigo', OwnerController.buscarUm);
//inserir dados
router.post('/owner', OwnerController.inserir);
// alterar dados de proprietario do bd
router.put('/owner/:codigo', OwnerController.alterar);



module.exports = router;
