const { exceptionFilter, pageNotFoundHandler } = require('./error-middleware');
const validator = require('./validator-middleware');

module.exports = {
    exceptionFilter,
    pageNotFoundHandler,
    validator,
};