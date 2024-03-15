const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');

const { sentry } = require('../config/environment');
const { dsn } = sentry;

const sentryInitiator = (app) => {
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

  return Sentry;
};

module.exports = sentryInitiator;
