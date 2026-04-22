'use client';
import { createContext, useState } from "react";
import { request } from "../services/request";


const defaultProvider = {
    user: null,
    loading: false,
    setUser: () => null,
    setLoading: () => Boolean,
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    logout: () => Promise.resolve(),
}


const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(defaultProvider.user);
    const [loading, setLoading] = useState(defaultProvider.loading);

    const handleLogin = async (params) => {
    try {
        setLoading(true);

        const response = await request.post("/v2/auth/signin/init", params);

        const { accessToken, refreshToken, user } = response.data;

        localStorage.setItem("userToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        setUser(user);

        return user; 
    } catch (error) {
        throw error; 
    } finally {
        setLoading(false);
    }
    };
    
    const handleRegister = async (params) => {
    try {
        setLoading(true);

        const response = await request.post("/v2/auth/signup/init", params);

        const { accessToken, refreshToken, user } = response.data;

        localStorage.setItem("userToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        setUser(user);

        return user;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
    };

    const values = {
        user,
        loading,
        login: handleLogin,
        register: handleRegister,
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
