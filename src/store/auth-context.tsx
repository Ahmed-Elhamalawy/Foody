import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextProps {
  isLoggedIn: boolean;
  token: string | null;
  email: string | null;
  login: (token: string, email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  email: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true);
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    const loadEmail = async () => {
      const storedEmail = await AsyncStorage.getItem("email");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    };
    loadEmail();
  }, []);

  const login = async (token: string, email: string) => {
    await AsyncStorage.setItem("authToken", token);
    await AsyncStorage.setItem("email", email);

    setToken(token);
    setEmail(email);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("email");
    setToken(null);
    setEmail(null);
    setIsLoggedIn(false);
  };

  const value: AuthContextProps = {
    isLoggedIn,
    token,
    login,
    logout,
    email,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
