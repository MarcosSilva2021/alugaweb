import React ,{useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";

import { Container, ConteudoForm, ConteudoTitulo, BotaoAcao, ButtonInfo, Titulo, AlertaSucess, AlertaDanger, Form, Label, Input, ButtonWarning} from "./styles";


export const UsuarioEdit = () => {
    //trazer os dados do banco de dados   

    // recebendo os parametros id- url  de AppRoutes
    const { id } = useParams();
    //const id2 = parseInt(id, 10)
    //const [id] = useState(props.match.params.id) - se recebesse em (props);
    //const [id3] = useState(id2);
    const [id3] = useState(id);
    // recebendo os dados individualemte
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    
    
    // Respostas recebidas
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const editProduto = async e => {
        e.preventDefault();
        //console.log(name);

        await fetch("http://localhost:7000/alterarusuario/", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ id, name, email})
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
            await fetch("http://localhost:7000/buscarumseq/" + id3)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    setName(responseJson.user.name);
                    setEmail(responseJson.user.email);
                    
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
                    <Link to="/userslogin">
                        <ButtonInfo>Listar Usuários</ButtonInfo>
                    </Link>                    
                </BotaoAcao>
                </ConteudoTitulo>
                {status.type === 'erro'? <AlertaDanger>{status.mensagem }</AlertaDanger> : ""}
                {status.type === 'success'? <AlertaSucess>{status.mensagem }</AlertaSucess> : ""}

                <Form onSubmit={editProduto}>
                    <Label >Nome: </Label>
                    <Input type="text" name="name" placeholder="Nome do produto" value={name} onChange={e => setName(e.target.value)} />

                    <Label >Email: </Label>
                    <Input type="email" name="email" placeholder="seu email" value={email}  onChange={e => setEmail(e.target.value)}/>
                   
                    <ButtonWarning type="submit">Editar</ButtonWarning>                         

                </Form>

            </ConteudoForm>
        </Container>
    );
}