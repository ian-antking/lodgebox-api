const express = require('express');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const studentRouter = require('./routes/student');

const app = express();

app.use(express.json());
app.set('trust proxy', true);

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/student', studentRouter);

module.exports = app;
