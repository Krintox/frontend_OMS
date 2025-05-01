// src/components/TodoItem.tsx
import { Todo } from '../interfaces/Todo';
import { FaTrash, FaCheck, FaUndo } from 'react-icons/fa';
import { useState } from 'react';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => Promise<boolean>;
    onDelete: (id: string) => Promise<boolean>;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
    const [isToggling, setIsToggling] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleToggle = async () => {
        setIsToggling(true);
        await onToggle(todo.id!);
        setIsToggling(false);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        await onDelete(todo.id!);
        setIsDeleting(false);
    };

    return (
        <div className={`flex items-center justify-between p-4 mb-2 rounded-lg shadow ${todo.completed ? 'bg-green-50' : 'bg-white'}`}>
            <div className="flex flex-col">
                <span className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {todo.title}
                </span>
                {todo.description && (
                    <span className={`text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                        {todo.description}
                    </span>
                )}
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={handleToggle}
                    disabled={isToggling || isDeleting}
                    className={`p-2 rounded-full ${
                        todo.completed 
                            ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                            : 'bg-green-100 text-green-600 hover:bg-green-200'
                    } ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isToggling ? (
                        <span className="animate-spin">↻</span>
                    ) : todo.completed ? (
                        <FaUndo />
                    ) : (
                        <FaCheck />
                    )}
                </button>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting || isToggling}
                    className={`p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 ${
                        isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isDeleting ? (
                        <span className="animate-spin">↻</span>
                    ) : (
                        <FaTrash />
                    )}
                </button>
            </div>
        </div>
    );
};

export default TodoItem;