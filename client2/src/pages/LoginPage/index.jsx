import React, {useState, useContext} from "react";

import { AuthContext } from "../../contexts/auth";

import "./styles.css";
import { Link} from "react-router-dom";

const LoginPage = () => {
    const { authenticated, login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

     
    if (authenticated) {
        return( 
            <>
            <h1><p>Usuário Logado no sistema</p></h1>         
            <Link to = "/"><h2><strong> Voltar ao Sistema</strong></h2></Link>          
            </>
        );
        
    };
    const hadleSubmit = (e) => {
        e.preventDefault();
        console.log("submit", {email, password});
        login(email, password); // integração com contexto
    };

    return (
        <div id="login">
            <h1 className="title">Login do Sistema</h1>
            <p>Insira suas credenciais para ter acesso ao sistema</p>
            <form className="form" onSubmit={hadleSubmit}>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Digite seu e-mail" />
                </div>
                <div className="field">
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha" />
                </div>
                <div className="actions">
                    <button type="submit">Entrar</button><br/><br/>
                    <button type="reset">Limpar</button>
                </div>
            </form>
        </div>
    );
};
export default LoginPage;