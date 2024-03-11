const express = require('express');
const meteorsRouter = require('./routes/meteors.js');
require('dotenv').config();

const app = express();

const { PORT } = process.env;

app.listen(PORT, (error) => {
    error ? console.log(error.message) : console.log(`The server is running on port ${PORT}`);
});

app.use('/meteors', meteorsRouter);