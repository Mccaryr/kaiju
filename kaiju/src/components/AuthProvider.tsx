import React, {createContext, useContext, useState} from "react";
import axios from "axios";
import CONFIG from "../config.ts";


type UserType = {
    email: string;
    password: string;
}

type AuthContextType = {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    login: (userData: UserType) => void;
    logout: () => void;
    createAccount: (userData: UserType) => void;
}

const isLocal = window.location.hostname === "localhost";

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
    const [, setUser] = useState<AuthContextType | null>(null);

    const login = async (userData: UserType) => {
        //@ts-ignore
        let response = await axios({
            method: 'post',
            url: isLocal ? `${CONFIG.LOCAL_BACKEND_URL}/auth/authenticate` : `${CONFIG.PROD_BACKEND_URL}/auth/authenticate`,
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

    const createAccount = async (userData: UserType) => {
        let response = await axios({
            method: 'post',
            url: isLocal ? `${CONFIG.LOCAL_BACKEND_URL}/auth/signup` : `${CONFIG.PROD_BACKEND_URL}/auth/signup`,
            data: {userName: userData.email, password: userData.password}
        })

        if(response.status === 200) {
            localStorage.setItem('token', response.data.jwt);
            setLoggedIn(true);
        } else {
            console.log("Account Creation failed")
        }
    }


    // @ts-ignore
    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, login, logout, createAccount }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };
