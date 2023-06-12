import React from "react";
import { Link } from "react-router-dom";
import {Container, ConteudoTitulo, BotaoAcao, ButtonSuccess ,Titulo,  } from "./styles";


const Nav = () => {
    
    return (
        <Container>
            <Titulo>Aluga na Web</Titulo>
            <ConteudoTitulo>            
            <BotaoAcao>
                <Link to="/login">
                    <ButtonSuccess>Fazer Login</ButtonSuccess>
                </Link> 
            </BotaoAcao> 
            <BotaoAcao>
                <Link to="/home">
                    <ButtonSuccess>Homepage privado</ButtonSuccess>
                </Link>
            </BotaoAcao>           
            <BotaoAcao>
                <Link to="/">
                    <ButtonSuccess>Produtos</ButtonSuccess>
                </Link>
            </BotaoAcao> 
            <BotaoAcao>
                <Link to="/produtocad">
                    <ButtonSuccess>Cadastrar</ButtonSuccess>
                </Link>
            </BotaoAcao> 
            <BotaoAcao>
                <Link to="/buscarproduto">
                    <ButtonSuccess>Visualizar Detalhes</ButtonSuccess>
                </Link>
            </BotaoAcao>       
            
            </ConteudoTitulo>            
            
        </Container>
    )
};

export default Nav;