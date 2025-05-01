import TodoItem from './TodoItem';
import { Todo } from '../interfaces/Todo';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string, status: string) => Promise<boolean>;
    onDelete: (id: string) => Promise<boolean>;
    onAccept?: (id: string) => Promise<boolean>;
    currentUserId?: string;
    isAdmin?: boolean;
}

const TodoList = ({ todos, onToggle, onDelete, onAccept, currentUserId, isAdmin }: TodoListProps) => {
    if (todos.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No orders found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onAccept={onAccept}
                    currentUserId={currentUserId}
                    isAdmin={isAdmin}
                />
            ))}
        </div>
    );
};

export default TodoList;