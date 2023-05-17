//rotas da api
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { eAdmin} = require('../middlewares/auth');
//const db = require("../models/db_Seq");
const User = require('../models/User');

router.use(express.json());

const LoginController = require('./../controllers/LoginController');

// ---- TODAS AS ROTAS DE OWNER ---------
// rota lista protegida
router.get('/', eAdmin, async (req, res) =>{
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
    
});
// teste cadastrar
router.post('/cadastrar', async (req, res) =>{
    //console.log(req.body);  // recebendo os dados do corpo
    var dados = req.body;   // salvando os dados na variavel
    // $2a$08$jaHB2XR/Tqfu.KAGPYqCNOLsuX3UbMJuoV.SSjUPI6r80QQVTSl9S
    //const password = await bcrypt.hash("123456",8);
    dados.password = await bcrypt.hash(dados.password, 8);  // cryptografando os dados

    //console.log(password);
    //console.log("Dados:::");
    //console.log(dados);

    //cadastrando no bd
    await User.create(dados)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso !",        
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: usuário não cadastrado !!",        
        });
    })
    
});
// login login
router.post('/login', async (req, res) =>{
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
});

// rota p buscar todos o proprietarios
router.get('/owners', LoginController.buscarTodos);
// buscar um registro de proprietario pelo id como parametro
router.get('/owner/:codigo', LoginController.buscarUm);
//inserir dados --- editando em 23-05-15
router.post('/owner', LoginController.inserir);
// alterar campo(s) de um registro de um proprietario do bd (body)
router.put('/owner/:codigo', LoginController.alterar);
// deletar um registro de owner no bd
router.delete('/owner/:codigo', LoginController.excluir);

module.exports = router;