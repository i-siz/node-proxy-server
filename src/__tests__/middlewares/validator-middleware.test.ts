import { Request, Response } from 'express';
import { validator } from '../../middlewares/validator-middleware';
import { asteroidSchema, userSchema } from '../../validators/request-validators';
import { ValidationError, ValidationErrorItem } from 'joi';

describe('validator middleware', () => {
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;
  const next = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should validate meteor request successfully', async () => {
    const query = {};
    const request = {
      method: 'get',
      query,
    } as unknown as Request;

    const validationFunction = validator(asteroidSchema, 'query');
    const validateAsyncSpy = jest.spyOn(asteroidSchema, 'validateAsync').mockResolvedValue(query);

    await validationFunction(request, response, next);

    expect(validateAsyncSpy).toHaveBeenCalledWith(query, expect.anything());
    expect(response.status).not.toHaveBeenCalled();
    expect(response.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should validate user request successfully', async () => {
    const body = {
      user_id: 42,
      user_name: 'John Galt',
      api_key: '0123456789012345678901234567890123456789',
    };
    const request = {
      method: 'post',
      body,
    } as unknown as Request;

    const validationFunction = validator(userSchema, 'body');
    const validateAsyncSpy = jest.spyOn(userSchema, 'validateAsync').mockResolvedValue(body);

    await validationFunction(request, response, next);

    expect(validateAsyncSpy).toHaveBeenCalledWith(body, expect.anything());
    expect(response.status).not.toHaveBeenCalled();
    expect(response.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should throw validation error', async () => {
    const query = { unknown: 'unknown' };
    const request = {
      method: 'get',
      query,
    } as unknown as Request;

    const validationFunction = validator(asteroidSchema, 'query');

    const validationError = new ValidationError(
      'Validation error',
      [
        {
          message: '"unknown" is not allowed',
          path: ['unknown'],
          type: 'object.unknown',
        },
      ],
      { unknown: 'unknown' },
    );
    const validateAsyncSpy = jest.spyOn(asteroidSchema, 'validateAsync').mockRejectedValue(validationError);

    await validationFunction(request, response, next);

    expect(validateAsyncSpy).toHaveBeenCalledWith(query, expect.anything());
    expect(response.status).toHaveBeenCalledWith(422);
    expect(response.json).toHaveBeenCalledWith({
      error: {
        original: { unknown: 'unknown' },
        details: [{ message: 'unknown is not allowed', type: 'object.unknown' }],
      },
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should throw internal server error when not joi exception caught', async () => {
    const query = {};
    const request = {
      method: 'get',
      query,
    } as unknown as Request;

    const validationFunction = validator(asteroidSchema, 'query');

    const validateAsyncSpy = jest.spyOn(asteroidSchema, 'validateAsync').mockRejectedValue('An error has occurred');

    await validationFunction(request, response, next);

    expect(validateAsyncSpy).toHaveBeenCalledWith(query, expect.anything());
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({ message: 'An error has occurred' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should skip validation when method is not supported', async () => {
    const query = {};
    const request = {
      method: 'not_supported',
      query,
    } as unknown as Request;

    const validationFunction = validator(asteroidSchema, 'query');
    const validateAsyncSpy = jest.spyOn(asteroidSchema, 'validateAsync');

    await validationFunction(request, response, next);

    expect(validateAsyncSpy).not.toHaveBeenCalled();
    expect(response.status).not.toHaveBeenCalled();
    expect(response.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
