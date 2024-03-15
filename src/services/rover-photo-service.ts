import axios from 'axios';
import { constants } from '../constants/constants';
import { format } from 'date-fns';
import '../config/environment';

const { API_BASE_URL, MANIFESTS_ENDPOINT, ROVER_PHOTO_ENDPOINT, API_KEY } = process.env;

const getManifestData = async () => {
  const manifestUrl = String(API_BASE_URL) + String(MANIFESTS_ENDPOINT);
  const manifestResponse = await axios.get(manifestUrl, {
    params: {
      api_key: API_KEY,
    },
  });
  return manifestResponse.data;
};

const getRoverPhotoData = async (dateFormatted: string) => {
  const roverPhotoUrl = String(API_BASE_URL) + String(ROVER_PHOTO_ENDPOINT);
  const roverPhotoResponse = await axios.get(roverPhotoUrl, {
    params: {
      earth_date: dateFormatted,
      api_key: API_KEY,
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
