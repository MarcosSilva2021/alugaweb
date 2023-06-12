import React from "react";
import { Link } from "react-router-dom";

import { Container, ConteudoForm, ConteudoTitulo, BotaoAcao, ButtonInfo, ContainerRadio, Titulo, AlertaSucess, AlertaDanger, Form, Label, Input, ButtonWarning} from "./styles";


export const ProdutoEdit = () => {
    return(
        <Container>
            <ConteudoForm>
                <ConteudoTitulo>
                    <Titulo>Editar</Titulo>
                    <BotaoAcao>                    
                    <Link to="/">
                        <ButtonInfo>listar</ButtonInfo>
                    </Link>                    
                </BotaoAcao>
                </ConteudoTitulo>
                <Form >
                    <Label >Nome: </Label>
                    <Input type="text" name="name" placeholder="Nome do produto" />

                    <Label >Preço: </Label>
                    <Input type="number" name="preco" placeholder="Preço do produto" />
                    
                    <Label >Disponivel: </Label>
                    <ContainerRadio>
                    <input type="radio" name="disponivel" value="1" /> Sim <br/><br/>
                    <input type="radio" name="disponivel" value="0" /> Não <br/>
                    </ContainerRadio>

                    <Label >Proprietario: </Label>
                    <Input type="number" name="idUser" placeholder="Proprietario do produto" />

                    <ButtonWarning type="submit">Editar</ButtonWarning>                  

                </Form>

            </ConteudoForm>
        </Container>
    );
}