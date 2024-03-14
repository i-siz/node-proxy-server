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

const pageNotFoundHandler = (req, res) => res.status(404).json({ message: 'Page not found' });

module.exports = {
  exceptionFilter,
  pageNotFoundHandler,
};
