import React, {useState, useContext} from "react";

import { AuthContext } from "../../contexts/auth";

import "./styles.css";

const LoginPage = () => {
    const { authenticated, login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /* const auth = useContext(AuthContext);   //usando o contexto para acessar o login
     const navigate = useNavigate();
 
     
 
     const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
         setEmail(event.target.value);
     }
 
     const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
         setPassword(event.target.value);
     }
 
     const handleLogin = async () => {
         if (email && password) {
             const isLogged = await auth.signin(email, password);
             if (isLogged) {
                 navigate('/');  // se der certo redireciomn p está pagina
             } else {
                 alert("Não deu certo.");
             }
         }
     }
     */
    const hadleSubmit = (e) => {
        e.preventDefault();
        console.log("submit", {email, password});
        login(email, password); // integração com contexto
    };

    return (
        <div id="login">
            <h1 className="title">Login do Sistema</h1>
            <p>{String(authenticated)}</p>
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
                    <button onClick type="submit">Entrar</button>
                </div>
            </form>
        </div>
    );
};
export default LoginPage;