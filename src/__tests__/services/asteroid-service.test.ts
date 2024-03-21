import { getAsteroidsWithinPeriod } from '../../services/asteroid-service';
import { mapAsteroidsData } from '../../utils/mappers/asteroid-mapper';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../../utils/mappers/asteroid-mapper', () => ({
  mapAsteroidsData: jest.fn().mockResolvedValue('mapped'),
}));

const asteroidData = 'asteroid data';
const countOnly = false;
const wereDangerousMeteors = true;

describe('asteroidService', () => {
  beforeAll(() => {
    mockedAxios.get.mockResolvedValue({ data: asteroidData });
  });

  it('should get asteroids within period when date is provided', async () => {
    const meteorRequest = {
      date: new Date(2024, 3, 10),
      countOnly,
      wereDangerousMeteors,
    };
    const result = await getAsteroidsWithinPeriod(meteorRequest);
    expect(mapAsteroidsData).toHaveBeenCalledWith(asteroidData, countOnly, wereDangerousMeteors);
    expect(result).toEqual('mapped');
  });

  it('should get asteroids within period when date is not provided', async () => {
    const meteorRequest = {
      date: null,
      countOnly,
      wereDangerousMeteors,
    };
    const result = await getAsteroidsWithinPeriod(meteorRequest);
    expect(mapAsteroidsData).toHaveBeenCalledWith(asteroidData, countOnly, wereDangerousMeteors);
    expect(result).toEqual('mapped');
  });
});
