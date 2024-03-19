import express from 'express';
import { validator } from '../middlewares/validator-middleware';
import { postUser } from '../controllers/user-api-controller';
import { displayRover, displayUserForm } from '../controllers/user-web-controller';

const userRouter = express.Router();

// Post user
userRouter.post('/api/user', validator('userRequest', 'body'), postUser);
// Display user form
userRouter.get('/user-form', displayUserForm);
// Display rover photo
userRouter.post('/user', validator('userRequest', 'body'), displayRover);

export default userRouter;
