const express = require('express');
const router = express.Router();
const { NUMBER, Model } = require('sequelize');
router.use(express.json());
// controle da api
//const db = require("../models/db_Seq");
const ProdAlugados = require('../models/Produtos_Alugados');
const User = require('../models/User');
const Produto = require('../models/Produto');


module.exports = {

    // método para buscar todos os produtos de bd_seq
    buscarTodos: async (req, res) => {
        await ProdAlugados.findAll({
            attributes: ['id', 'userId', 'produtoId'],// editar
            order: [['id']],
            include: [
                {
                    attributes: ['name'],
                    model: User},
                {
                    attributes: ['name'],
                    model: Produto
                            
            }]            
        })
        .then((prod_Alugados) => {
            return res.json({
                erro: false,
                prod_Alugados,
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
        //indica paginação - recebe o numero da pagina, quando não é inviado o nº da pagina é atribuido a pgn 1
        const { page = 1} = req.query;
        console.log(page);

        // limitar o numero de registros por pagina
        const limit = 10;

        // Váriavel com o numero da última página
        var lastPage = 1;

        //consta a quantidade de registros do bd
        const countRegistros = await ProdAlugados.count();
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
        await ProdAlugados.findAll({
                       
            // indica quais colunas recuperar
            attributes: ['id', 'userId', 'produtoId'],// editar
            order: [['id']],
            include: [
                {
                    attributes: ['name'],
                    model: User},
                {
                    attributes: ['name'],
                    model: Produto
                            
            }],

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
        const produto = await ProdAlugados.findOne({
            attributes: ['id', 'userId', 'produtoId'],// editar
            order: [['id']],
            include: [
                {
                    attributes: ['name'],
                    model: User},
                {
                    attributes: ['name'],
                    model: Produto
                            
            }],
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
        var dados = req.body;

        //cadastrando no bd
        await ProdAlugados.create(dados)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Operação de Produtos Alugados cadastrado com sucesso !",        
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Operação de Produtos Alugados não cadastrado !!",        
            });
        })
        
    },

    // alterar dados do BD
    alterar: async(req, res) => {
        // Receber os dados enviados no corpo da requisição
        var dados = req.body;
    
        //cadastrando no bd
        await ProdAlugados.update(dados, {where: {id: dados.id}})
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Operação de Produtos Alugados alterado com sucesso !",        
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Operação de Produtos Alugados não alterado !!",        
            });
        })
        
    },

    // excluir um registro da tabela - owners - proprieatario
    excluir: async(req, res) => {
        // Receber os dados enviados no corpo da requisição
        const { id } = req.params;
        
        // Apagar produto usando com Models users
        await ProdAlugados.destroy({
            // condição
            where: {id: id}
        }).then(() => {
            return res.status(200).json({
                erro: false,
                mensagem: "Operação de Produtos Excluido !!",        
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Operação de Produtos não Excluido !!",        
            });
        });        
    },
}
