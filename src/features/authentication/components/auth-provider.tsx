import { createContext, ReactNode, useState, useContext } from 'react';
import { Auth } from '../models/auth'

export interface AuthContextType {
  loginData: Auth | null;
  login: (data: Auth) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loginData, setLoginData] = useState<Auth | null>(null);

  const login = (loginData: Auth) => setLoginData(loginData);

  const logout = () => setLoginData(null);

  return (
    <AuthContext.Provider value={{ loginData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context; // TypeScript now guarantees this is defined!
}