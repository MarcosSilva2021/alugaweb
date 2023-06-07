const express = require('express');
const router = express.Router();
// controle da api
const LoginService = require('../services/LoginService');   // tras o ownerservice p ownercontroll
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { eAdmin} = require('../middlewares/auth');
//const db = require("../models/db_Seq");
const User = require('../models/User');
router.use(express.json());

module.exports = {

    //fazer login  
    fazerLogin: async (req, res) =>{
        //console.log(req.body);
        //recebe os dados do bd
        const user = await User.findOne({
            attributes: ['id', 'name', 'email', 'password'],
            where: {
                email: req.body.email
            }
        });
        //se não encontrar um usuaro com o email acima, faz
        if(user === null){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuario ou senha incorreta ! Nenhum usuário com este e-mail"
            });
        }
        // usuario foi encontrado
        if(!(await bcrypt.compare(req.body.password, user.password ))){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuario ou senha incorreta  -- senha!"
            });
        }
        var user0 = {
            id: user.id,
            email: user.email
        }
        
        var token = jwt.sign({id: user.id}, "pasteldecarne&caldodecana", {
            //expiresIn: 600 // em segundos 60 * 10 = 10 minutos
            //expiresIn: '7d' // 7 dias
            expiresIn: 3600      
        });
       return res.json({         
            user0,             
            token                   
        });       
        
       /** return res.json({
            //erro: false,
            //mensagem: "Login realizado com sucesso",
            token,
                       
        });  */
    },

    // método para buscar todos os proprietarios do bd
    buscarTodos: async (req, res) => {
        await User.findAll({
            attributes: ['id', 'name', 'email'],
            order: [['id',"DESC"]]
        })
        .then((users) => {
            return res.json({
                //erro: false,
                users,
               // id_usuario_logado: req.userId      
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum usuario encontrado !!",        
            });
        })
    },

    // metodo que busca um unico proprietario pelo id
    buscarUm: async (req, res) => {
        let json = {error:'', result:{}};

        let codigo = req.params.codigo; //para pegar o parametro
        let owner = await LoginService.buscarUm(codigo);

        if(owner){
            json.result = owner; //se tiver nota ele joga no json
        }

        res.json(json);
    },

    //////// NOVOS TESTES P ACESSAR BD-SEQ
    buscarUmSeq: async (req, res) => {
        const user = await User.findOne({
            attributes: ['id', 'name', 'email', 'password'],
            where: {
                id: req.params.id
            }
        });
        //se não encontrar um usuaro com o email acima, faz
        if(user === null){
            return res.status(400).json({
                erro: true,
                mensagem: " Nenhum usuário "
            });
        }
        // usuario foi encontrado
        return res.json({
            erro: false,
            user                 
        });
    },

    //inserir um usuario no bd
    inserir: async(req, res) => {
        var dados = req.body;

        //cadastrando no bd
        await User.create(dados)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: " usuario cadastrado com sucesso !",        
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuario não cadastrado !!",        
            });
        })
    },

    // alterar dados do BD
    alterar: async(req, res) => {
        // Receber os dados enviados no corpo da requisição
        var dados = req.body;
    
        //cadastrando no bd
        await User.update(dados, {where: {id: dados.id}})
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Usuario alterado com sucesso !",        
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuario não alterado !!",        
            });
        })
    },

    // excluir um registro da tabela - owners - proprieatario
    excluir: async(req, res) => {
            // Receber os dados enviados no corpo da requisição
            const { id } = req.params;
        
            // Apagar produto usando com Models users
            await User.destroy({
                // condição
                where: {id: id}
            }).then(() => {
                return res.status(200).json({
                    erro: false,
                    mensagem: "Usuário Excluido !!",        
                });
    
            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Usuário não Excluido !!",        
                });
            }); 
    },
}
