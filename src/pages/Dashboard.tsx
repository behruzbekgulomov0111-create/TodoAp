import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { TodoList } from '../components/TodoList';
import { Statistics } from '../components/Statistics';
import { TodoModal } from '../components/TodoModal';
import { apiService } from '../services/api';
import { Plus, Loader2 } from 'lucide-react';
import type { Todo, TodoStatistics } from '../types';

export const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statistics, setStatistics] = useState<TodoStatistics | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const [todosData, statsData] = await Promise.all([
        apiService.getTodos(),
        apiService.getStatistics(),
      ]);
      setTodos(todosData);
      setStatistics(statsData);
    } catch (err: any) {
      setError('Failed to load data. Please try again.');
      console.error('Load data error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (activeFilter === 'completed') return todo.completed;
    if (activeFilter === 'pending') return !todo.completed;
    return true;
  });

  const handleAddTodo = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await apiService.deleteTodo(id);
      await loadData();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    try {
      await apiService.updateTodo(todo.id, { completed: !todo.completed });
      await loadData();
    } catch (err) {
      console.error('Toggle error:', err);
    }
  };

  const handleSaveTodo = async () => {
    await loadData();
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            {statistics && <Statistics statistics={statistics} />}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeFilter === 'all' && 'All Tasks'}
                  {activeFilter === 'completed' && 'Completed Tasks'}
                  {activeFilter === 'pending' && 'Pending Tasks'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredTodos.length} {filteredTodos.length === 1 ? 'task' : 'tasks'}
                </p>
              </div>
              <button
                onClick={handleAddTodo}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Add Task
              </button>
            </div>

            <TodoList
              todos={filteredTodos}
              onToggle={handleToggleTodo}
              onEdit={handleEditTodo}
              onDelete={handleDeleteTodo}
            />
          </div>
        </main>
      </div>

      {isModalOpen && (
        <TodoModal
          todo={editingTodo}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTodo}
        />
      )}
    </div>
  );
};
