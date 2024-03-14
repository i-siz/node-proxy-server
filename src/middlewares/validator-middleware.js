const validators = require('../validators');

const supportedMethods = ['get', 'post', 'put', 'patch', 'delete'];

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

const validator = (schemaName, sourceName) => {
  const validator = validators[schemaName];
  if (!validator) {
    throw new Error(`'${schemaName}' validator is not exist`);
  }

  return async (req, res, next) => {
    const method = req.method.toLowerCase();
    if (!supportedMethods.includes(method)) {
      next();
    }

    const source = req[sourceName];

    try {
      await validator.validateAsync(source, validationOptions);
      // validation successful
      next();
    } catch (error) {
      // validation failed
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
    }
  };
};

module.exports = validator;
