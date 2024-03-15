import axios, { AxiosResponse } from 'axios';
import { constants } from '../constants/constants';
import { mapAsteroidsData } from '../utils/asteroid-mapper';
import { format, previousFriday, previousMonday } from 'date-fns';
import '../config/environment';

const { API_BASE_URL, ASTEROIDS_FEED_ENDPOINT, API_KEY } = process.env;

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

  const asteroidsFeedUrl = String(API_BASE_URL) + String(ASTEROIDS_FEED_ENDPOINT);

  const response = await axios.get(asteroidsFeedUrl, {
    params: {
      start_date: startDate,
      end_date: endDate,
      api_key: API_KEY,
    },
  });
  return handleResponse(request, response);
};
