const axios = require('axios');
const { ASTEROIDS_FEED_URL, API_KEY } = require('./environment');

const START_DATE = '2024-02-26';
const END_DATE = '2024-03-01';

const printJsonToConsole = (asteroidsData) => {
  console.log(JSON.stringify(asteroidsData, null, 2));
}

const printAsteroidsAmountToConsole = (asteroidsData) => {
  const asteroidsAmount = asteroidsData.element_count;
  console.log(`During the requested period, ${asteroidsAmount} asteroids were seen`);
}

const handleResponse = (response) => {
  const asteroidsData = response.data;
  printJsonToConsole(asteroidsData);
  printAsteroidsAmountToConsole(asteroidsData);
}

const handleError = (error) => {
  console.error(`Error: ${error.message}`);
}

const getAsteroidsWithinPeriod = (startDate, endDate) => {
  axios.get(ASTEROIDS_FEED_URL, {
    params: {
      start_date: startDate,
      end_date: endDate,
      api_key: API_KEY
    }
  })
    .then(handleResponse)
    .catch(handleError);
}

getAsteroidsWithinPeriod(START_DATE, END_DATE);