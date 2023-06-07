import React, {useState ,useEffect} from "react";

//import { Table } from "./styles";

const Produtos = () => {
    const [data, setData] = useState([]);

    const getProdutos = async () => {
        fetch("http://localhost:7000/buscartodospag?page=1")
        .then((response) => response.json())
        .then((responseJson) => (
            //console.log(responseJson),
            setData(responseJson.produtos)
        ));
    }

    useEffect(() =>{
        getProdutos();

    },[])

    return (
        <div >
            <h1>Listar Produtos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Preco</th>
                        <th>disponivel</th>
                        <th>Id_user</th>
                        <th> Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(data).map(produto => (
                        <tr key={produto.id}>
                            <td>{produto.id}</td>
                            <td>{produto.name}</td> 
                            <td>{produto.preco}</td>
                            <td>{produto.disponivel}</td>
                            <td>{produto.idUser}</td>
                            <td>Visualizar  Editar  Apagar</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default Produtos;