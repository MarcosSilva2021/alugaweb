import styled from 'styled-components';

// criou conteniner para estilizar tudo
export const Container = styled.section`
        max-width: 960px;
        margin: 20px auto;
        box-shadow: 0 0 1em #6c757d;   
`;

export const ConteudoTitulo = styled.section`
        display: flex;
        justify-content: space-between;   
`;

export const BotaoAcao = styled.section`
        margin: 30px 0px;
`;

export const ButtonInfo = styled.button`
    background-color: #fff;
    color: #0dcaf0;
    padding: 6px 9px;
    border: 1px solid #0dcaf0;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    &:hover {
        color: #fff;
        background-color: #31d2f2;
    }
`;

export const ContainerRadio = styled.section`
    max-width: 100px;
    padding: 12px;
    border: 1px solid #ccc;
    boder-radius: 4px;
    box-sizing: boder-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;          
`;

export const Titulo = styled.h1`
        color: #3e3e3e;
        font-size: 23px;
        padding: 10px;  
`;
//exibir mensagens
export const AlertaSucess = styled.p`
        background-color: #d1e7dd;
        color: #0f5132;
        margin: 20px 0;
        border: 1px solid #badbcc;
        border-radius: 4px;
        padding: 7px;
`;

export const AlertaDanger = styled.p`
        background-color: #f8d7da;
        color: #842029;
        margin: 20px 0;
        border: 1px solid #f5c2c7;
        border-radius: 4px;
        padding: 7px;
`;

export const ConteudoForm = styled.section`
    max-width: 960px;
    padding: 10px 30px 30px;
`;

export const Form = styled.form`
    margin: 0px auto;
`;

export const Label = styled.label`
    width: 100%;
    padding: 12px;
    margin-top: 6px;
    margin-bottom: 16px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    boder-radius: 4px;
    box-sizing: boder-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;
`;

export const ButtonWarning = styled.button`
    background-color: #fff;
    color: #ffc107;
    padding: 8px 12px;
    border: 1px solid #ffc107;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    &:hover {
        color: #fff;
        background-color: #ffc107;
    }
`;
