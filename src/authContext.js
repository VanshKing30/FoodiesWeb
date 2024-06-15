import { createContext, useContext, useState } from "react";

const authContext = createContext({
    isAuthenticated: false
});

export const useAuth = () => useContext(authContext);

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);

    const checkAuthentication = (token) => {
        setAuthenticated(!!token);
    };

    return (
        <authContext.Provider value={{ isAuthenticated, checkAuthentication }}>
            {children}
        </authContext.Provider>
    );
};

export { AuthProvider };
