import express from 'express';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import errorHandler from './middlewares/error.middleware.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req, res, next): void => next(JSON.stringify({ status: 'OK' })));

app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;