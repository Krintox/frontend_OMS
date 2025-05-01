import axios from 'axios';
import { User } from '../interfaces/User';

const API_URL = 'https://sure-ariel-krintox-cc074f1e.koyeb.app/api/auth';

interface RegisterData {
    email: string;
    password: string;
    name: string;
    role?: string;
    region?: string;
}

export const register = async (data: RegisterData): Promise<User> => {
    const response = await axios.post(`${API_URL}/register`, data);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const login = async (email: string, password: string): Promise<User> => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const getCurrentUser = (): User | null => {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
    return null;
};

export const logout = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
    }
};