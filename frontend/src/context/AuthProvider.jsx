import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    // Load token on app start
    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) setToken(storedToken);
    }, []);

    // Login Method
    const login = (newToken) => {
        localStorage.setItem("authToken", newToken);
        setToken(newToken);
    };

    // Logout Method
    const logout = () => {
        localStorage.removeItem("authToken");
        setToken(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
