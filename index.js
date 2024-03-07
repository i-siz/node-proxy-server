const axios = require('axios');
const moment = require('moment');

const DATE_TEMPLATE = 'YYYY-MM-DD';

const lastFriday = moment().day(-2);
const mondayPrecedingLastFriday = moment().day(-2).day(1);
const startDate = mondayPrecedingLastFriday.format(DATE_TEMPLATE);
const endDate = lastFriday.format(DATE_TEMPLATE)
console.log(startDate, endDate);

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
  axios.get(process.env.ASTEROIDS_FEED_URL, {
    params: {
      start_date: startDate,
      end_date: endDate,
      api_key: process.env.API_KEY
    }
  })
    .then(handleResponse)
    .catch(handleError);
}

getAsteroidsWithinPeriod(startDate, endDate);