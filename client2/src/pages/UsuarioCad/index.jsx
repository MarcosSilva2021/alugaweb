import React, { useState, useContext } from "react";
import {Link} from 'react-router-dom';
import {AuthContext} from "../../contexts/auth";

import { Container, ConteudoForm, ConteudoTitulo, BotaoAcao, ButtonInfo, ContainerRadio, Titulo, AlertaSucess, AlertaDanger, Form, Label, Input, ButtonSuccess, ButtonClear, DivButton} from "./styles";
//import "./styles.css";

const UsuarioCad = () => {
    const auth = useContext(AuthContext);

    var token = localStorage.getItem("token", token);
    console.log("token :", token);
    
    const [produto, setProduto] = useState({
        name: '',
        email: '',
        password: ''        
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
        await fetch("http://localhost:7000/inserirusuario", {
            method: 'POST',
            headers: {                
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
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
                    email: '',
                    password: ''
                });
            }           
        })
        .catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Usuário não cadastrado, Tente mais tarde !'
                });
        });
    }
    //produto.idUser = parseInt(auth.user?.id , 10);

    return (
        <Container >
            <ConteudoForm>
                <ConteudoTitulo>
                <Titulo>Cadastrar Usuario</Titulo>             
                <BotaoAcao>                    
                    <Link to="/userslogin">
                        <ButtonInfo>Listar</ButtonInfo>
                    </Link>                    
                </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertaDanger>{status.mensagem }</AlertaDanger> : ""}
                {status.type === 'sucess'? <AlertaSucess>{status.mensagem }</AlertaSucess> : "" }
                <Form className="form" onSubmit={cadProduto}>
                    <Label >Nome: </Label>
                    <Input type="text" name="name" placeholder="Nome do Usuário" onChange={valorInput} value={produto.name}/><br/><br/>

                    <Label >Email: </Label>
                    <Input type="email" name="email" placeholder="Email do Usuário" onChange={valorInput} value={produto.email}/><br/><br/>
                    
                    <Label >Senha do Usuário </Label>
                    <Input type="password" name="password" placeholder="Senha do Usuário" onChange={valorInput} value={produto.password}/><br/><br/>

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
