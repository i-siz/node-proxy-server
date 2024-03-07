const axios = require('axios');
require('dotenv').config();

const { ASTEROIDS_FEED_URL, API_KEY } = process.env;

const printJsonToConsole = (asteroidsData) => {
  console.log(JSON.stringify(asteroidsData));
}

const printAsteroidsAmountToConsole = (asteroidsData) => {
  const asteroidsAmount = asteroidsData.element_count;
  console.log(`During the requested period, ${asteroidsAmount} asteroids were seen`);
}

const handleResponse = (response) => {
  const asteroidsData = response.data;
  printJsonToConsole(asteroidsData);
  printAsteroidsAmountToConsole(asteroidsData);
  return asteroidsData;
}

const handleError = (error) => {
  console.error(`Error: ${error.message}`);
}

const getAsteroidsWithinPeriod = async (startDate, endDate) => {
  const response = await axios.get(ASTEROIDS_FEED_URL, {
    params: {
      start_date: startDate,
      end_date: endDate,
      api_key: API_KEY
    }
  })
    .then(handleResponse)
    .catch(handleError);
  return response;
}

module.exports = getAsteroidsWithinPeriod;