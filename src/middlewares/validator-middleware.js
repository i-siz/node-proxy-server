const validators = require('../validators');

const supportedMethods = ['get', 'post', 'put', 'patch', 'delete'];

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

const validator = (schemaName) => {
  const validator = validators[schemaName];
  if (!validator) {
    throw new Error(`'${schemaName}' validator is not exist`);
  }

  return (req, res, next) => {
    const method = req.method.toLowerCase();
    if (!supportedMethods.includes(method)) {
      next();
    }

    const { error, value } = validator.validate(req.query, validationOptions);

    // validation failed
    if (error) {
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
    // validation successful
    req.query = value;
    next();
  };
};

module.exports = validator;
