const { mapQueryToMeteorRequest } = require('../utils');
const { asteroidService } = require('../services');

const displayAsteroids = async (req, res, next) => {
  const request = mapQueryToMeteorRequest(req.query);

  try {
    const data = await asteroidService.getAsteroidsWithinPeriod(request);
    res.render('meteors.html', { ...data, title: 'Asteroids' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  displayAsteroids,
};
