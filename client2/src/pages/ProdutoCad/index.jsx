import React, { useState } from "react";

import { Container, titulo, AlertaSucess, AlertaDanger } from "./styles";
//import "./styles.css";

const ProdutoCad = () => {
   /** "name": "PC samsung", preco": 120, 	"disponivel": false,	"idUser": 2     */
   // preenchendo a constante produto dos valores da form
    const [produto, setProduto] = useState({
        name: '',
        preco:  '',
        disponivel: '',
        idUser: ''        
    });

    // Respostas recebidas
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })
    //set os novos valores de produtos do form
   const  valorInput = e => setProduto({ ...produto, [e.target.name]: e.target.value}); //{...produto,} - vai recuperar os valore dos campos do produto

    const cadProduto = async e =>{
        e.preventDefault();
        console.log("produto antes de enviou:", produto);
        await fetch("http://localhost:7000/inserirproduto", {
            method: 'POST',
            headers: {                
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...produto})
        })
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log("resposta json: ",responseJson)
            if(responseJson.erro){
                setStatus({
                    type: 'erro',
                    mensagem: responseJson.mensagem
                });
            }else{
                setStatus({
                    type: 'sucess',
                    mensagem: responseJson.mensagem
                });
            }           
        })
        .catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Produto não cadastrado, Tente mais tarde !'
                });
        });
    }
    /**
     * fetch('https://www.meusite.com.br/api', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
     */

    return (
        <div id="cadastro" >
            <title>Cadastrar produto</title>
            <h1 className="title" >Cadastrar produto</h1>
            {status.type === 'erro'? <p>{status.mensagem }</p> : ""}
            {status.type === 'sucess'? <p>{status.mensagem }</p> : ""}
            <form className="form" onSubmit={cadProduto}>
                <label >Nome: </label>
                <input type="text" name="name" placeholder="Nome do produto" onChange={valorInput}/><br/><br/>

                <label >Preço: </label>
                <input type="number" name="preco" placeholder="Preço do produto" onChange={valorInput}/><br/><br/>

                <label >Disponivel: </label>
                <input type="number" name="disponivel" placeholder="disponibilidade do produto" onChange={valorInput}/><br/><br/>

                <label >Proprietario: </label>
                <input type="number" name="idUser" placeholder="Proprietario do produto" onChange={valorInput}/><br/><br/>

                <button type="submit">Cadastrar</button>

            </form>
            
        </div>
    )
};

export default ProdutoCad;