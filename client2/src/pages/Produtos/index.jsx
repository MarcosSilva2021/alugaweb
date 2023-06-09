import React, {useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import {Container, ConteudoTitulo, BotaoAcao, ButtonSuccess, ButtonPrimary, ButtonWarning, ButtonDanger ,Table, Titulo,  } from "./styles";


const Produtos = () => {
    const [data, setData] = useState([]);
    /**
    // excluir Produto
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });   */

    const getProdutos = async () => {
        fetch("http://localhost:7000/buscarprodutos")
        .then((response) => response.json())
        .then((responseJson) => (
            //console.log(responseJson),
            setData(responseJson.produtos)
        ));
    };
    /*
    // excluir Produto
    const apagarProduto = async (idProduto) => {
        //console.log(idProduto);
        await fetch("http://localhost:7000/deletarproduto/" + idProduto , {
            method: 'DELETE',
          })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.erro){
                useState({
                    type: 'erro',
                    mensagem: responseJson.mensagem
                });
            } else{
                useState({
                    type: 'success',
                    mensagem: responseJson.mensagem
                });

            }
        })
        .catch(() => {
            useState({
                type: 'erro',
                mensagem: "erro: Produto não Excluido, tente mais tarde !!"
            });            
        });        
    };
    */
    useEffect(() =>{
        getProdutos();

    },[])

    return (
        <Container>
            <ConteudoTitulo>
            <Titulo>Listar Produtos</Titulo>
            <BotaoAcao>
                <Link to="/produtocad">
                    <ButtonSuccess>Cadastrar</ButtonSuccess>
                </Link>
            </BotaoAcao>
            </ConteudoTitulo>            
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Preco</th>                      
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(data).map(produto => (
                        <tr key={produto.id}>
                            <td>{produto.id}</td>
                            <td>{produto.name}</td> 
                            <td>{produto.preco}</td>        
                            <td>
                                <Link to={"/buscarproduto/" + produto.id }>
                                    <ButtonPrimary>Visualizar</ButtonPrimary>
                                </Link>{" "}
                                <Link to={"/alterarproduto/" + produto.id }>
                                    <ButtonWarning>Editar</ButtonWarning>
                                </Link>{" "}
                                <Link to={"/deletarproduto/" + produto.id }>
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

export default Produtos;