import React, { createContext, useState, useEffect } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    isAdmin: boolean;
    setLoggedIn: (isLoggedIn: boolean, isAdmin?: boolean) => void;
}

interface Props {
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    isAdmin: false,
    setLoggedIn: () => { },
});

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const userToken = sessionStorage.getItem("userToken");
        if (userToken) {
            setLoggedIn(true);
            setIsAdmin(JSON.parse(sessionStorage.getItem("isAdmin") || "false"));
        }
    }, []);

    const updateLoggedInState = (isLoggedIn: boolean, isAdmin: boolean = false) => {
        setLoggedIn(isLoggedIn);
        setIsAdmin(isAdmin);
        sessionStorage.setItem("userToken", isLoggedIn ? "true" : "");
        sessionStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, isAdmin, setLoggedIn: updateLoggedInState }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
