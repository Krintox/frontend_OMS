import { useEffect, useState } from 'react';
import { Todo } from '../interfaces/Todo';
import { 
    getOrders, 
    createOrder, 
    updateOrder, 
    deleteOrder,
    acceptOrder,
    getOrdersByRegion,
    getOrdersByStatus
} from '../services/api';

interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
    message?: string;
}

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleError = (err: unknown): string => {
        const error = err as ApiError;
        return error.response?.data?.message || error.message || 'An unknown error occurred';
    };

    const fetchTodos = async (): Promise<boolean> => {
        try {
            setLoading(true);
            const response = await getOrders();
            setTodos(response.data);
            return true;
        } catch (err) {
            setError(handleError(err));
            return false;
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (todo: Omit<Todo, 'id'>): Promise<boolean> => {
        try {
            const response = await createOrder(todo);
            setTodos([...todos, response.data]);
            return true;
        } catch (err) {
            setError(handleError(err));
            return false;
        }
    };

    const toggleTodo = async (id: string, status: string): Promise<boolean> => {
        try {
            const response = await updateOrder(id, { status });
            setTodos(todos.map(todo => todo.id === id ? response.data : todo));
            return true;
        } catch (err) {
            setError(handleError(err));
            return false;
        }
    };

    const removeTodo = async (id: string): Promise<boolean> => {
        try {
            await deleteOrder(id);
            setTodos(todos.filter(todo => todo.id !== id));
            return true;
        } catch (err) {
            setError(handleError(err));
            return false;
        }
    };

    const handleAcceptOrder = async (id: string): Promise<boolean> => {
        try {
            const response = await acceptOrder(id);
            setTodos(todos.map(todo => todo.id === id ? response.data : todo));
            return true;
        } catch (err) {
            setError(handleError(err));
            return false;
        }
    };

    const fetchByRegion = async (region: string): Promise<boolean> => {
        try {
            setLoading(true);
            const response = await getOrdersByRegion(region);
            setTodos(response.data);
            return true;
        } catch (err) {
            setError(handleError(err));
            return false;
        } finally {
            setLoading(false);
        }
    };

    const fetchByStatus = async (status: string): Promise<boolean> => {
        try {
            setLoading(true);
            const response = await getOrdersByStatus(status);
            setTodos(response.data);
            return true;
        } catch (err) {
            setError(handleError(err));
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return { 
        todos, 
        loading, 
        error, 
        addTodo, 
        toggleTodo, 
        removeTodo,
        handleAcceptOrder,
        fetchByRegion,
        fetchByStatus,
        fetchTodos 
    };
};