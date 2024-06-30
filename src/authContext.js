import { createContext, useContext, useState, useEffect } from "react";

const authContext = createContext({
    isAuthenticated: false
});

export const useAuth = () => useContext(authContext);

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        // saving the token to local storage when canteen user logIn
        localStorage.setItem('authToken', token);
        setAuthenticated(true);
    };
    
    const signUp = (token) => {
        // saving the token to local storage when canteen user logIn
        localStorage.setItem('authToken', token);
        setAuthenticated(true);
    };

    const logout = () => {
       
        localStorage.removeItem('authToken');
        setAuthenticated(false);
    };

    return (
        <authContext.Provider value={{ isAuthenticated, login, logout, signUp }}>
            {children}
        </authContext.Provider>
    );
};

export { AuthProvider };
