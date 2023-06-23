import React, {useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import {Container, ConteudoTitulo, BotaoAcao, ButtonSuccess, ButtonPrimary, ButtonWarning, ButtonDanger ,Table, Titulo,  } from "./styles";
//import axios from "axios";

const ProdutoPag = () => {
    // declara a variavel para receber os dados retornados da API
    const [data, setData] = useState([]);

    // Declara a variável para receber o número da página
    const [page, setPage] = useState("");

    //Declara a variável para receber o número da última página
    const [lastPage, setLastPage] = useState("");

    // Função com a requisição para API recuperar usuários
    const getProdutos = async (page) => {
        console.log("Numero página0 : ",page);
        if (page === undefined){
            page = 1;            
        };
        setPage(page);
        console.log("Numero página: ",page);
        
            fetch("http://localhost:7000/buscartodospag?page=" + page)
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson),
                setData(responseJson.produtos);

                setLastPage(responseJson.pagination.lastPage);
                console.log("lastPage:  ",responseJson.pagination.lastPage);

            });
        };
    /*  -- funciona com axio
    await axios.get("http://localhost:7000/buscartodospag?page" + page)
    .then((response) => {
        //console.log(responseJson),
        // atribui os registros no state data
        setData(response.data.produtos);

        setLastPage(response.data.pagination.lastPage);
        console.log("lastPage:  ",response.data.pagination.lastPage);
    });
    }; */

    useEffect(() =>{
        getProdutos();

    },[]);

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
            {page !== 1 ? <button type='button' onClick={() => getProdutos(1)} >Primeira</button>
            : <button type='button' disabled>Primeira</button>    }
            {" "}
            {page !== 1 ? <button type='button' onClick={() => getProdutos(page - 1) }>{page - 1}</button>: ""}{" "}
            <button type='button' disabled>{page}</button>{" "}
            {page !== lastPage ? <button type='button' onClick={() => getProdutos(lastPage)} >Última</button>
            : <button type='button' disabled>Última</button>    }
            {" "}
            <br/><br/><br/><br/>
        </Container>
        
    )
};

export default ProdutoPag;