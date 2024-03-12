const express = require('express');
const { server } = require('./config/environment');
const { meteorRouter, userRouter } = require('./routes');
const { exceptionFilter, pageNotFoundHandler } = require('./middleware');

const { port } = server;

const app = express();

app.listen(port, (error) => {
    error ? console.log(error.message) : console.log(`The server is running on port ${port}`);
});

app.use('/meteors', meteorRouter);
app.use('/user', userRouter);

app.use(exceptionFilter);

app.use('*', pageNotFoundHandler);