## About The Project
This is a project for learning Node/Express. In fact it will be a proxy server for the [original NASA API](https://api.nasa.gov/).

## Getting Started

To install required dependences:
  ```sh
  npm install
  ```

To run the application:
  ```sh
  npm run dev
  ```

## Environment variables

Environment variables are stored in .env file and managed by [Dotenv dependency module](https://www.npmjs.com/package/dotenv)

- **ASTEROIDS_FEED_URL** - URL for asteroids feed endpoint
- **API_KEY** - NASA API key, which can be generated [here](https://api.nasa.gov/)
- **PORT** - the port on which the proxy server will run