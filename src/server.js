const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');
const express = require('express');
const { server, sentry } = require('./config/environment');
const { meteorRouter, userRouter } = require('./routes');
const { exceptionFilter, pageNotFoundHandler } = require('./middlewares');

const { port } = server;
const { dsn } = sentry;

const app = express();

Sentry.init({
  dsn,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use('/meteors', meteorRouter);
app.use('/user', userRouter);

app.use(Sentry.Handlers.errorHandler());

app.use(exceptionFilter);

app.use('*', pageNotFoundHandler);

app.listen(port, (error) => {
  error ? console.log(error.message) : console.log(`The server is running on port ${port}`);
});
