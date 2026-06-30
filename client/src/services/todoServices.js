import axiosInstance from '../utils/axios.js';

const createTodo = async (todoData) => {
  const { data } = await axiosInstance.post('/todos', todoData);
  return data;
};

const getTodos = async () => {
  const { data } = await axiosInstance.get('/todos');
  return data;
};

const getTodoById = async (id) => {
  const { data } = await axiosInstance.get(`/todos/${id}`);
  return data;
};

const updateTodo = async (id, todoData) => {
  const { data } = await axiosInstance.patch(`/todos/${id}`, todoData);
  return data;
};

const deleteTodo = async (id) => {
  const { data } = await axiosInstance.delete(`/todos/${id}`);
  return data;
};

export { createTodo, getTodos, getTodoById, updateTodo, deleteTodo };
