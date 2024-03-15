import express, { Express } from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/user-routes';
import meteorRouter from './routes/meteor-routes';
import { sentryInitiator } from './logging/sentry-initiator';
import { exceptionFilter, pageNotFoundHandler } from './middlewares/error-middleware';
const { server } = require('./config/environment');

const { port } = server;

const app: Express = express();
const Sentry = sentryInitiator(app);

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use('/meteors', meteorRouter);
app.use('/user', userRouter);

app.use(Sentry.Handlers.errorHandler());

app.use(exceptionFilter);

app.use('*', pageNotFoundHandler);

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
