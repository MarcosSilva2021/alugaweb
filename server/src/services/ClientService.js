// regras e configurações do bd
const db = require('../db');

module.exports = {
    //buscar todos os registro de clientes
    buscarTodos: () => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM clients', (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    
    //buscar um unico registro de clients
    buscarUm: (codigo) => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM clients WHERE id = ?', [codigo], (error, results) => {
                if(error) { rejeitado(error); return; }
                if(results.length > 0){ //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results[0]);
                }else {
                    aceito(false);
                }
            });
        });
    },

    //inserindo um registro de clients
    inserir: (email, password, name)=> {
        return new Promise((aceito, rejeitado)=> {

            db.query('INSERT INTO clients (email, password, name) VALUES (?, ?, ?)',
                [email, password, name],
                (error, results)=>{
                    if(error){ rejeitado(error); return; }
                    aceito(results.insertCodigo); //insertId
                }
            );
        });
    },

    // alterando um registro de clients
    alterar:(codigo, email, password, name)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('UPDATE clients SET email = ?, password = ?, name = ? WHERE id = ?',
                [email, password, name, codigo],
                (error, results) => {
                    if(error){ rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    // excluir um registro de clients
    excluir: (codigo)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('DELETE FROM clients WHERE id = ?',[codigo], (error, results ) =>{
                if(error){ rejeitado(error); return; }
                aceito(results);
            });
        });
    },

     // EXCLUIR TODOS os registro de clients -EXCLUI TODOS
    excluirTodos: ()=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('DELETE FROM clients WHERE id = ?',(error, results ) =>{
                if(error){ rejeitado(error); return; }
                aceito(results);
            });
        });
    }
};