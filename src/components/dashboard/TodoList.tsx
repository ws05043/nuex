import React, { useState } from 'react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  project?: string;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1',
      title: 'Floor Plan Review',
      completed: false,
      priority: 'high',
      project: 'Modern Loft Renovation'
    },
    {
      id: '2',
      title: 'Kitchen Layout',
      completed: false,
      priority: 'medium',
      project: 'Minimalist Studio Design'
    }
  ]);

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Tasks</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          View All →
        </button>
      </div>

      <div className="space-y-2">
        {todos.map(todo => (
          <div
            key={todo.id}
            className="flex items-center p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <div className="ml-3 flex-1">
              <div className={`text-sm ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                {todo.title}
              </div>
              <div className="text-xs text-gray-500">{todo.project}</div>
            </div>
            <div className={`
              px-2 py-1 rounded-full text-xs
              ${todo.priority === 'high' ? 'bg-red-100 text-red-700' : 
                todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'}
            `}>
              {todo.priority}
            </div>
          </div>
        ))}
      </div>

      <button
        className="mt-3 w-full p-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        + Add Task
      </button>
    </div>
  );
};

export default TodoList; 