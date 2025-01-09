import React, { createContext, useState, useEffect } from "react";
import { verifyToken } from "../utils/ApiFunctions";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            verifyToken(token)
                .then((data) => setUser(data))
                .catch(() => setUser(null))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = (userData, token) => {
        localStorage.setItem("authToken", token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Assurez-vous que cet export existe !
export default AuthProvider;
