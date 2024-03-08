const moment = require('moment');

const DATE_TEMPLATE = 'YYYY-MM-DD';

const lastFriday = moment().day(-2);
const mondayPrecedingLastFriday = moment().day(-2).day(1);
const startDate = mondayPrecedingLastFriday.format(DATE_TEMPLATE);
const endDate = lastFriday.format(DATE_TEMPLATE);

module.exports = {
    startDate,
    endDate,
}