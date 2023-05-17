//rotas da api
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { eAdmin} = require('../middlewares/auth');
const db = require("../models/db_Seq");

router.use(express.json());

const LoginController = require('./../controllers/LoginController');

// ---- TODAS AS ROTAS DE OWNER ---------
// rota home
router.get('/', eAdmin, async (req, res) =>{
    return res.json({
        erro: false,
        mensagem: "Listar owners - proprietarios",
        id_usuario_logado: req.id        
    });
});
// teste login
router.post('/cadastrar', async (req, res) =>{
    // $2a$08$jaHB2XR/Tqfu.KAGPYqCNOLsuX3UbMJuoV.SSjUPI6r80QQVTSl9S
    const password = await bcrypt.hash("123456",8);

    console.log(password);

    return res.json({
        erro: false,
        mensagem: "Cadastrar",        
    });
});
// login login
router.post('/login', async (req, res) =>{
    console.log(req.body);

    if(req.body.email != "testelogin@clke.com.br"){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuario ou senha incorreta -- email!"
        });
    }

    if(!(await bcrypt.compare(req.body.password, "$2a$08$jaHB2XR/Tqfu.KAGPYqCNOLsuX3UbMJuoV.SSjUPI6r80QQVTSl9S"))){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuario ou senha incorreta  -- senha!"
        });
    }    

    var token = jwt.sign({id: 1}, "pasteldecarne&caldodecana", {
        //expiresIn: 600 // em segundos 60 * 10 = 10 minutos
        //expiresIn: '7d' // 7 dias
        expiresIn: 300,
        
       
    });
    console.log(id);

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