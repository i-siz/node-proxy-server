import express from 'express';
import { validator } from '../middlewares/validator-middleware';
const { asteroidController } = require('../controllers');

const meteorRouter = express.Router();

// Get asteroids data
meteorRouter.get('/', validator('asteroidRequest', 'query'), asteroidController.getAsteroids);

export default meteorRouter;
