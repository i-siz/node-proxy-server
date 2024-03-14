const axios = require('axios');
const { format, previousFriday, previousMonday } = require('date-fns');
const { mapAsteroidsData } = require('../utils');
const { nasaApi } = require('../config/environment');
const { DATE_TEMPLATE } = require('../constants/constants');

const { baseUrl, asteroidsFeedEndpoint, apiKey } = nasaApi;

const handleResponse = (request, response) => {
  const { countOnly, wereDangerousMeteors } = request;
  return mapAsteroidsData(response.data, countOnly, wereDangerousMeteors);
};

const getAsteroidsWithinPeriod = async (request) => {
  const date = request.date ?? new Date();

  const fridayPrecedingDate = previousFriday(date);
  const mondayPrecedingFriday = previousMonday(fridayPrecedingDate);
  const startDate = format(mondayPrecedingFriday, DATE_TEMPLATE);
  const endDate = format(fridayPrecedingDate, DATE_TEMPLATE);

  const asteroidsFeedUrl = baseUrl + asteroidsFeedEndpoint;

  const response = await axios.get(asteroidsFeedUrl, {
    params: {
      start_date: startDate,
      end_date: endDate,
      api_key: apiKey,
    },
  });
  return handleResponse(request, response);
};

module.exports = {
  getAsteroidsWithinPeriod,
};
