import styled from 'styled-components';

// criou conteniner para estilizar tudo
export const Container = styled.section`
        max-width: 960px;
        margin: 20px auto;
        box-shadow: 0 0 1em #6c757d;   
        padding: 0px 20px 20px;
`;

export const ConteudoTitulo = styled.section`
        display: flex;
        justify-content: space-between;   
`;

export const BotaoAcao = styled.section`
        margin: 30px 0px;
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

export const ButtonPrimary = styled.button`
    background-color: #fff;
    color: #0d6efd;
    padding: 5px 8px;
    border: 1px solid #0d6efd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    &:hover {
        color: #fff;
        background-color: #0d6efd;
    }
`;

export const ButtonWarning = styled.button`
    background-color: #fff;
    color: #ffc107;
    padding: 5px 8px;
    border: 1px solid #ffc107;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    &:hover {
        color: #fff;
        background-color: #ffc107;
    }
`;

export const ButtonDanger = styled.button`
    background-color: #fff;
    color: #dc3545;
    padding: 5px 8px;
    border: 1px solid #dc3545;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    &:hover {
        color: #fff;
        background-color: #dc3545;
    }
`;

export const Titulo = styled.h1`
        color: #3e3e3e;
        font-size: 23px;
        padding: 10px
   
`;

export const Table = styled.table`
    width: 100%;
    th{
        background-color: #31d2f2;
        color: #3e3e3e;
        padding: 10px
    }
    td{
        background-color: #f6f6f6;
        color: #3e3e3e;
        padding: 8px
    }
`;