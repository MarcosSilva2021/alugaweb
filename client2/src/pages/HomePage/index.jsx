import React, { useState,  useEffect, useContext} from "react";

import { AuthContext } from "../../contexts/auth";

import { getUsers } from "../../services/api";

const HomePage = () => {
    const { logout } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await getUsers();
            setUsers(response.data);
            setLoading(false);
            //console.log("setusers: ",setUsers);
            //console.log("users recebidos: ",users);
        })();
    }, []);

    const handleLogout = () => {
        logout();
    };

    if (loading){
        return <div className="loading">Carregando dados ...</div>;
    };
    //var usertodos = users;
                {users.map((user) => {
                    return(
                       <div key={user.id}>
                        <h3>{user.id}</h3>
                        <p>{user.email}</p>
                        <p>{user.name}</p>
                       </div>
                    )    
                })}
            
       

};

export default HomePage;

/**
 * return (
        <div>
            <h1>HomePage</h1>            
            <button onClick={handleLogout}>Logout</button>
            <ul>
                {users1.map((user, index) => (
                    <l1 key={index}>
                        {user.id} - {user.email}
                    </l1>
                ))}
            </ul>
       </div>
    );
 */