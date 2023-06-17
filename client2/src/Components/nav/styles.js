import styled from 'styled-components';

// criou conteniner para estilizar tudo
export const Container = styled.section`
        max-width: auto;        
        box-shadow: 0 0 1em #6c757d;
        padding: 1px 
        margin: 1px        
       
`;

export const ConteudoTitulo = styled.section`        
        display:flex;
        justify-content: space-between;                    
`;
export const ConteudoTitulo1 = styled.section`        
        display:flex;
                            
`;

export const BotaoAcao = styled.section`
        margin: 0px;
        justify-content: space-between;
        padding: 6px 9px;
`;

export const ButtonInfo = styled.button`
    background-color: #fff;
    color: #0dcaf0;
    
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
        font-size: 35px;
        padding: 10px;
        margin: 20px 0;
        display:flex;
        justify-content:space-around; 
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

export const Alertauser = styled.p`
color: black;
font-size: 25px;
padding: 15px;
margin: 15px 0;

justify-content:space-around;
`;

export const ConteudoForm = styled.section`
    max-width: 960px;
    padding: 10px 30px 30px;
    display:flex;
    justify-content:space-around; 
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

export const ButtonSuccess = styled.button`
    background-color: #fff;
    color: #198754;
    padding: 8px 12px;
    border: 1px solid #198754;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    &:hover {
        color: #fff;
        background-color: green;
    }
`;

export const ButtonSair = styled.button`
    background-color: #fff;
    color: black;
    padding: 8px 12px;
    border: 1px solid #198754;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    &:hover {
        color: #fff;
        background-color: blue;
    }
`;
