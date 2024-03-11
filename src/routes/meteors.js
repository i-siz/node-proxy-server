const express = require('express');
const { getAsteroidsData } = require('../controllers/asteroids.js');

const router = express.Router();

// Get asteroids data
router.get('/', getAsteroidsData);

module.exports = router;