"use client";

import { createContext, useState } from "react";
import { request } from "../services/request";

const defaultProvider = {
  user: null,
  loading: false,
  setUser: () => null,
  setLoading: () => false,
  login: () => Promise.resolve(),
  verifyLogin: () => Promise.resolve(),
  resendLoginOtp: () => Promise.resolve(),
  register: () => Promise.resolve(),
  verifySignup: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (params) => {
    try {
      setLoading(true);

      const response = await request.post("/v2/auth/signin/init", params);
      return response.data.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyLogin = async (params) => {
    try {
      setLoading(true);
      const response = await request.post("/v2/auth/signin/verify", params);
      
      const  user  = response.data.data;
      const { accessToken, refreshToken, } = response.data.data.tokens;

      console.log("Login verify response:", response.data.data);
      
      localStorage.setItem("userToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      
      setUser(user);
      return response.data.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleResendLoginOtp = async (params) => {
    try {
      setLoading(true);

      const response = await request.post("/v2/auth/signin/resend", params);
      return response.data.data;
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
        return response.data.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }   
    };

  const handleVerifySignup = async (params) => {
    try {
      setLoading(true);
        const response = await request.post("/v2/auth/signup/verify", params);
        return response.data.data;
    } catch (error) {
      throw error;
    } finally {     
        setLoading(false);
    }
  };

  const handleResendSignupOtp = async (params) => {
    try {
      setLoading(true);
        const response = await request.post("/v2/auth/signup/resend", params);
        return response.data.data;
    } catch (error) {
      throw error;
    } finally {
        setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  };



  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    verifyLogin: handleVerifyLogin,
    resendLoginOtp: handleResendLoginOtp,
    register: handleRegister,
    verifySignup: handleVerifySignup,
    resendSignupOtp: handleResendSignupOtp,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };