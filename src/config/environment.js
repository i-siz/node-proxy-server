require('dotenv').config();

const { ASTEROIDS_FEED_URL, API_KEY, PORT } = process.env;

module.exports = {
    ASTEROIDS_FEED_URL,
    API_KEY,
    PORT,
};