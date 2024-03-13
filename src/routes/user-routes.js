const express = require('express');
const { userController } = require('../controllers');
const { validator } = require('../middlewares');

const router = express.Router();

// Post user
router.post('/', validator('userRequest'), userController.postUser);

module.exports = {
    userRouter: router,
};