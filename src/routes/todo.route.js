import { Router } from 'express';
import * as todoController from '../controllers/todo.controller.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';

import { validator } from '../middlewares/validator.js';
import * as validate from '../validators/validate.js';

const todoRouter = Router();

todoRouter
  .route('/')
  .post(
    authMiddleware.authenticate,
    validator(validate.createTodoInputSchema),
    todoController.createTodo,
  )
  .get(authMiddleware.authenticate, todoController.getAllTodos);

todoRouter
  .route('/:id')
  .get(authMiddleware.authenticate, todoController.getTodoById)
  .patch(
    authMiddleware.authenticate,
    validator(validate.updateTodoInputSchema),
    todoController.updateTodo,
  )
  .delete(authMiddleware.authenticate, todoController.deleteTodo);

export default todoRouter;
