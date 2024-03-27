import { Response } from 'express';
import { postUser } from '../../controllers/user-api-controller';
import { UserQuery } from '../../utils/types/queries';
import { TypedRequestBody } from '../../utils/types/typed-requests';
import { mapQueryToUserRequest } from '../../utils/mappers/query-mapper';
import { processUserData } from '../../services/user-service';
import { getRoverPhotoUrl } from '../../services/rover-photo-service';

jest.mock('../../utils/mappers/query-mapper');
jest.mock('../../services/user-service');
jest.mock('../../services/rover-photo-service');

describe('user api controller', () => {
  const userRequest = {
    userId: 42,
    userName: 'John Galt',
    apiKey: 'api_key',
  };
  const roverPhotoUrl = 'URL';
  const body = {
    user_id: 4,
    user_name: 'John Galt',
    api_key: 'api_key',
  };
  const req = { body } as TypedRequestBody<UserQuery>;
  const error = { message: 'Error' };
  const res = {
    send: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();
  const mockMapQueryToUserRequest = mapQueryToUserRequest as jest.Mock;
  const mockGetRoverPhotoUrl = getRoverPhotoUrl as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process user data and get rover photo', async () => {
    mockMapQueryToUserRequest.mockReturnValue(userRequest);
    mockGetRoverPhotoUrl.mockResolvedValue(roverPhotoUrl);
    await postUser(req, res, next);
    expect(mapQueryToUserRequest).toHaveBeenCalledWith(body);
    expect(processUserData).toHaveBeenCalledWith(userRequest);
    expect(getRoverPhotoUrl).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith(`<img src="${roverPhotoUrl}">`);
    expect(next).not.toHaveBeenCalled();
  });
  it('should handle error when service throws error', async () => {
    mockMapQueryToUserRequest.mockReturnValue(userRequest);
    mockGetRoverPhotoUrl.mockRejectedValue(error);
    await postUser(req, res, next);
    expect(mapQueryToUserRequest).toHaveBeenCalledWith(body);
    expect(processUserData).toHaveBeenCalledWith(userRequest);
    expect(getRoverPhotoUrl).toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
  });
});
