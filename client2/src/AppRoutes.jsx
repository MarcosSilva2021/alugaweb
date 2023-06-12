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
                    <Route exact path="/produtocad" element={<ProdutoCad /> }/>
                    <Route path="/buscarproduto/:id" Component={ProdutoVi}/>
                    <Route path="/alterarproduto/:id" Component={ProdutoEdit}/>
                </Routes>   
            </AuthProvider>  
            <footer><Footer/></footer>       
        </Router>
    )
}

export default AppRoutes;

/**
 *              <Link to="/home">Homepage--privado --  </Link>      
                <Link to="/login"> Página de Logig_____Aberta -- </Link>
                <Link to="/">Página de Produtos____Aberta -- </Link>
                <Link to="/produtocad"> ___Cadastrar___Produtos  </Link>
 * 
 */