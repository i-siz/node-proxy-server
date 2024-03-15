import express from 'express';
import { validator } from '../middlewares/validator-middleware';
import { getAsteroids } from '../controllers/asteroid-api-controller';
import { displayAsteroids } from '../controllers/asteroid-web-controller';

const meteorRouter = express.Router();

// Get asteroids data
meteorRouter.get('/api/meteors', validator('asteroidRequest', 'query'), getAsteroids);
// Display asteroids data
meteorRouter.get('/meteors', validator('asteroidRequest', 'query'), displayAsteroids);

export default meteorRouter;
