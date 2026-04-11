// Contexto de autenticacao com Firebase

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { auth } from '../config/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  cadastrar: (email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
  getRm: () => string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  cadastrar: async () => {},
  logout: async () => {},
  getRm: () => null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, senha: string) => {
    await signInWithEmailAndPassword(auth, email, senha);
  };

  const cadastrar = async (email: string, senha: string) => {
    await createUserWithEmailAndPassword(auth, email, senha);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const getRm = (): string | null => {
    if (!user?.email) return null;
    const match = user.email.match(/^(rm\d+)/i);
    return match ? match[1].toUpperCase() : null;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, cadastrar, logout, getRm }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);