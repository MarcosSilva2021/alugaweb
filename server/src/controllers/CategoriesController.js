// controle da api
const CategoriesService = require('../services/CategoriesService');   // tras o categoriesservice p ownercontroll


module.exports = {

    // método para buscar todos os proprietarios do bd
    buscarTodos: async (req, res) => {
        let json = {error:'', result:[]};

        let categories = await CategoriesService.buscarTodos();

        for(let i in categories){
            json.result.push({
                id: categories[i].id,
                name: categories[i].name                
            });
        }

        res.json(json);
    },

    // metodo que busca uma unica categoria pelo id
    buscarUm: async (req, res) => {
        let json = {error:'', result:{}};

        let codigo = req.params.codigo; //para pegar o parametro
        let categories = await CategoriesService.buscarUm(codigo);

        if(categories){
            json.result = categories; //se tiver nota ele joga no json
        }

        res.json(json);
    },

    //inserir uma categiries no bd
    inserir: async(req, res) => {
        let json = {error:'', result:{}};

        let name = req.body.name;
                
        if (name){
            let categoriesCodigo = await CategoriesService.inserir(name);
            json.result = {                // retorna o objeto
                codigo: categoriesCodigo,
                name,               
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
        let name = req.body.name;

        if (codigo && name){
            await CategoriesService.alterar(codigo, name);
            json.result = {
                codigo,                
                name
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    // excluir um registro da tabela - categories
    excluir: async(req, res) => {
        let json = {error:'', result:{}};

        await CategoriesService.excluir(req.params.codigo);
        
        res.json(json);
    },
}
