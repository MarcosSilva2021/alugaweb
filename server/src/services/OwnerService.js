// regras e configurações do bd
const db = require('../db');

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM owners', (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    
    //buscar um unico proprietario
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

    //inserindo um proprietario ao bd
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

    // alterando o codigo
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
};