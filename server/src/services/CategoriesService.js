// regras e configurações do bd
const db = require('../db');

module.exports = {
    //buscar todos os registro de owners
    buscarTodos: () => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM categories', (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    
    //buscar um unico registro de categories
    buscarUm: (codigo) => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM categories WHERE id = ?', [codigo], (error, results) => {
                if(error) { rejeitado(error); return; }
                if(results.length > 0){ //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results[0]);
                }else {
                    aceito(false);
                }
            });
        });
    },

    //inserindo um registro de categories
    inserir: (name)=> {
        return new Promise((aceito, rejeitado)=> {

            db.query('INSERT INTO categories (name) VALUES (?)',
                [name],
                (error, results)=>{
                    if(error){ rejeitado(error); return; }
                    aceito(results.insertCodigo); //insertId
                }
            );
        });
    },

    // alterando um registro de proprietario
    alterar:(codigo, name)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('UPDATE categories SET  name = ? WHERE id = ?',
                [name, codigo],
                (error, results) => {
                    if(error){ rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    // excluir um registro de categories
    excluir: (codigo)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('DELETE FROM categories WHERE id = ?',[codigo], (error, results ) =>{
                if(error){ rejeitado(error); return; }
                aceito(results);
            });
        });
    },

     // EXCLUIR TODOS os registro de proprietario -EXCLUI TODOS
    excluirTodos: ()=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('DELETE FROM categories WHERE id = ?',(error, results ) =>{
                if(error){ rejeitado(error); return; }
                aceito(results);
            });
        });
    }
};