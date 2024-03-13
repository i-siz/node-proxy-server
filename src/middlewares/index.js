const { exceptionFilter, pageNotFoundHandler } = require('./error-middleware');

module.exports = {
    exceptionFilter,
    pageNotFoundHandler,
};