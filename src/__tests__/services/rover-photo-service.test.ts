import axios from 'axios';
import { getRoverPhotoUrl } from '../../services/rover-photo-service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const manifestData = {
  photo_manifest: {
    max_date: '2024-03-10',
  },
};

const roverPhotoData = {
  photos: [
    {
      img_src: 'img-src',
    },
  ],
};

describe('rover photo service', () => {
  it('should get rover photo url', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: manifestData }).mockResolvedValueOnce({ data: roverPhotoData });
    const result = await getRoverPhotoUrl();
    expect(result).toEqual('img-src');
  });
});
