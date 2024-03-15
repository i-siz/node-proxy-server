import express, { Express } from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/user-routes';
import meteorRouter from './routes/meteor-routes';
import { sentryInitiator } from './logging/sentry-initiator';
import { exceptionFilter, pageNotFoundHandler } from './middlewares/error-middleware';
import path from 'path';
import nunjucks from 'nunjucks';
const { server } = require('./config/environment');

const { port } = server;

const app: Express = express();
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

app.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!');
});

app.use(Sentry.Handlers.errorHandler());

app.use(exceptionFilter);
app.use('*', pageNotFoundHandler);

app.set('view engine', 'html');

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
