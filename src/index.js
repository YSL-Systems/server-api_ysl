import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rootRouter from './router/index.js';
import { PORT } from './secrets.js';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middlewares/errors.js';

const app = express();
export const prismaClient = new PrismaClient();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONT_URL, 'http://localhost:5173'],
  })
);

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
