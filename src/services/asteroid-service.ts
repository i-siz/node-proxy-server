import axios, { AxiosResponse } from 'axios';
import { format, previousFriday, previousMonday } from 'date-fns';
import { constants } from '../constants/constants';
import { mapAsteroidsData } from '../utils/mappers/asteroid-mapper';
import { MeteorRequest } from '../utils/types/requests';
import { environment } from '../config/environment';

const { baseUrl, asteroidsFeedEndpoint, apiKey } = environment.nasaApi;

const handleResponse = (request: MeteorRequest, response: AxiosResponse) => {
  const { countOnly, wereDangerousMeteors } = request;
  return mapAsteroidsData(response.data, countOnly, wereDangerousMeteors);
};

export const getAsteroidsWithinPeriod = async (request: MeteorRequest) => {
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
