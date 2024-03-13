const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

// Post user
router.post('/', userController.postUser);

module.exports = {
    userRouter: router,
};