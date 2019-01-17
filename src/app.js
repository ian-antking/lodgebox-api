const express = require('express');
const userRouter = require('./routes/user');

const app = express();

app.use(express.json());

app.use('/user', userRouter);

module.exports = app;
