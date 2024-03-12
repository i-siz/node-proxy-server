const express = require('express');
const { port } = require('./config');
const { meteorRouter, userRouter } = require('./routes');

const app = express();

app.listen(port, (error) => {
    error ? console.log(error.message) : console.log(`The server is running on port ${port}`);
});

app.use('/meteors', meteorRouter);
app.use('/user', userRouter);