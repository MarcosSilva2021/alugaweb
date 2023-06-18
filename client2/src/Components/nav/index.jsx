import React, {useContext} from "react";
import { Link } from "react-router-dom";
import {Container, ConteudoTitulo,  ConteudoTitulo1, BotaoAcao, ButtonSuccess, ButtonSair ,Titulo, Alertauser  } from "./styles";
import {AuthContext} from "../../contexts/auth";


const Nav = () => {
    let msg = "Olá Visitante";
    const auth = useContext(AuthContext);
    //auth.logout();
    if (auth.user?.id>0){
       // msg = ({nome: auth.user?.name , ID: auth.user?.id});
       msg = "Olá";
    };
    const handleLogout = async () => {
        auth.logout();
    }
      
    
    return (
        <Container>
            <ConteudoTitulo>
            <Titulo>Aluga na Web</Titulo>                                                    
            
    
                <Alertauser>
                {msg}{"  "}<strong>{auth.user?.name}</strong>
                </Alertauser>                                      
            
                </ConteudoTitulo>
            <ConteudoTitulo1>            
                 
                <BotaoAcao>
                    <Link to="/buscarprodutalugados">
                        <ButtonSuccess>Operações Realizadas</ButtonSuccess>
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
                    <Link to="/userslogin">
                        <ButtonSuccess>Usuários do Sistema</ButtonSuccess>
                    </Link>
                </BotaoAcao>
                
                {!auth.user &&
                    <BotaoAcao>
                        <Link to="/login">
                        <ButtonSuccess>Fazer Login</ButtonSuccess>
                        </Link> 
                    </BotaoAcao>
                }                           
                {auth.user &&             
                <BotaoAcao onClick={handleLogout}>
                    <Link to="/">
                        <ButtonSair>Sair do Sistema</ButtonSair>
                    </Link>
                </BotaoAcao>}               

            </ConteudoTitulo1>            
            
        </Container>
    )
};

export default Nav;

//<BotaoAcao onClick={handleLogout}>Sair</BotaoAcao>}