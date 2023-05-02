// controle da api
const OwnerService = require('../services/OwnerService');   // tras o ownerservice p ownercontroll


module.exports = {

    // método para buscar todos os proprietarios do bd
    buscarTodos: async (req, res) => {
        let json = {error:'', result:[]};

        let owners = await OwnerService.buscarTodos();

        for(let i in owners){
            json.result.push({
                id: owners[i].id,
                email: owners[i].email,
                password: owners[i].password,
                name: owners[i].name,
                is_admin: owners[i].is_admin
            });
        }

        res.json(json);
    },

    // metodo que busca um unico proprieatario pelo id
    buscarUm: async (req, res) => {
        let json = {error:'', result:{}};

        let codigo = req.params.codigo; //para pegar o parametro
        let owner = await OwnerService.buscarUm(codigo);

        if(owner){
            json.result = owner; //se tiver nota ele joga no json
        }

        res.json(json);
    },

    //inserir um propriatario no bd
    inserir: async(req, res) => {
        let json = {error:'', result:{}};

        let email = req.body.email;
        let password = req.body.password;
        let name = req.body.name;
        let is_admin = req.body.is_admin;
        
        if (email && password && name && is_admin){
            let ownerCodigo = await OwnerService.inserir(email , password , name , is_admin);
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
            await OwnerService.alterar(codigo, email, password, name, is_admin);
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
}
