//rotas da api
const express = require('express');
const router = express.Router();

const ProductController = require('./../controllers/ProductController');

// ---- TODAS AS ROTAS DE PRODUCTS ---------
// rota p buscar todos
router.get('/products', ProductController.buscarTodos);
// buscar um registro pelo id como parametro
router.get('/product/:codigo', ProductController.buscarUm);
//inserir dados
router.post('/product', ProductController.inserir);
// alterar campo(s) de um registro  do bd (body)
router.put('/product/:codigo', ProductController.alterar);
// deletar um registro do bd
router.delete('/product/:codigo', ProductController.excluir);

module.exports = router;