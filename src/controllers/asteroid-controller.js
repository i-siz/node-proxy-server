const { MeteorRequest } = require('../dto');
const { asteroidService } = require('../services');

const handleError = (res, error) => {
    res.status(500).send(error.message);
}

const getAsteroids = async (req, res) => {
    const request = new MeteorRequest(req.query);

    try {
        const data = await asteroidService.getAsteroidsWithinPeriod(request);
        res.json({ data });
    } catch (error) {
        (error) => handleError(res, error);
    }
}

module.exports = {
    getAsteroids,
};