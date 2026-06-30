import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { errorHandler } from './middlewares/error-handler.js';
import { ApiError } from './utils/api-error.js';

import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import authRouter from './routes/auth.route.js';
import todoRouter from './routes/todo.route.js';

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.set('trust proxy', 1);

// helmet
app.use(helmet());
// express rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again after 15 minutes.',
  },
});

app.use(limiter);
if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
  );
}
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/todos', todoRouter);

// Unknown API routes
app.all('/api/{*splat}', (req, res) => {
  throw ApiError.notFound(`Can't find ${req.originalUrl} on this server!`);
});

// Static files
app.use(express.static(distPath));

// React routes
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Error handler
app.use(errorHandler);

export default app;
