import express from 'express';
import { validator } from '../middlewares/validator-middleware';
import { postUser } from '../controllers/user-api-controller';
import { displayRover, displayUserForm } from '../controllers/user-web-controller';
import { userSchema } from '../validators/request-validators';

const userRouter = express.Router();

// Post user
userRouter.post('/api/user', validator(userSchema, 'body'), postUser);
// Display user form
userRouter.get('/user-form', displayUserForm);
// Display rover photo
userRouter.post('/user', validator(userSchema, 'body'), displayRover);

export default userRouter;
