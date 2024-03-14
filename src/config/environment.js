require('dotenv').config();

const { API_BASE_URL, ASTEROIDS_FEED_ENDPOINT, ROVER_PHOTO_ENDPOINT, MANIFESTS_ENDPOINT, API_KEY, SENTRY_DSN, PORT } =
  process.env;

const environment = {
  nasaApi: {
    baseUrl: API_BASE_URL,
    asteroidsFeedEndpoint: ASTEROIDS_FEED_ENDPOINT,
    roverPhotoEndpoint: ROVER_PHOTO_ENDPOINT,
    manifestEndpoint: MANIFESTS_ENDPOINT,
    apiKey: API_KEY,
  },
  server: {
    port: PORT || 4000,
  },
  sentry: {
    dsn: SENTRY_DSN,
  },
};

module.exports = environment;
