const express = require('express');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const studentRouter = require('./routes/student');
const worksheetRouter = require('./routes/worksheet');

const app = express();

app.use(express.json({
  limit: '10mb',
}));
app.set('trust proxy', true);

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/student', studentRouter);
app.use('/worksheet', worksheetRouter);

module.exports = app;
