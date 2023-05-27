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
    
        var token = jwt.sign({id: user.id}, "pasteldecarne&caldodecana", {
            //expiresIn: 600 // em segundos 60 * 10 = 10 minutos
            //expiresIn: '7d' // 7 dias
            expiresIn: 300      
        });
        
        return res.json({
            erro: false,
            mensagem: "Login realizado com sucesso",
            token
        });
    },

    // método para buscar todos os proprietarios do bd
    buscarTodos: async (req, res) => {
        await User.findAll({
            attributes: ['id', 'name', 'email'],
            order: [['id',"DESC"]]
        })
        .then((users) => {
            return res.json({
                erro: false,
                users,
                id_usuario_logado: req.userId      
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

    //inserir um propriatario no bd
    inserir: async(req, res) => {
        let json = {error:'', result:{}};

        let email = req.body.email;
        let password = req.body.password;
        let name = req.body.name;
        let is_admin = req.body.is_admin;
        
        if (email && password && name && is_admin){
            let ownerCodigo = await LoginService.inserir(email , password , name , is_admin);
            json.result = {                 // retorna o objeto
                codigo: ownerCodigo,
                email,
                password,
                name,
                is_admin
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    // alterar dados do BD
    alterar: async(req, res) => {
        let json = {error:'', result:{}};

        let codigo = req.params.codigo;
        let email = req.body.email;
        let password = req.body.password;
        let name = req.body.name;
        let is_admin = req.body.is_admin;

        if (codigo && email && password && name && is_admin){
            await LoginService.alterar(codigo, email, password, name, is_admin);
            json.result = {
                codigo,
                email,
                password,
                name,
                is_admin
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    // excluir um registro da tabela - owners - proprieatario
    excluir: async(req, res) => {
        let json = {error:'', result:{}};

        await LoginService.excluir(req.params.codigo);
        
        res.json(json);
    },
}
