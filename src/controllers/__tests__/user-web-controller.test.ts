import { TypedRequestBody } from '../../utils/types/typed-requests';
import { displayUserForm, displayRover } from '../user-web-controller';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UserWebController', () => {
  describe('renderUserFormPage', () => {
    let res: any;

    beforeAll(() => {
      const req = {};
      res = {
        render: jest.fn(),
      };
      const next = () => {};
      displayUserForm(req, res, next);
    });

    test('should render user form page', async () => {
      expect(res.render).toHaveBeenCalledWith('user-form.html', { title: 'User form' });
    });
  });

  describe('renderRoverPage', () => {
    let res: any;

    beforeAll(() => {
      // mockedAxios.get.mockImplementation();

      const req = {
        body: {
          user_id: 42,
          user_name: 'John Galt',
          api_key: '1111111111111111111111111111111111111111',
        },
      } as TypedRequestBody<{ user_id: number; user_name: string; api_key: string }>;
      res = {
        render: jest.fn(),
      };
      const next = () => {};
      displayRover(req, res, next);
    });

    test('should render rover page', async () => {
      const roverPhotoUrl =
        'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/04102/opgs/edr/ncam/NRB_761647468EDR_S1060660NCAM00256M_.JPG';
      expect(res.render).toHaveBeenCalledWith('user.html', {
        roverPhotoUrl,
        title: 'Rover photo',
      });
    });
  });
});
