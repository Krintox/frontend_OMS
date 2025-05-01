import axios from 'axios';
import { User } from '../interfaces/User';

const API_URL = 'http://localhost:8080/api/auth';

interface RegisterData {
    email: string;
    password: string;
    name: string;
    role?: string;
    region?: string;
}

export const register = async (data: RegisterData): Promise<User> => {
    const response = await axios.post(`${API_URL}/register`, data);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
};

export const login = async (email: string, password: string): Promise<User> => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
};

export const getCurrentUser = (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const logout = (): void => {
    localStorage.removeItem('user');
};