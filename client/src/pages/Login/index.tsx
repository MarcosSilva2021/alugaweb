import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import "./styles.css";

export const Login = () => {
    const auth = useContext(AuthContext);   //usando o contexto para acessar o login
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    return (
        <div id="login">
            <h1 className="title">Login do Sistema</h1>
            <form className="form" onSubmit={handleLogin} >
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email"
                        value={email}
                        onChange={handleEmailInput}
                        placeholder="Digite seu e-mail"
                    />
                </div>
                <div className="field">
                    <label htmlFor="password">Senha</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password"
                        value={password}
                        onChange={handlePasswordInput}
                        placeholder="Digite sua senha"
                    />
                </div>
                <div className="actions">
                    <button onClick={handleLogin} type="submit">Entrar</button>
                </div>
            </form>          
        </div>
    );
}