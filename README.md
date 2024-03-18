## About The Project

This is a project for learning Node/Express. In fact it will be a proxy server for the [original NASA API](https://api.nasa.gov/).

## Getting Started

To install required dependences:

```sh
npm install
```

To run the application in development mode with auto-restart on code changes:

```sh
npm run dev
```

To build the project (transpile TypeScript code):

```sh
npm run build
```

To copy .html and .css files to _/dist_ foler:

```sh
npm run copy-files
```

To run the transpiled TypeScript code:

```sh
npm run start
```

To run EsLint:

```sh
npm run lint
```

To run EsLint and automatically fix found issues if possible:

```sh
npm run lint-and-fix
```

To run Prettier (format code):

```sh
npm run prettier
```

## Environment variables

Environment variables are stored in .env file and managed by [Dotenv dependency module](https://www.npmjs.com/package/dotenv)

- **API_BASE_URL** - base NASA API url
- **ASTEROIDS_FEED_ENDPOINT** - asteroids feed endpoint
- **ROVER_PHOTO_ENDPOINT** - rover photo endpoint
- **MANIFESTS_ENDPOINT** - rover mission manifest endpoint
- **API_KEY** - NASA API key, which can be generated [here](https://api.nasa.gov/)
- **SENTRY_DSN** - Sentry data source name
- **PORT** - the port on which the proxy server will run

## Docker container

Copy the file from [.env.example](.env.example) to [.env](.env) and fill it with necessary environment variables.

Use the Makefile to build the docker image:

- for the production server:

```bash
make build
```

- in delelopment mode with auto-restart on code changes:

```bash
make build-dev
```

Run node proxy server in docker container:

- for the production server:

```bash
make up
```

- in development mode:

```bash
make up-dev
```

Open your browser and go to [localhost:4000/meteors](http://localhost:4000/meteors) or use Postman instead.

To shut down the docker container:

```bash
make down
```
