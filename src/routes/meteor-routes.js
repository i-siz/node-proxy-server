const express = require('express');
const { asteroidController } = require('../controllers');
const { validator } = require('../middlewares');

const router = express.Router();

// Get asteroids data
router.get('/', validator('asteroidRequest'), asteroidController.getAsteroids);

module.exports = {
    meteorRouter: router,
};