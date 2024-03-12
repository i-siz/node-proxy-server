const express = require('express');
const { PORT } = require('./config/environment');
const { meteorRouter, userRouter } = require('./routes');

const app = express();

app.listen(PORT, (error) => {
    error ? console.log(error.message) : console.log(`The server is running on port ${PORT}`);
app.listen(PORT, (error) => {
    error ? console.log(error.message) : console.log(`The server is running on port ${PORT}`);
});

app.use('/meteors', meteorRouter);
app.use('/user', userRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    if (!err.statusCode) {
        res.status(500).json({
            message: err.message,
        });
    }

    res.status(err.statusCode).json({
        message: err.message,
    });
});

app.use('*', (req, res) =>
    res.status(404).json({ message: 'Page not found' }),
);