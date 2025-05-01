import axios, { AxiosResponse } from 'axios';
import { getCurrentUser } from './auth';
import { Todo } from '../interfaces/Todo';

interface ApiResponse<T> {
    data: T;
}

const api = axios.create({
    baseURL: 'https://sure-ariel-krintox-cc074f1e.koyeb.app/api',
});

api.interceptors.request.use((config) => {
    const user = getCurrentUser();
    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

// Order endpoints
export const getOrders = (): Promise<AxiosResponse<Todo[]>> => api.get('/todos');
export const getOrderById = (id: string): Promise<AxiosResponse<Todo>> => api.get(`/todos/${id}`);
export const createOrder = (order: Omit<Todo, 'id'>): Promise<AxiosResponse<Todo>> => api.post('/todos', order);
export const updateOrder = (id: string, order: Partial<Todo>): Promise<AxiosResponse<Todo>> => api.put(`/todos/${id}`, order);
export const deleteOrder = (id: string): Promise<AxiosResponse<void>> => api.delete(`/todos/${id}`);
export const acceptOrder = (id: string): Promise<AxiosResponse<Todo>> => api.post(`/todos/${id}/accept`, {});
export const getOrdersByRegion = (region: string): Promise<AxiosResponse<Todo[]>> => api.get(`/todos/region/${region}`);
export const getOrdersByStatus = (status: string): Promise<AxiosResponse<Todo[]>> => api.get(`/todos/status/${status}`);

export default api;