import Joi from 'joi';

export const userRequest = Joi.object({
  user_id: Joi.number().integer().min(1).required(),
  user_name: Joi.string().required(),
  api_key: Joi.string().alphanum().length(40).required(),
});
