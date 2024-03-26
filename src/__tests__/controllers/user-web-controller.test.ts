import { Response, Request } from 'express';
import { displayRover, displayUserForm } from '../../controllers/user-web-controller';
import { UserQuery } from '../../utils/types/queries';
import { TypedRequestBody } from '../../utils/types/typed-requests';
import { mapQueryToUserRequest } from '../../utils/mappers/query-mapper';
import { processUserData } from '../../services/user-service';
import { getRoverPhotoUrl } from '../../services/rover-photo-service';

jest.mock('../../utils/mappers/query-mapper');
jest.mock('../../services/user-service');
jest.mock('../../services/rover-photo-service');

describe('user web controller', () => {
  describe('display rover', () => {
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
      render: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();
    const mockMapQueryToUserRequest = mapQueryToUserRequest as jest.Mock;
    const mockGetRoverPhotoUrl = getRoverPhotoUrl as jest.Mock;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should display rover photo', async () => {
      mockMapQueryToUserRequest.mockReturnValue(userRequest);
      mockGetRoverPhotoUrl.mockResolvedValue(roverPhotoUrl);
      await displayRover(req, res, next);
      expect(mapQueryToUserRequest).toHaveBeenCalledWith(body);
      expect(processUserData).toHaveBeenCalledWith(userRequest);
      expect(getRoverPhotoUrl).toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith('user.html', { roverPhotoUrl, title: 'Rover photo' });
      expect(next).not.toHaveBeenCalled();
    });
    it('should handle error when service throws error', async () => {
      mockMapQueryToUserRequest.mockReturnValue(userRequest);
      mockGetRoverPhotoUrl.mockRejectedValue(error);
      await displayRover(req, res, next);
      expect(mapQueryToUserRequest).toHaveBeenCalledWith(body);
      expect(processUserData).toHaveBeenCalledWith(userRequest);
      expect(getRoverPhotoUrl).toHaveBeenCalled();
      expect(res.render).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('user form', () => {
    const req = {};
    const res = {
      render: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should display user form', () => {
      displayUserForm(req, res, next);
      expect(res.render).toHaveBeenCalledWith('user-form.html', { title: 'User form' });
    });
  });
});
