import styled from 'styled-components';

// criou conteniner para estilizar tudo
export const Container = styled.section`
        max-width: 960px;
        margin: 20px auto;
        box-shadow: 0 0 1em #6c757d;   
`;

export const titulo = styled.h1`
        color: #3e3e3e;
        font-size: 23px;
        padding: 10px   
`;
//exibir mensagens
export const AlertaSucess = styled.p`
        background-color: #d1e7dd;
        color: #0f5132;
        margin: 20px 0;
        boder: 1px solid #badbcc;
        boder-radius: 4px;
        padding: 7px
`;

export const AlertaDanger = styled.p`
        background-color: #f8d7da;
        color: #842029;
        margin: 20px 0;
        boder: 1px solid #f5c2c7;
        boder-radius: 4px;
        padding: 7px
`;

export const Table = styled.table`
    width: 100%;
    th{
        background-color: #ffd219;
        color: #3e3e3e;
        padding: 10px
    }
    td{
        background-color: #f6f6f6;
        color: #3e3e3e;
        padding: 8px
    }
`;