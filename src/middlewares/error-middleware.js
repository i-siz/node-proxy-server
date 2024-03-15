const path = require('path');

// eslint-disable-next-line no-unused-vars
const exceptionFilter = (err, req, res, next) => {
  const errorCode = err.statusCode || 500;
  const error = {
    code: errorCode,
    message: err.message,
    errors: err.errors,
  };
  res.status(errorCode).json(error);
};

const pageNotFoundHandler = (req, res) =>
  res.render(path.resolve(__dirname, '../views', 'page-not-found.html'), { title: 'Page not found' });

module.exports = {
  exceptionFilter,
  pageNotFoundHandler,
};
