const express = require('express');
const { PORT } = require('./config/environment');
const { meteorRouter, userRouter } = require('./routes');

const app = express();

app.listen(PORT, (error) => {
    error ? console.log(error.message) : console.log(`The server is running on port ${PORT}`);
});

app.use('/meteors', meteorRouter);
app.use('/user', userRouter);