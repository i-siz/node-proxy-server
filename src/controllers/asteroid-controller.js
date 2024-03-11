const { previousFriday, previousMonday, format } = require('date-fns');
const { asteroidService } = require('../services');

const DATE_TEMPLATE = 'yyyy-MM-dd';

const lastFriday = previousFriday(new Date());
const mondayPrecedingLastFriday = previousMonday(lastFriday);
const startDate = format(mondayPrecedingLastFriday, DATE_TEMPLATE);
const endDate = format(lastFriday, DATE_TEMPLATE);

const handleError = (res, error) => {
    res.status(500).send(error.message);
}

const getAsteroids = async (req, res) => {
    try {
        const data = await asteroidService.getAsteroidsWithinPeriod(startDate, endDate);
        res.json({ data });
    } catch (error) {
        (error) => handleError(res, error);
    }
}

module.exports = {
    getAsteroids,
};