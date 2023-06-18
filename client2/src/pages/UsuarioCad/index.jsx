import React, { useState, useContext } from "react";
import {Link} from 'react-router-dom';
import {AuthContext} from "../../contexts/auth";

import { Container, ConteudoForm, ConteudoTitulo, BotaoAcao, ButtonInfo, ContainerRadio, Titulo, AlertaSucess, AlertaDanger, Form, Label, Input, ButtonSuccess, ButtonClear, DivButton} from "./styles";
//import "./styles.css";

const UsuarioCad = () => {
    const auth = useContext(AuthContext);
    
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
                setProduto({
                    name: '',
                    preco:  '',
                    disponivel: '',
                    idUser: ''
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
    produto.idUser = parseInt(auth.user?.id , 10);

    return (
        <Container >
            <ConteudoForm>
                <ConteudoTitulo>
                <Titulo>Cadastrar Produto</Titulo>             
                <BotaoAcao>                    
                    <Link to="/">
                        <ButtonInfo>Listar</ButtonInfo>
                    </Link>                    
                </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertaDanger>{status.mensagem }</AlertaDanger> : ""}
                {status.type === 'sucess'? <AlertaSucess>{status.mensagem }</AlertaSucess> : "" }
                <Form className="form" onSubmit={cadProduto}>
                    <Label >Nome: </Label>
                    <Input type="text" name="name" placeholder="Nome do produto" onChange={valorInput} value={produto.name}/><br/><br/>

                    <Label >Preço: </Label>
                    <Input type="number" name="preco" placeholder="Preço do produto" onChange={valorInput} value={produto.preco}/><br/><br/>
                    
                    <Label >Disponivel: </Label>
                    <ContainerRadio>
                    <input type="radio" name="disponivel" value="1" onChange={valorInput} /> Sim <br/><br/>
                    <input type="radio" name="disponivel" value="0" onChange={valorInput} /> Não <br/>
                    </ContainerRadio><br/>

                    <Label > Este é o seu ID</Label>
                    <Input type="number" name="idUser" placeholder="Proprietario do produto" onChange={valorInput} value={produto.idUser}/><br/><br/>

                    <DivButton>
                    <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>{" "}
                    <ButtonClear type="reset">Limpar</ButtonClear>
                    </DivButton>
                </Form>
            </ConteudoForm> 
        </Container>
    )
};

export default UsuarioCad;
