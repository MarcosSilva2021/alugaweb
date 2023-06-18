import React ,{useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";

import { Container, ConteudoForm, ConteudoTitulo, BotaoAcao, ButtonInfo, ContainerRadio, Titulo, AlertaSucess, AlertaDanger, Form, Label, Input, ButtonWarning} from "./styles";


export const ProdutoEdit = () => {
    //trazer os dados do banco de dados   

    // recebendo os parametros id- url  de AppRoutes
    const { id } = useParams();
    //const id2 = parseInt(id, 10)
    //const [id] = useState(props.match.params.id) - se recebesse em (props);
    //const [id3] = useState(id2);
    const [id3] = useState(id);
    // recebendo os dados individualemte
    const [name, setName] = useState('');
    const [preco, setPreco] = useState('');
    const [disponivel, setDisponivel] = useState('');
    const [idUser, setIduser] = useState('');
    
    // Respostas recebidas
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const editProduto = async e => {
        e.preventDefault();
        //console.log(name);

        await fetch("http://localhost:7000/alterarproduto/", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, name, preco, disponivel, idUser})
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if(responseJson.erro){
                setStatus({
                    type: 'error',
                    mensagem: responseJson.mensagem
                });
            }else{
                setStatus({
                    type: 'success',
                    mensagem: responseJson.mensagem
                });
            }
        })
        .catch(() => {
            setStatus({
                type: 'error',
                mensagem: "Não funcionou ... Tente mais tarde!"
            });

        })
    }

    useEffect(() => {
        const getProduto = async () => {
            await fetch("http://localhost:7000/buscarproduto/" + id3)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    setName(responseJson.produto.name);
                    setPreco(responseJson.produto.preco);
                    setDisponivel(responseJson.produto.disponivel);
                    setIduser(responseJson.produto.idUser);
                });
        }
        getProduto();
    }, [id3]);

    return(
        <Container>
            <ConteudoForm>
                <ConteudoTitulo>
                    <Titulo>Editar</Titulo>
                    <BotaoAcao>                    
                    <Link to="/">
                        <ButtonInfo>Listar</ButtonInfo>
                    </Link>                    
                </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertaDanger>{status.mensagem }</AlertaDanger> : ""}
                {status.type === 'success'? <AlertaSucess>{status.mensagem }</AlertaSucess> : ""}

                <Form onSubmit={editProduto}>
                    <Label >Nome: </Label>
                    <Input type="text" name="name" placeholder="Nome do produto" value={name} onChange={e => setName(e.target.value)} />

                    <Label >Preço: </Label>
                    <Input type="number" name="preco" placeholder="Preço do produto" value={preco}  onChange={e => setPreco(e.target.value)}/>
                    
                    <Label >Disponivel: </Label>
                    <ContainerRadio>
                    <input type="radio" name="disponivel" value="1"  onChange={e => setDisponivel(e.target.value)}/> Sim <br/><br/>
                    <input type="radio" name="disponivel" value="0"  onChange={e => setDisponivel(e.target.value)}/> Não <br/>
                    </ContainerRadio>

                    <Label >Proprietario: </Label>
                    <Input type="number" name="idUser" placeholder="Proprietario do produto" value={idUser} onChange={e => setIduser(e.target.value)}/>

                    <ButtonWarning type="submit">Editar</ButtonWarning>                         

                </Form>

            </ConteudoForm>
        </Container>
    );
}