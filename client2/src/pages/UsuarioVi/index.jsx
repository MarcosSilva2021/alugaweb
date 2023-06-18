import React, { useEffect, useState } from "react";
import { Container, Titulo ,ConteudoTitulo, BotaoAcao, ButtonInfo, ConteudoProduto } from './styles';
import { useParams, Link } from "react-router-dom";


export const UsuarioVi = () => {

    //exibindo os dados em tela
    const [data, setData] = useState([]);

    // recebendo os parametros id- url  de AppRoutes
    const { id } = useParams();
    //const id2 = parseInt(id, 10)
    //const [id] = useState(props.match.params.id) - se recebesse em (props);
    //const [id3] = useState(id2);
    const [id3] = useState(id);

    //console.log("tipo id:",typeof id);
    //console.log("tipo id2: ",typeof id2);
    var token = localStorage.getItem("token", token);
        console.log("token :", token);

    useEffect(() => {
        const getProduto = async () => {
            await fetch("http://localhost:7000/buscarumseq/" + id3, {
                headers: {'Authorization': 'Bearer ' + token 
                } 
            })
            .then((response) => response.json())
            .then((responseJson) => {
                 console.log(responseJson);
                 setData(responseJson.user);
            });
        }
        getProduto();
    }, [id3],[token]);

    return (
        <Container>
            <ConteudoTitulo>
                <Titulo>Visualizar Clientes</Titulo>
                <BotaoAcao>
                    <Link to="/userslogin">
                        <ButtonInfo>Listar</ButtonInfo>
                    </Link>
                </BotaoAcao>
            </ConteudoTitulo>
            <ConteudoProduto>ID: {data.id}</ConteudoProduto>
            <ConteudoProduto>Nome: {data.name}</ConteudoProduto>
            <ConteudoProduto>Email: {data.email}</ConteudoProduto>
            
        </Container>

    );
}