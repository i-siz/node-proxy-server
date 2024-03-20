import axios from 'axios';
import { format } from 'date-fns';
import { constants } from '../constants/constants';
import { environment } from '../config/environment';

const { baseUrl, manifestEndpoint, roverPhotoEndpoint, apiKey } = environment.nasaApi;

const getManifestData = async () => {
  const manifestUrl = baseUrl + manifestEndpoint;
  const manifestResponse = await axios.get(manifestUrl, {
    params: {
      api_key: apiKey,
    },
  });
  return manifestResponse.data;
};

const getRoverPhotoData = async (dateFormatted: string) => {
  const roverPhotoUrl = baseUrl + roverPhotoEndpoint;
  const roverPhotoResponse = await axios.get(roverPhotoUrl, {
    params: {
      earth_date: dateFormatted,
      api_key: apiKey,
    },
  });
  return roverPhotoResponse.data;
};

export const getRoverPhotoUrl = async () => {
  const manifestData = await getManifestData();

  const maxDate = new Date(manifestData.photo_manifest.max_date);
  const maxDateFormatted = format(maxDate, constants.DATE_TEMPLATE);

  const roverPhotoData = await getRoverPhotoData(maxDateFormatted);
  const { photos } = roverPhotoData;
  const lastPhoto = photos.pop();

  return lastPhoto.img_src;
};
