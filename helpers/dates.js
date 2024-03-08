const { previousFriday, previousMonday, format } = require("date-fns");

const DATE_TEMPLATE = 'yyyy-MM-dd';

const lastFriday = previousFriday(new Date());
const mondayPrecedingLastFriday = previousMonday(lastFriday);
const startDate = format(mondayPrecedingLastFriday, DATE_TEMPLATE);
const endDate = format(lastFriday, DATE_TEMPLATE);

module.exports = {
    startDate,
    endDate,
}