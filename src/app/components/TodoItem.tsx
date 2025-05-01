import { Todo } from '../interfaces/Todo';
import { FaTrash, FaCheck, FaTruck, FaBoxOpen, FaPrint } from 'react-icons/fa';
import { useState } from 'react';

const statusOptions = [
    { value: 'ACCEPTED', label: 'Accept', icon: <FaCheck />, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'PREPARING', label: 'Preparing', icon: <FaBoxOpen />, color: 'bg-blue-100 text-blue-800' },
    { value: 'PRINTED', label: 'Printed', icon: <FaPrint />, color: 'bg-purple-100 text-purple-800' },
    { value: 'PACKING', label: 'Packing', icon: <FaBoxOpen />, color: 'bg-indigo-100 text-indigo-800' },
    { value: 'SHIPPED', label: 'Shipped', icon: <FaTruck />, color: 'bg-green-100 text-green-800' },
    { value: 'DELIVERED', label: 'Delivered', icon: <FaCheck />, color: 'bg-green-500 text-white' },
];

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string, status: string) => Promise<boolean>;
    onDelete: (id: string) => Promise<boolean>;
    onAccept?: (id: string) => Promise<boolean>;
    currentUserId?: string;
    isAdmin?: boolean;
}

const TodoItem = ({ todo, onToggle, onDelete, onAccept, isAdmin }: TodoItemProps) => {
    const [isToggling, setIsToggling] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isAccepting, setIsAccepting] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");

    const handleStatusChange = async (status: string) => {
        setIsToggling(true);
        try {
            await onToggle(todo.id!, status);
        } finally {
            setIsToggling(false);
        }
        window.location.reload();
    };

    const handleAccept = async () => {
        if (!onAccept) return;
        setIsAccepting(true);
        try {
            await onAccept(todo.id!);
        } finally {
            setIsAccepting(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete(todo.id!);
        } finally {
            setIsDeleting(false);
        }
    };

    const canAccept = todo.status === 'AVAILABLE' && !isAdmin && onAccept;
    // const canUpdate = todo.userId === currentUserId;
    console.log(todo.userId);
    const canDelete = isAdmin;

    // Filter available status options based on current status
    const availableStatusOptions = statusOptions.filter(option => {
        if (todo.status === 'ACCEPTED') return option.value === 'PREPARING';
        if (todo.status === 'PREPARING') return option.value === 'PRINTED';
        if (todo.status === 'PRINTED') return option.value === 'PACKING';
        if (todo.status === 'PACKING') return option.value === 'SHIPPED';
        if (todo.status === 'SHIPPED') return option.value === 'DELIVERED';
        return false;
    });

    return (
        <div className={`flex flex-col p-4 mb-2 rounded-lg shadow ${todo.completed ? 'bg-green-50' : 'bg-white'}`}>
            <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col">
                    <span className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {todo.title}
                    </span>
                    {todo.description && (
                        <span className={`text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                            {todo.description}
                        </span>
                    )}
                    <div className="flex items-center mt-1">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                            {todo.region}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                            todo.status === 'DELIVERED' ? 'bg-green-500 text-white' :
                            todo.status === 'SHIPPED' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                        }`}>
                            {todo.status}
                        </span>
                    </div>
                </div>
                
                <div className="flex space-x-2">
                    {canAccept && (
                        <button
                            onClick={handleAccept}
                            disabled={isAccepting}
                            className={`p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 ${
                                isAccepting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            title="Accept Order"
                        >
                            {isAccepting ? (
                                <span className="animate-spin">↻</span>
                            ) : (
                                <FaCheck />
                            )}
                        </button>
                    )}
                    
                    {canDelete && (
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className={`p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 ${
                                isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            title="Delete Order"
                        >
                            {isDeleting ? (
                                <span className="animate-spin">↻</span>
                            ) : (
                                <FaTrash />
                            )}
                        </button>
                    )}
                </div>
            </div>
            
            {/* {canUpdate && ( */}
            <div className="mt-3">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Update Status:
                </label>
                <div className="flex space-x-2">
                    <select
                        id="status"
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        disabled={isToggling}
                        className="p-2 border rounded-md text-sm w-full bg-white focus:ring-2 focus:ring-blue-500"
                        value={selectedStatus}
                    >
                        <option value="" disabled>Select next status</option>
                        {availableStatusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => selectedStatus && handleStatusChange(selectedStatus)}
                        disabled={isToggling || !selectedStatus}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        Submit
                    </button>
                </div>
            </div>
            {/* )} */}

        </div>
    );

};

export default TodoItem;