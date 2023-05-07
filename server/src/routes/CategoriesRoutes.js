//rotas da api
const express = require('express');
const router = express.Router();

const CategoriesController = require('./../controllers/CategoriesController');

// ---- TODAS AS ROTAS DE CATEGORIES ---------
// rota p buscar todos o categirias
router.get('/categories', CategoriesController.buscarTodos);
// buscar um registro de categirias pelo id como parametro
router.get('/categorie/:codigo', CategoriesController.buscarUm);
//inserir dados
router.post('/categorie', CategoriesController.inserir);
// alterar campo(s) de um registro de um categirias do bd (body)
router.put('/categorie/:codigo', CategoriesController.alterar);
// deletar um registro de categirias no bd
router.delete('/categorie/:codigo', CategoriesController.excluir);

module.exports = router;
