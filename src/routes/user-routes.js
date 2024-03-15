const express = require('express');
const { userApiController, userWebController } = require('../controllers');
const { validator } = require('../middlewares');

const router = express.Router();

// Post user
router.post('/api/user', validator('userRequest', 'body'), userApiController.postUser);
// Display rover photo
router.post('/user', validator('userRequest', 'body'), userWebController.displayRover);

module.exports = {
  userRouter: router,
};
