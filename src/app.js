import cors from 'cors';
import express from 'express';
import { errorHandler } from './middlewares/error-handler.js';
import authRouter from './routes/auth.route.js';
import { ApiError } from './utils/api-error.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// apis
app.use('/api/v1/auth', authRouter);

app.all('/*splat', (req, res) => {
  throw ApiError.notFound(`Can't find ${req.originalUrl} on this server!`);
});

app.use(errorHandler);

export default app;
