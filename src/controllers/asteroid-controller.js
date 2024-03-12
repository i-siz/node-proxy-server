const { mapQueryToMeteorRequest } = require('../utils');
const { asteroidService } = require('../services');

const getAsteroids = async (req, res, next) => {
    const request = mapQueryToMeteorRequest(req.query);

    try {
        const data = await asteroidService.getAsteroidsWithinPeriod(request);
        res.json({ data });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAsteroids,
};