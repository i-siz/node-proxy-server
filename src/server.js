const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nunjucks = require('nunjucks');
const sentryInitiator = require('./logging/sentry-initiator');
const { server } = require('./config/environment');
const { meteorRouter, userRouter } = require('./routes');
const { exceptionFilter, pageNotFoundHandler } = require('./middlewares');

const { port } = server;

const app = express();
const Sentry = sentryInitiator(app);

nunjucks.configure(path.resolve(__dirname, './views'), {
  autoescape: true,
  express: app,
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(meteorRouter);
app.use(userRouter);

app.use(Sentry.Handlers.errorHandler());

app.use(exceptionFilter);

app.use('*', pageNotFoundHandler);

app.set('view engine', 'html');

app.listen(port, (error) => {
  error ? console.log(error.message) : console.log(`The server is running on port ${port}`);
});
