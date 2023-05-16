// atauliza o servidor quando houver atualizações - chamado pelo script start em package.json

require('dotenv').config({path:'variaveis.env'});   // ler arquivo variaveis de ambiente
const express = require('express');
const cors = require('cors');// dependencia - trabalhar com api - acesso - recursor de site de outros dominios
const bodyParser = require('body-parser');  // converte o body de requisiçoes em outros formatos

//determinando as rotas p o servidor
const OwnersRoutes = require('./routes/OwnerRoutes');
const ProductRoutes = require('./routes/ProductRoutes');
const ClientRoutes = require('./routes/ClientRuotes');
const CategoriesRoutes = require('./routes/CategoriesRoutes');
const LoginRouters = require('./routes/LoginRoutes');       

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended: false})); //conf

// uso routes e já usa o prefixo(/api) nos enereços de rota
server.use('/api', OwnersRoutes); 
server.use('/api', ProductRoutes);//vai ser publica
server.use('/api', ClientRoutes);
server.use('/api', CategoriesRoutes);
server.use('/', LoginRouters);
//server.use('/api', LoginRouters);

//função reduzida- anonima  p ler arquivo variaveis.env
server.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
})
