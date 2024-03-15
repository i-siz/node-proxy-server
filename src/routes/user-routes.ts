import express from 'express';
import { validator } from '../middlewares/validator-middleware';
const { userApiController, userWebController } = require('../controllers');

const userRouter = express.Router();

// Post user
userRouter.post('/api/user', validator('userRequest', 'body'), userApiController.postUser);
// Display rover photo
userRouter.post('/user', validator('userRequest', 'body'), userWebController.displayRover);

export default userRouter;
