// controle da api
const ClientService = require('../services/ClientService');   // tras o ownerservice p ownercontroll


module.exports = {

    // método para buscar todos os proprietarios do bd
    buscarTodos: async (req, res) => {
        let json = {error:'', result:[]};

        let clients = await ClientService.buscarTodos();

        for(let i in clients){
            json.result.push({
                id: clients[i].id,
                email: clients[i].email,
                password: clients[i].password,
                name: clients[i].name
            });
        }

        res.json(json);
    },

    // metodo que busca um unico proprietario pelo id
    buscarUm: async (req, res) => {
        let json = {error:'', result:{}};

        let codigo = req.params.codigo; //para pegar o parametro
        let client = await ClientService.buscarUm(codigo);

        if(client){
            json.result = client; //se tiver nota ele joga no json
        }

        res.json(json);
    },

    //inserir um cliente no bd
    inserir: async(req, res) => {
        let json = {error:'', result:{}};

        let email = req.body.email;
        let password = req.body.password;
        let name = req.body.name;        
        
        if (email && password && name){
            let clientCodigo = await ClientService.inserir(email , password , name);
            json.result = {                 // retorna o objeto
                codigo: clientCodigo,
                email,
                password,
                name               
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
       
        if (codigo && email && password && name){
            await ClientService.alterar(codigo, email, password, name);
            json.result = {
                codigo,
                email,
                password,
                name
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    // excluir um registro da tabela - owners - proprieatario
    excluir: async(req, res) => {
        let json = {error:'', result:{}};

        await ClientService.excluir(req.params.codigo);
        
        res.json(json);
    },
}
