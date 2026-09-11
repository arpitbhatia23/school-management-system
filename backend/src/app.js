import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import status from 'express-status-monitor';
import helmet from 'helmet';
const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(status());
app.use((req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;

        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });

    next();
});

// routers

import userRouter from './router/user.routes.js';
import adminRouter from './router/admin.routes.js';
import teacherRouter from './router/teacher.routes.js';
import studentRouter from './router/student.routes.js';
app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/teacher', teacherRouter);
app.use('/api/v1/student', studentRouter);
export default app;
