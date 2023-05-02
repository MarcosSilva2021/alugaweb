// atauliza o servidor quando houver atualizações - chamado pelo script start em package.json

require('dotenv').config({path:'variaveis.env'});   // ler arquivo variaveis de ambiente
const express = require('express');
const cors = require('cors');// dependencia - trabalhar com api - acesso - recursor de site de outros dominios
const bodyParser = require('body-parser');  // converte o body de requisiçoes em outros formatos

const routes = require('./routes') //determinando as rotas p o servidor

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended: false})); //conf

server.use('/api', routes); //prefixo para nos enereços de rota

//função reduzida- anonima  p ler arquivo variaveis.env
server.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
})
