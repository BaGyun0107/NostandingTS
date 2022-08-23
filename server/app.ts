import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';

const { swaggerUi, specs } = require('./swagger');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://www.semicolon-nostanding.com',
      'http://www.semicolon-nostanding.com',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
  }),
);

// routers
const mainRouter = require('./routes/main');
const mypageRouter = require('./routes/mypage');
const userRouter = require('./routes/user');
const oauthRouter = require('./routes/oauth');
const apiRouter = require('./routes/api');

app.use('/', apiRouter);
app.use('/', mainRouter);
app.use('/', userRouter);
app.use('/mypage', mypageRouter);
app.use('/oauth', oauthRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//? next()를 활용하여 에러핸들링을 간편하게 할 수 있다.
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStatus: number = err['status'] || 500;
  const errorMessage: string = err.message || 'Somthing went wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.HTTP_PORT || 4000;

app.listen(PORT, () => console.log('서버 정상 작동'));
