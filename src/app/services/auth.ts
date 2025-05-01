import axios from 'axios';
import { User } from '../interfaces/User';

const API_URL = 'http://localhost:8080/api/auth';

export const register = async (email: string, password: string, name: string): Promise<User> => {
    const response = await axios.post(`${API_URL}/register`, { email, password, name });
    return response.data;
};

export const login = async (email: string, password: string): Promise<User> => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

export const getCurrentUser = (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const logout = (): void => {
    localStorage.removeItem('user');
};