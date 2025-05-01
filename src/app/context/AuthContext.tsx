'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { User } from '../interfaces/User';
import { getCurrentUser, login as authLogin, register as authRegister, logout as authLogout } from '../services/auth';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = getCurrentUser();
        setUser(user);
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        const user = await authLogin(email, password);
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const register = async (email: string, password: string, name: string) => {
        const user = await authRegister(email, password, name);
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        authLogout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};