const Joi = require('joi').extend(require('@joi/date'));

const asteroidRequest = Joi.object({
  date: Joi.date().less('now').format('YYYY-MM-DD'),
  count_only: Joi.boolean().sensitive(),
  were_dangerous_meteors: Joi.boolean().sensitive(),
});

const userRequest = Joi.object({
  user_id: Joi.number().integer().min(1).required(),
  user_name: Joi.string().required(),
  api_key: Joi.string().alphanum().length(40).required(),
});

export default { asteroidRequest, userRequest };
