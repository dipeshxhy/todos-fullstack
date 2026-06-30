import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';
import { validator } from '../middlewares/validator.js';
import * as validate from '../validators/validate.js';

const authRouter = Router();

authRouter
  .route('/register')
  .post(validator(validate.registerUserInputSchema), authController.register);

authRouter.route('/me').get(authMiddleware.authenticate, authController.getCurrentUser);

authRouter.route('/login').post(validator(validate.loginUserInputSchema), authController.login);
authRouter.route('/logout').post(authMiddleware.authenticate, authController.logout);

export default authRouter;
