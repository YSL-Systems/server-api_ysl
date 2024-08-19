import express from 'express';
import cookieParser from 'cookie-parser';
import rootRouter from './router/index.js';
import { PORT } from './secrets.js';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middlewares/errors.js';

const app = express();
export const prismaClient = new PrismaClient();

app.use(express.json());
app.use(cookieParser());

app.use('/images', express.static('public/'));
app.use('/api', rootRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server Start on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
