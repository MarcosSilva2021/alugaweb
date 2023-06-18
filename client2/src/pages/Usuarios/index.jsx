import React, {useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import {Container, ConteudoTitulo, BotaoAcao, ButtonSuccess, ButtonPrimary, ButtonWarning, ButtonDanger ,Table, Titulo,  } from "./styles";


const Usuarios = () => {
    const [data, setData] = useState([]);     
    
    var token = localStorage.getItem("token", token);
    console.log("token :", token);

    const getProdutos = async () => {  
            
        
            fetch("http://localhost:7000/userslogin", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token 
            } 
        })
        .then((response) => response.json())
        .then((responseJson) => (
            //console.log(responseJson),
            setData(responseJson.users)
        ));
    };
 
    useEffect(() =>{
        getProdutos();        

    },[token]);

    return (
        <Container>
            <ConteudoTitulo>
            <Titulo>Listar Usuarios</Titulo>
            <BotaoAcao>
                <Link to="/inserirusuario">
                    <ButtonSuccess>Cadastrar</ButtonSuccess>
                </Link>
            </BotaoAcao>
            </ConteudoTitulo>            
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Email</th>                      
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(data).map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.name}</td> 
                            <td>{usuario.email}</td>        
                            <td>
                                <Link to={"/buscarumseq/" + usuario.id }>
                                    <ButtonPrimary>Visualizar</ButtonPrimary>
                                </Link>{" "}
                                <Link to={"/alterarusuario/" + usuario.id }>
                                    <ButtonWarning>Editar</ButtonWarning>
                                </Link>{" "}
                                <Link to={"/deletarusuario/" + usuario.id }>
                                    <ButtonDanger>Excluir</ButtonDanger>
                                </Link>                                                       
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
};

export default Usuarios;