import React, {createContext, useContext, useState} from "react";
import axios from "axios";

type UserType = {
    email: string;
    password: string;
}

type AuthContextType = {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    login: (userData: UserType) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


// Create the Provider component
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<AuthContextType | null>(null);

    const login = async (userData: UserType) => {
        //@ts-ignore
        let response = await axios({
            method: 'post',
            url: 'http://localhost:8080/api/auth/authenticate',
            data: userData,
            withCredentials: false,
        });

        if(response) {
            localStorage.setItem('token', response.data.jwt);
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }

    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setLoggedIn(false);
    }


    // @ts-ignore
    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };
