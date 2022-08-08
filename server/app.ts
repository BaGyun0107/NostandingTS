import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
// import swaggerUi from './swagger';
// import specs from './swagger';

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
import mainRouter from './routes/main';
import mypageRouter from './routes/mypage';
import userRouter from './routes/user';
import oauthRouter from './routes/oauth';
// import apiRouter from './routes/api'

// const mainRouter = require('./routes/main');
// const mypageRouter = require('./routes/mypage');
// const userRouter = require('./routes/user');
// const oauthRouter = require('./routes/oauth');
// const apiRouter = require('./routes/api');

// app.use('/', apiRouter);
app.use('/', mainRouter);
app.use('/', userRouter);
app.use('/mypage', mypageRouter);
app.use('/oauth', oauthRouter);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.HTTP_PORT || 4000;

app.listen(PORT, () => console.log('서버 정상 작동'));
