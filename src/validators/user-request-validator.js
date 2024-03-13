const Joi = require('joi');

const userRequestSchema = Joi.object({
    user_id: Joi.number().required(),
    user_name: Joi.string().alphanum().min(1).required(),
    api_key: Joi.string().alphanum().length(40).required(),
});

module.exports = userRequestSchema;