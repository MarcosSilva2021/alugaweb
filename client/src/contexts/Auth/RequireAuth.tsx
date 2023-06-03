import { useContext } from "react";
import { Login } from "../../pages/Login";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext);   // acessando ocontext p ver se esta logado

   if (!auth.user) {
        return <Login />;
    }

    return children;
}