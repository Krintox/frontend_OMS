'use client';

import { useEffect, useState } from 'react';
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
    const { 
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
    } = useTodos();

    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

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
                toast.success('Order created successfully!');
                fetchTodos();
            }
            return success;
        } catch (err) {
            toast.error('Failed to create order');
            return false;
        }
    };

    const handleToggleTodo = async (id: string, status: string): Promise<boolean> => {
        try {
            const success = await toggleTodo(id, status);
            if (success) {
                toast.success(`Order status updated to ${status}`);
            }
            return success;
        } catch (err) {
            toast.error('Failed to update order status');
            return false;
        }
    };

    const handleDeleteTodo = async (id: string): Promise<boolean> => {
        try {
            const success = await removeTodo(id);
            if (success) {
                toast.success('Order deleted successfully!');
            }
            return success;
        } catch (err) {
            toast.error('Failed to delete order');
            return false;
        }
    };

    const acceptOrderHandler = async (id: string): Promise<boolean> => {
        try {
            const success = await handleAcceptOrder(id); // This now correctly refers to the hook's function
            if (success) {
                toast.success('Order accepted successfully!');
            }
            return success;
        } catch (err) {
            toast.error('Failed to accept order');
            return false;
        }
    };
    

    const handleRegionFilter = async (region: string) => {
        setSelectedRegion(region);
        setSelectedStatus('');
        if (region) {
            await fetchByRegion(region);
        } else {
            await fetchTodos();
        }
    };

    const handleStatusFilter = async (status: string) => {
        setSelectedStatus(status);
        setSelectedRegion('');
        if (status) {
            await fetchByStatus(status);
        } else {
            await fetchTodos();
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

    const isAdmin = user.role === 'ADMIN';
    const regions = ['NORTH', 'SOUTH', 'EAST', 'WEST', 'CENTRAL'];
    const statuses = ['AVAILABLE', 'ACCEPTED', 'PREPARING', 'PRINTED', 'PACKING', 'SHIPPED', 'DELIVERED'];

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.name}</h1>
                        <p className="text-sm text-gray-600">{user.role} {user.region && `- ${user.region}`}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
                
                {isAdmin && (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
                        <TodoForm onAdd={handleAddTodo} isAdmin={isAdmin} />
                    </div>
                )}
                
                <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-4">
                    <div className="flex flex-wrap gap-4 mb-6">
                        {isAdmin && (
                            <select
                                value={selectedRegion}
                                onChange={(e) => handleRegionFilter(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">All Regions</option>
                                {regions.map(region => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                        )}
                        
                        <select
                            value={selectedStatus}
                            onChange={(e) => handleStatusFilter(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Statuses</option>
                            {statuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                        
                        <button
                            onClick={() => {
                                setSelectedRegion('');
                                setSelectedStatus('');
                                fetchTodos();
                            }}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                        >
                            Clear Filters
                        </button>
                    </div>
                    
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                            <p className="text-gray-500">Loading orders...</p>
                        </div>
                    ) : (
                        <TodoList 
                            todos={todos} 
                            onToggle={handleToggleTodo} 
                            onDelete={handleDeleteTodo}
                            onAccept={!isAdmin ? acceptOrderHandler : undefined}
                            currentUserId={user.id}
                            isAdmin={isAdmin}
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