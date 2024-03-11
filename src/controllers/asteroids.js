const { previousFriday, previousMonday, format } = require('date-fns');
const getAsteroidsWithinPeriod = require('../services/asteroidsData');
const mapAsteroidsData = require('../mappers/asteroids');

const DATE_TEMPLATE = 'yyyy-MM-dd';

const lastFriday = previousFriday(new Date());
const mondayPrecedingLastFriday = previousMonday(lastFriday);
const startDate = format(mondayPrecedingLastFriday, DATE_TEMPLATE);
const endDate = format(lastFriday, DATE_TEMPLATE);

const handleError = (res, error) => {
    res.status(500).send(error.message);
}

const getAsteroidsData = async (req, res) => {
    try {
        const asteroidsData = await getAsteroidsWithinPeriod(startDate, endDate);
        const data = mapAsteroidsData(asteroidsData);
        res.json({ data });
    } catch (error) {
        (error) => handleError(res, error);
    }
}

module.exports = {
    getAsteroidsData,
};