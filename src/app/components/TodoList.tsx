// src/components/TodoList.tsx
import TodoItem from './TodoItem';
import { Todo } from '../interfaces/Todo';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => Promise<boolean>;
    onDelete: (id: string) => Promise<boolean>;
}

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
    if (todos.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No todos found. Add one to get started!</p>
            </div>
        );
    }

    return (
        <div>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TodoList;