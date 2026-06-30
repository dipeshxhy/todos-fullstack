import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteTodo, getTodos, updateTodo } from '../services/todoServices';

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const onDeleteTodo = async (id) => {
    const res = await deleteTodo(id);
    setTodos(todos.filter((todo) => todo._id !== id));
    return res;
  };
  const onUpdateTodo = async (id, updatedTodo) => {
    const res = await updateTodo(id, updatedTodo);
    console.log(res, 'response');
    setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    return res;
  };

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const res = await getTodos();
        setTodos(res.data);
      } catch (error) {
        console.log(error);
        toast(error.message || 'Failed to fetch todos', { type: 'error' });
      }
    };
    getAllTodos();
  }, []);

  const value = {
    todos,
    setTodos,
    onDeleteTodo,
    onUpdateTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
export default TodoProvider;
