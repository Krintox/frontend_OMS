import axios from 'axios';
import { getCurrentUser } from './auth';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Add request interceptor to include token
api.interceptors.request.use((config) => {
    const user = getCurrentUser();
    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

export const getTodos = () => api.get('/todos');
export const getTodoById = (id: string) => api.get(`/todos/${id}`);
export const createTodo = (todo: any) => api.post('/todos', todo);
export const updateTodo = (id: string, todo: any) => api.put(`/todos/${id}`, todo);
export const deleteTodo = (id: string) => api.delete(`/todos/${id}`);

export default api;