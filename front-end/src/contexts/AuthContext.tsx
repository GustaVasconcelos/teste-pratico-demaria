import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import useBaseService from '../hooks/useBaseService';
import { entities } from '../constants/entities';

interface User {
    id: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
    error: string | null;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { post: userLogout } = useBaseService();

    const loadUserFromLocalStorage = () => {
        const token = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
        
        if (token && storedUser) {
            try {
                const decodedToken = jwtDecode<{ exp: number }>(token);

                if (decodedToken.exp * 1000 < Date.now()) {
                    throw new Error('Token expirado');
                } else {
                    setIsAuthenticated(true);
                    setUser(storedUser);
                }
            } catch (error) {
                handleLogout();
                setError('Sua sessão expirou ou o token é inválido.');
                navigate('/login', { state: { message: 'Sua sessão expirou. Por favor, faça login novamente.' } });
            }
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUserFromLocalStorage();
        setLoading(false); 
    }, [navigate]);

    const login = (token: string) => {
        try {
            const decoded = jwtDecode<{ user_id: string }>(token);
            const userData: User = { id: decoded.user_id };

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            setIsAuthenticated(true);
            setUser(userData);
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            setError('Ocorreu um erro ao tentar fazer login.');
        }
    };

    const logout = async () => {
        try {
            await userLogout(entities.auth.logout.create(''), {}); 
        } catch (error) {
            console.error('Erro ao desconectar do servidor:', error);
            setError('Erro ao desconectar do servidor.');
        } finally {
            handleLogout();
            navigate('/login');
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        setUser(null);
    };

    if (loading) {
        return (
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress />
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};
