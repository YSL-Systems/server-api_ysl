import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rootRouter from './router/index.js';
import { PORT } from './secrets.js';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middlewares/errors.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONT_URL, 'http://localhost:5173'],
  })
);
app.use('/avatars', express.static('public/avatars/'));
app.use('/api', rootRouter);
//{log: ['query']}
export const prismaClient = new PrismaClient();

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
