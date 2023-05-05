// regras e configurações do bd
const db = require('../db');

module.exports = {
    //buscar todos os registro de products
    buscarTodos: () => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM products', (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    
    //buscar um unico registro de proprietario
    buscarUm: (codigo) => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM products WHERE id = ?', [codigo], (error, results) => {
                if(error) { rejeitado(error); return; }
                if(results.length > 0){ //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results[0]);
                }else {
                    aceito(false);
                }
            });
        });
    },

    //inserindo um registro de products
    inserir: (name, description, photo, price, category_id)=> {
        return new Promise((aceito, rejeitado)=> {
                                           
            db.query('INSERT INTO products (name, description, photo, price, category_id) VALUES (?, ?, ?, ?, ?)',
                [name, description, photo, price, category_id],
                (error, results)=>{
                    if(error){ rejeitado(error); return; }
                    aceito(results.insertCodigo); //insertId
                }
            );
        });
    },

    // alterando um registro de produto
    alterar:(codigo, name, description, photo, price, category_id)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('UPDATE products SET name = ?, description = ?, photo = ?, price = ?, category_id WHERE id = ?',
                [name, description, photo, price, category_id, codigo],
                (error, results) => {
                    if(error){ rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    // excluir um registro de produto
    excluir: (codigo)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('DELETE FROM products WHERE id = ?',[codigo], (error, results ) =>{
                if(error){ rejeitado(error); return; }
                aceito(results);
            });
        });
    },

     // EXCLUIR TODOS os registro de proprietario -EXCLUI TODOS
    excluirTodos: ()=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('DELETE FROM products WHERE id = ?',(error, results ) =>{
                if(error){ rejeitado(error); return; }
                aceito(results);
            });
        });
    }
};