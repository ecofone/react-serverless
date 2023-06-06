import React, { createContext, useContext, useMemo, useState } from "react";
import { FirebaseAuth } from "../handlers/auth";
import { AuthContextType } from "../types";

const { signIn, signOut, getCurrentUser } = FirebaseAuth;

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState(null);

  const value = useMemo(() => {
    const login = () => signIn().then(setCurrentUser);
    const logout = () => signOut().then(() => setCurrentUser(null));
    const authenticate = () => getCurrentUser().then(setCurrentUser);
    return { login, logout, currentUser, authenticate };
  }, [currentUser]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
