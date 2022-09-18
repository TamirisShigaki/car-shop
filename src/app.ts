import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/errorMiddleware';

const app = express();

app.use(errorHandler);

export default app;
