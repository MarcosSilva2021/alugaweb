import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

export const ProdutoVi = () => {
    const {id} = useParams();
    //const id2 = parseInt(id, 10)
    //const [id] = useState(props.match.params.id);
    //const [id3] = useState(id2);
    const [id3] = useState(id);
    
    //console.log("tipo id:",typeof id);
    //console.log("tipo id2: ",typeof id2);

    useEffect(() => {
        const getProduto = async () =>{
            await fetch("http://localhost:7000/buscarproduto/" + id3)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);                
            });
        }
        getProduto();
    },[id3]);

    return (
        <h1>Visualizar</h1>
    );
}