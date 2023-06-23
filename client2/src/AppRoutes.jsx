import React, {useContext} from "react";

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,    
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Produtos from "./pages/Produtos";
import ProdutoCad from "./pages/ProdutoCad";
import {ProdutoVi} from "./pages/ProdutoVi";
import {ProdutoEdit} from "./pages/ProdutoEdit";
import {ProdutoExcl} from "./pages/ProdutoExcl";
import ProdutoPag from "./pages/ProdutoPag";

import Usuarios from "./pages/Usuarios";
import UsuarioCad from "./pages/UsuarioCad";
import {UsuarioEdit} from "./pages/UsuarioEdit";
import {UsuarioVi} from "./pages/UsuarioVi";
import {UsuarioExcl} from "./pages/UsuarioExcl"

import Operacoes from "./pages/Operacoes";
import OperacaoCad from "./pages/OperacaoCad";
import {OperacaoAlugar} from "./pages/OperacaoAlugar";
import {OperacoesExcl} from "./pages/OperacoesExcl";


import Nav from "./Components/nav";
import Footer from "./Components/Footer";

import { AuthProvider, AuthContext } from "./contexts/auth.jsx";

const AppRoutes = () => {
    const Private = ({children}) => {
        const { authenticated, loading } = useContext(AuthContext);

        if(loading){
            return <div className="loading">Carregando...</div>;
        }

        if(!authenticated) {
            return <Navigate to="/login" />;
        }

        return children;
    };

    return(
        <Router>
            <AuthProvider>
            <header>
               <Nav/>                
            </header>       
                <Routes>
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/home" element={<Private><HomePage /></Private > }/>
                    <Route exact path="/" element={<Produtos /> }/>
                    <Route exact path="/buscarprodalugadospag" element={<ProdutoPag /> }/>
                    <Route exact path="/produtocad" element={<ProdutoCad /> }/>
                    <Route path="/buscarproduto/:id" Component={ProdutoVi}/>
                    <Route path="/alterarproduto/:id" Component={ProdutoEdit}/>
                    <Route path="/deletarproduto/:id" Component={ProdutoExcl}/>
                    
                    <Route exact path="/userslogin" element={<Usuarios /> }/>
                    <Route exact path="/inserirusuario" element={<UsuarioCad /> }/>
                    <Route path="/buscarumseq/:id" Component={UsuarioVi}/>
                    <Route path="/alterarusuario/:id" Component={UsuarioEdit}/>
                    <Route path="/deletarusuario/:id" Component={UsuarioExcl}/>

                    <Route exact path="/buscarprodutalugados" element={<Operacoes /> }/>
                    <Route exact path="/alugar/" element={<OperacaoCad /> }/>                    
                    <Route path="/alugar/:id" Component={OperacaoAlugar}/>
                    <Route path="/excluirprodalugado/:id" Component={OperacoesExcl}/>
                </Routes>   
            </AuthProvider>  
            <footer><Footer/></footer>       
        </Router>
    )
}

export default AppRoutes;
