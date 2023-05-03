// regras e configurações do bd
const db = require('../db');

module.exports = {
    //buscar todos os registro de owners
    buscarTodos: () => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM owners', (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    
    //buscar um unico registro de proprietario
    buscarUm: (codigo) => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM owners WHERE id = ?', [codigo], (error, results) => {
                if(error) { rejeitado(error); return; }
                if(results.length > 0){ //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results[0]);
                }else {
                    aceito(false);
                }
            });
        });
    },

    //inserindo um registro de proprietario
    inserir: (email, password, name, is_admin)=> {
        return new Promise((aceito, rejeitado)=> {

            db.query('INSERT INTO owners (email, password, name, is_admin) VALUES (?, ?, ?, ?)',
                [email, password, name, is_admin],
                (error, results)=>{
                    if(error){ rejeitado(error); return; }
                    aceito(results.insertCodigo); //insertId
                }
            );
        });
    },

    // alterando um registro de proprietario
    alterar:(codigo, email, password, name, is_admin)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('UPDATE owners SET email = ?, password = ?, name = ?, is_admin = ? WHERE id = ?',
                [email, password, name, is_admin, codigo],
                (error, results) => {
                    if(error){ rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    // excluir um registro de proprietario
    excluir: (codigo)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('DELETE FROM owners WHERE id = ?',[codigo], (error, results ) =>{
                if(error){ rejeitado(error); return; }
                aceito(results);
            });
        });
    },

     // EXCLUIR TODOS os registro de proprietario -EXCLUI TODOS
    excluirTodos: ()=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('DELETE FROM owners WHERE id = ?',(error, results ) =>{
                if(error){ rejeitado(error); return; }
                aceito(results);
            });
        });
    }
};