import express from 'express';
import { validator } from '../middlewares/validator-middleware';
const { userController } = require('../controllers');

const userRouter = express.Router();

// Post user
userRouter.post('/', validator('userRequest', 'body'), userController.postUser);

export default userRouter;
