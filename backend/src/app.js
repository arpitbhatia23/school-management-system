import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import status from 'express-status-monitor';
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(status());

// routers

import userRouter from './router/user.routes.js';
import adminRouter  from './router/admin.router.js';

app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin', adminRouter);

export default app;
