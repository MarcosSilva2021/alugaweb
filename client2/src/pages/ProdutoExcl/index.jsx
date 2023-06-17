import React, { useEffect, useState, useContext} from "react";
import { Container, Titulo ,ConteudoTitulo, BotaoAcao, ButtonInfo, ButtonDanger, AlertaSucess, AlertaDanger,ConteudoProduto } from './styles';
import { useParams, Link } from "react-router-dom";
import {AuthContext} from "../../contexts/auth";


export const ProdutoExcl = () => {
    const auth = useContext(AuthContext);

    //exibindo os dados em tela
    const [data, setData] = useState([]);
    const data2 = {}

    // condição de exclusão
    let flag = 0;

    

    // stadus p excluir
    // excluir Produto
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

   
    // recebendo os parametros id- url  de AppRoutes
    const { id } = useParams();  
    const [id3] = useState(id);

    useEffect(() => {
        const getProduto = async () => {
            await fetch("http://localhost:7000/buscarproduto/" + id3)
                .then((response) => response.json())
                .then((responseJson) => {
                    //console.log(responseJson);
                    setData(responseJson.produto);
                });
        }
        getProduto();
    }, [id3]);

    // excluir Produto -- const editProduto = async e => {
    const apagarProduto = async (id) => {
        
        //console.log(idProduto);        
        await fetch("http://localhost:7000/deletarproduto/" +id ,{
            method: 'DELETE',
          })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            
           

            if(responseJson.erro){
                setStatus({
                    type: 'erro',
                    mensagem: responseJson.mensagem,
                    
                });
            }else{                
                setStatus({
                    type: 'success',
                    mensagem: responseJson.mensagem,
                    flag: responseJson.flag                                                           
                });
                
                             
                           
            }
        })
        .catch(() => {
            setStatus({
                type: 'erro',
                mensagem: "Não funcionou ... Tente mais tarde!"
            });

        })     
    };

    if (flag) {
        return(
            <>
            
            <h1> {status.type === 'success'? <AlertaSucess>{status.mensagem }</AlertaSucess> : ""}</h1>
            <Link to = "/"><h2><strong> Voltar ao Sistema</strong></h2></Link>
            </>

        )
        
    }
    
        

    return (
        <Container>
            <ConteudoTitulo>
                <Titulo>Excluir Produtos</Titulo>
                Olá {auth.user?.name}
                <BotaoAcao>
                    <Link to="/">
                        <ButtonInfo>Listar</ButtonInfo>
                    </Link>
                </BotaoAcao>
            </ConteudoTitulo>
            {status.type === 'erro'? <AlertaDanger>{status.mensagem }</AlertaDanger> : ""}
            {status.type === 'success'? <AlertaSucess>{status.mensagem }</AlertaSucess> : ""}{<Link to="/"></Link>}
            <ConteudoProduto id="id">ID: {data.id}</ConteudoProduto>
            <ConteudoProduto id="nome">Nome: {data.name} </ConteudoProduto>
            <ConteudoProduto id="preco">Preço: {data.preco}</ConteudoProduto>
            <ConteudoProduto id="disponivel">Disponivel: sim{data.disponivel}</ConteudoProduto>
            <ConteudoProduto id="iduser">Proprietario: {data.idUser}</ConteudoProduto>
            <ButtonDanger onClick={() => apagarProduto(id)} >Excluir produto do Sistema</ButtonDanger>
        </Container>



    );
};


/**
 //atualizar  os dados em tela - criando outro dados
            const [data2, setData2] = useState({
                id: '',
                name: '',
                preco: '',
                disponivel: '',
                idUser: ''
            });
 */