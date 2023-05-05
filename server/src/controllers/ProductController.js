// controle da api
const ProductsService = require('../services/ProductService');   // tras o productsservice p productcontroll


module.exports = {

    // método para buscar todos os productss do bd
    buscarTodos: async (req, res) => {
        let json = {error:'', result:[]};

        let products = await ProductsService.buscarTodos();

        for(let i in products){
            json.result.push({
                id: products[i].id,
                name: products[i].name,
                description: products[i].description,
                photo: products[i].photo,
                price: products[i].price,
                category_id: products[i].category_id
            });
        }

        res.json(json);
    },

    // metodo que busca um unico produto pelo id
    buscarUm: async (req, res) => {
        let json = {error:'', result:{}};

        let codigo = req.params.codigo; //para pegar o parametro
        let product = await ProductsService.buscarUm(codigo);

        if(product){
            json.result = product; //se tiver nota ele joga no json
        }

        res.json(json);
    },

    //inserir um propriatario no bd
    inserir: async(req, res) => {
        let json = {error:'', result:{}};
      
        let name = req.body.name;
        let description = req.body.description;
        let photo = req.body.photo;
        let price = req.body.price;
        let category_id = req.body.category_id;
        
        if (name && description && photo && price && category_id){
            let productCodigo = await OwnerService.inserir(name, description, photo, price, category_id);
            json.result = {                 // retorna o objeto
                codigo: productCodigo,
                name,
                description,
                photo,
                price,
                category_id
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    // alterar dados do BD
    alterar: async(req, res) => {
        let json = {error:'', result:{}};
        //
        let codigo = req.params.codigo;
        let name = req.body.name;
        let description = req.body.description;
        let photo = req.body.photo;
        let price = req.body.price;
        let category_id = req.body.category_id;
   
        if (codigo && name && description && photo && price && category_id){
            await ProductService.alterar(codigo, name, description, photo, price, category_id);
            json.result = {
                codigo,
                name, 
                description, 
                photo, 
                price, 
                category_id
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    // excluir um registro da tabela - owners - proprieatario
    excluir: async(req, res) => {
        let json = {error:'', result:{}};

        await ProductService.excluir(req.params.codigo);
        
        res.json(json);
    },
}
