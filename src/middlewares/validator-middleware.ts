import { Request, Response, NextFunction } from 'express';
import { Schema, ValidationError } from 'joi';

const supportedMethods = ['get', 'post', 'put', 'patch', 'delete'];

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

export const validator = (schema: Schema, sourceName: keyof Request) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const method = req.method.toLowerCase();
    if (!supportedMethods.includes(method)) {
      return next();
    }

    const source = req[sourceName];

    try {
      await schema.validateAsync(source, validationOptions);
      // validation successful
      next();
    } catch (error) {
      // validation failed
      if (error instanceof ValidationError) {
        const joiError = {
          error: {
            original: error._original,
            details: error.details.map(({ message, type }) => ({
              message: message.replace(/['"]/g, ''),
              type,
            })),
          },
        };
        return res.status(422).json(joiError);
      } else {
        return res.status(500).json({ message: String(error) });
      }
    }
  };
};
