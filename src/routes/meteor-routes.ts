import express from 'express';
import { validator } from '../middlewares/validator-middleware';
import { getAsteroids } from '../controllers/asteroid-api-controller';
import { displayAsteroids } from '../controllers/asteroid-web-controller';
import { asteroidSchema } from '../validators/request-validators';

const meteorRouter = express.Router();

// Get asteroids data
meteorRouter.get('/api/meteors', validator(asteroidSchema, 'query'), getAsteroids);
// Display asteroids data
meteorRouter.get('/meteors', validator(asteroidSchema, 'query'), displayAsteroids);

export default meteorRouter;
