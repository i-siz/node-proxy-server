import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';
import validators from '../validators/request-validators';

const supportedMethods = ['get', 'post', 'put', 'patch', 'delete'];

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

export const validator = (schemaName: string, sourceName: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validator = (<any>validators)[schemaName];
  if (!validator) {
    throw new Error(`'${schemaName}' validator is not exist`);
  }

  return async (req: Request, res: Response, next: NextFunction) => {
    const method = req.method.toLowerCase();
    if (!supportedMethods.includes(method)) {
      next();
    }

    const source = req[sourceName as keyof Request];

    try {
      await validator.validateAsync(source, validationOptions);
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
