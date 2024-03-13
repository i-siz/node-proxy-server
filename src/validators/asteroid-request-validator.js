const Joi = require('joi').extend(require('@joi/date'));

const asteroidRequestSchema = Joi.object({
    date: Joi.date().less('now').format('YYYY-MM-DD'),
    count_only: Joi.boolean().sensitive(),
    were_dangerous_meteors: Joi.boolean().sensitive(),
});

module.exports = asteroidRequestSchema;