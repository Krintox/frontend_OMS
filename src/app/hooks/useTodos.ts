// src/hooks/useTodos.ts
import { useEffect, useState } from 'react';
import { Todo } from '../interfaces/Todo';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/api';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTodos = async (): Promise<boolean> => {
        try {
            setLoading(true);
            const response = await getTodos();
            setTodos(response.data);
            return true;
        } catch (err) {
            setError('Failed to fetch todos');
            console.error(err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (todo: Omit<Todo, 'id'>): Promise<boolean> => {
        try {
            const response = await createTodo(todo);
            setTodos([...todos, response.data]);
            return true;
        } catch (err) {
            setError('Failed to add todo');
            console.error(err);
            return false;
        }
    };

    const toggleTodo = async (id: string): Promise<boolean> => {
        try {
            const todoToUpdate = todos.find(todo => todo.id === id);
            if (todoToUpdate) {
                const updatedTodo = await updateTodo(id, {
                    ...todoToUpdate,
                    completed: !todoToUpdate.completed
                });
                setTodos(todos.map(todo => todo.id === id ? updatedTodo.data : todo));
                return true;
            }
            return false;
        } catch (err) {
            setError('Failed to update todo');
            console.error(err);
            return false;
        }
    };

    const removeTodo = async (id: string): Promise<boolean> => {
        try {
            await deleteTodo(id);
            setTodos(todos.filter(todo => todo.id !== id));
            return true;
        } catch (err) {
            setError('Failed to delete todo');
            console.error(err);
            return false;
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
        fetchTodos 
    };
};