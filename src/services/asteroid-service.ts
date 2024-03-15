import axios, { AxiosResponse } from 'axios';
import { constants } from '../constants/constants';
import { mapAsteroidsData } from '../utils/asteroid-mapper';

const { format, previousFriday, previousMonday } = require('date-fns');
const { nasaApi } = require('../config/environment');

const { baseUrl, asteroidsFeedEndpoint, apiKey } = nasaApi;

const handleResponse = (
  request: { date: Date; countOnly: boolean; wereDangerousMeteors: boolean },
  response: AxiosResponse,
) => {
  const { countOnly, wereDangerousMeteors } = request;
  return mapAsteroidsData(response.data, countOnly, wereDangerousMeteors);
};

export const getAsteroidsWithinPeriod = async (request: {
  date: Date;
  countOnly: boolean;
  wereDangerousMeteors: boolean;
}) => {
  const date = request.date ?? new Date();

  const fridayPrecedingDate = previousFriday(date);
  const mondayPrecedingFriday = previousMonday(fridayPrecedingDate);
  const startDate = format(mondayPrecedingFriday, constants.DATE_TEMPLATE);
  const endDate = format(fridayPrecedingDate, constants.DATE_TEMPLATE);

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
