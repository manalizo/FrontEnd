import React, { useState, useContext } from "react";
import { loginUser } from "../utils/ApiFunctions";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(username, password);
            
            alert("Connexion réussie !");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom d'utilisateur</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;
