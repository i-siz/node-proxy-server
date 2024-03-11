const axios = require('axios');
const { mapAsteroidsData } = require('../utils');
const { asteroidsFeedUrl, apiKey } = require('../config');

const handleResponse = (response) => {
  return mapAsteroidsData(response.data);
}

const handleError = (error) => {
  console.error(`Error: ${error.message}`);
}

const getAsteroidsWithinPeriod = async (startDate, endDate) => {
  const response = await axios.get(asteroidsFeedUrl, {
    params: {
      start_date: startDate,
      end_date: endDate,
      api_key: apiKey
    }
  })
    .then(handleResponse)
    .catch(handleError);
  return response;
}

module.exports = {
  getAsteroidsWithinPeriod,
};