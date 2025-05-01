import axios from 'axios';
import { getCurrentUser } from './auth';
import { Todo } from '../interfaces/Todo';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
    const user = getCurrentUser();
    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

// Order endpoints
export const getOrders = () => api.get('/todos');
export const getOrderById = (id: string) => api.get(`/todos/${id}`);
export const createOrder = (order: Omit<Todo, 'id'>) => api.post('/todos', order);
export const updateOrder = (id: string, order: Partial<Todo>) => api.put(`/todos/${id}`, order);
export const deleteOrder = (id: string) => api.delete(`/todos/${id}`);
export const acceptOrder = (id: string) => api.post(`/todos/${id}/accept`, {});
export const getOrdersByRegion = (region: string) => api.get(`/todos/region/${region}`);
export const getOrdersByStatus = (status: string) => api.get(`/todos/status/${status}`);

export default api;