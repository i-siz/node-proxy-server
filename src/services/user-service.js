const axios = require('axios');

// const handleResponse = (request, response) => {
//   const { countOnly, wereDangerousMeteors } = request;
//   return mapAsteroidsData(response.data, countOnly, wereDangerousMeteors);
// }

// const handleError = (error) => {
//   console.error(`Error: ${error.message}`);
// }

// const getAsteroidsWithinPeriod = async (request) => {
//   const date = request.date ?? new Date();

//   const fridayPrecedingDate = previousFriday(date);
//   const mondayPrecedingFriday = previousMonday(fridayPrecedingDate);
//   const startDate = format(mondayPrecedingFriday, DATE_TEMPLATE);
//   const endDate = format(fridayPrecedingDate, DATE_TEMPLATE);

//   const response = await axios.get(asteroidsFeedUrl, {
//     params: {
//       start_date: startDate,
//       end_date: endDate,
//       api_key: apiKey
//     }
//   })
//     .then((response) => handleResponse(request, response))
//     .catch(handleError);
//   return response;
// }

const processUserData = (request) => {
  return { user: "Ilya" }
}

module.exports = {
  processUserData,
};