const express = require('express');
const router = express.Router();
// controle da api
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { eAdmin} = require('../middlewares/auth');
const db = require("../models/db_Seq");
const Produto = require('../models/Produto');
const { NUMBER } = require('sequelize');
router.use(express.json());

module.exports = {

    // método para buscar todos os produtos de bd_seq
    buscarTodos: async (req, res) => {
        await Produto.findAll({
            attributes: ['id', 'name', 'preco', 'disponivel', 'idUser'],
            order: [['id',"ASC"]]
        })
        .then((produtos) => {
            return res.json({
                erro: false,
                produtos,
                id_usuario_logado: req.userId      
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum produto encontrado !!",        
            });
        })
    },

    // método para buscar todos os produtos por Paginação de bd_seq
    buscartodospag: async (req, res) => {
        //indica paginação - recebe o numero da pagina, qunado não é inviado o nº da pagina é atribuido a pgn 1
        const { page = 1} = req.query;
        console.log(page);

        // limitar o numero de registros por pagina
        const limit = 10;

        // Váriavel com o numero da última página
        var lastPage = 1;

        //consta a quantidade de registros do bd
        const countRegistros = await Produto.count();
        console.log(countRegistros);

        // Acessa o IF quando encontrar registro no bd
        if(countRegistros !== 0){
            // calcular a última página
            lastPage=  Math.ceil(countRegistros / limit);
            console.log(lastPage);

        }else{
            return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhum produto encontrado !!",        
        });}

        console.log((page * limit) - limit); // ex * 10 - 10

        // recupera todos os produtos do bd-seq
        await Produto.findAll({
                       
            // indica quais colunas recuperar
            attributes: ['id', 'name', 'preco', 'disponivel', 'idUser'],
            order: [['id',"ASC"]],

            // calcular a partir de qual registro deve retornar e o limite de registros
            offset: Number((page * limit) - limit),
            limit: limit
        })
        .then((produtos) => {
            // Criar objetos com as informações para paginação
            var pagination = {
                // caminho
                path: '/buscartodospag',
                // página atual
                page,
                // url da pagina anterior
                prev_page_url: page - 1 >= 1 ? page - 1 : false,
                // url da próxima pagina 
                next_page_url: Number(page) + Number(1) > lastPage ? false : Number(page) + Number(1),
                // ultima pagina
                lastPage,
                // quantidade total de registros
                total: countRegistros
            }
            return res.json({
                erro: false,
                produtos,
                pagination,
                id_usuario_logado: req.userId      
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum produto encontrado !!",        
            });
        })
    },

    //////// NOVOS TESTES P ACESSAR BD-SEQ
    buscarUmSeq: async (req, res) => {
        const produto = await Produto.findOne({
            attributes: ['id', 'name', 'preco', 'disponivel', 'idUser'],
            where: {
                id: req.params.id
            }
        });
        //se não encontrar um produto com o id, faz
        if(produto === null){
            return res.status(400).json({
                erro: true,
                mensagem: " Nenhum produto "
            });
        }
        // produto foi encontrado
        return res.json({
            erro: false,
            produto                 
        });
    },

    //inserir um produto no bd
    inserir: async(req, res) => {
        const cadSucess = true;
        var dados = req.body;

        //cadastrando no bd
        await Produto.create(dados)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Produto cadastrado com sucesso !",
                cadSucess,        
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: produto não cadastrado !!",        
            });
        })
        
    },

    // alterar dados do BD
    alterar: async(req, res) => {
        // Receber os dados enviados no corpo da requisição
        var dados = req.body;
    
        //cadastrando no bd
        await Produto.update(dados, {where: {id: dados.id}})
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Produto alterado com sucesso !",        
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: pruduto não alterado !!",        
            });
        })
        
    },

    // excluir um registro da tabela - owners - proprieatario
    excluir: async(req, res) => {
        // Receber os dados enviados no corpo da requisição
        const { id } = req.params;
        const flag = 0;
        
        // Apagar produto usando com Models users
        await Produto.destroy({
            // condição
            where: {id: id}
        }).then(() => {
            return res.status(200).json({
                erro: false,
                mensagem: "Pruduto Excluido !!",
                flag : 1        
            });
            

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: pruduto não Excluido !!",        
            });
        });        
    },
}
