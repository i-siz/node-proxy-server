const express = require('express');
const { asteroidController } = require('../controllers');

const router = express.Router();

// Get asteroids data
router.get('/', asteroidController.getAsteroids);

module.exports = {
    meteorRouter: router,
};