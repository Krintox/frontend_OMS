// src/components/TodoForm.tsx
import { useState } from 'react';
import { Todo } from '../interfaces/Todo';

interface TodoFormProps {
    onAdd: (todo: Omit<Todo, 'id'>) => Promise<boolean>;
}

const TodoForm = ({ onAdd }: TodoFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || isSubmitting) return;
        
        setIsSubmitting(true);
        const success = await onAdd({
            title,
            description,
            completed: false
        });
        
        if (success) {
            setTitle('');
            setDescription('');
        }
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title*
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled={isSubmitting}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    disabled={isSubmitting}
                />
            </div>
            <button
                type="submit"
                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Adding...' : 'Add Todo'}
            </button>
        </form>
    );
};

export default TodoForm;