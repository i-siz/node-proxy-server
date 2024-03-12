const axios = require('axios');
const { format, previousFriday, previousMonday } = require('date-fns');
const { mapAsteroidsData } = require('../utils');
const { ASTEROIDS_FEED_URL, API_KEY } = require('../config/environment');

const DATE_TEMPLATE = 'yyyy-MM-dd';

const handleResponse = (request, response) => {
  const { countOnly, wereDangerousMeteors } = request;
  return mapAsteroidsData(response.data, countOnly, wereDangerousMeteors);
}

const handleError = (error) => {
  console.error(`Error: ${error.message}`);
}

const getAsteroidsWithinPeriod = async (request) => {
  const date = request.date ?? new Date();

  const fridayPrecedingDate = previousFriday(date);
  const mondayPrecedingFriday = previousMonday(fridayPrecedingDate);
  const startDate = format(mondayPrecedingFriday, DATE_TEMPLATE);
  const endDate = format(fridayPrecedingDate, DATE_TEMPLATE);

  const response = await axios.get(ASTEROIDS_FEED_URL, {
    params: {
      start_date: startDate,
      end_date: endDate,
      api_key: API_KEY
    }
  })
    .then((response) => handleResponse(request, response))
    .catch(handleError);
  return response;
}

module.exports = {
  getAsteroidsWithinPeriod,
};