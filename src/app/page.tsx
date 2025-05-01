'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useTodos } from './hooks/useTodos';
import { useAuth } from './context/AuthContext';
import { Todo } from './interfaces/Todo';

export default function Home() {
    const router = useRouter();
    const { user, loading: authLoading, logout } = useAuth();
    const { todos, loading, error, addTodo, toggleTodo, removeTodo } = useTodos();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleAddTodo = async (todo: Omit<Todo, 'id'>): Promise<boolean> => {
        try {
            const success = await addTodo(todo);
            if (success) {
                toast.success('Todo added successfully!');
            } else {
                toast.error('Failed to add todo');
            }
            return success;
        } catch (err) {
            toast.error('Failed to add todo');
            return false;
        }
    };

    const handleToggleTodo = async (id: string): Promise<boolean> => {
        try {
            const success = await toggleTodo(id);
            if (success) {
                toast.success('Todo updated successfully!');
            } else {
                toast.error('Failed to update todo');
            }
            return success;
        } catch (err) {
            toast.error('Failed to update todo');
            return false;
        }
    };

    const handleDeleteTodo = async (id: string): Promise<boolean> => {
        try {
            const success = await removeTodo(id);
            if (success) {
                toast.success('Todo deleted successfully!');
            } else {
                toast.error('Failed to delete todo');
            }
            return success;
        } catch (err) {
            toast.error('Failed to delete todo');
            return false;
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    if (authLoading || !user) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.name}</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
                
                <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
                    <TodoForm onAdd={handleAddTodo} />
                </div>
                
                <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                            <p className="text-gray-500">Loading todos...</p>
                        </div>
                    ) : (
                        <TodoList 
                            todos={todos} 
                            onToggle={handleToggleTodo} 
                            onDelete={handleDeleteTodo} 
                        />
                    )}
                </div>
            </div>
            <ToastContainer 
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}