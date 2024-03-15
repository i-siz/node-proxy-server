import express from 'express';
import { validator } from '../middlewares/validator-middleware';
const { asteroidApiController, asteroidWebController } = require('../controllers');

const meteorRouter = express.Router();

// Get asteroids data
meteorRouter.get('/api/meteors', validator('asteroidRequest', 'query'), asteroidApiController.getAsteroids);
// Display asteroids data
meteorRouter.get('/meteors', validator('asteroidRequest', 'query'), asteroidWebController.displayAsteroids);

export default meteorRouter;
