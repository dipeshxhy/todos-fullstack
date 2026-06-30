import Todo from '../models/todo.model.js';
import { ApiResponse } from '../utils/api-response.js';

const getAllTodos = async (req, res) => {
  const todos = await Todo.find({ createdBy: req.user._id });
  ApiResponse.success(res, todos, 'Todos fetched successfully');
};

const getTodoById = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    throw new ApiError.notFound('Todo not found');
  }
  ApiResponse.success(res, todo, 'Todo fetched successfully');
};

const createTodo = async (req, res) => {
  const { title, description, isCompleted } = req.body;
  const todo = await Todo.create({
    title,
    description,
    isCompleted,
    createdBy: req.user._id,
  });
  ApiResponse.created(res, todo, `Todo created successfully`);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const todo = await Todo.findByIdAndUpdate(
    id,
    {
      $set: data,
    },
    { new: true, runValidators: true },
  );
  if (!todo) {
    throw new ApiError.notFound('Todo not found');
  }
  ApiResponse.success(res, todo, 'Todo updated successfully');
};

const deleteTodo = async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) {
    throw new ApiError.notFound('Todo not found');
  }
  ApiResponse.success(res, null, 'Todo deleted successfully');
};

export { createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo };
