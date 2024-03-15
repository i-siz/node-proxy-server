const express = require('express');
const { asteroidApiController, asteroidWebController } = require('../controllers');
const { validator } = require('../middlewares');

const router = express.Router();

// Get asteroids data
router.get('/api/meteors', validator('asteroidRequest', 'query'), asteroidApiController.getAsteroids);
// Display asteroids data
router.get('/meteors', validator('asteroidRequest', 'query'), asteroidWebController.displayAsteroids);

module.exports = {
  meteorRouter: router,
};
