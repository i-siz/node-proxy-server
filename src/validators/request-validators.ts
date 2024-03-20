import CoreJoi from 'joi';
import * as JoiDate from '@joi/date';
const Joi = CoreJoi.extend(JoiDate.default(CoreJoi)) as typeof CoreJoi;

export const asteroidSchema = Joi.object({
  date: Joi.date().less('now').format('YYYY-MM-DD'),
  count_only: Joi.boolean().sensitive(),
  were_dangerous_meteors: Joi.boolean().sensitive(),
});

export const userSchema = Joi.object({
  user_id: Joi.number().integer().min(1).required(),
  user_name: Joi.string().required(),
  api_key: Joi.string().alphanum().length(40).required(),
});
