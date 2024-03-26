import { Response } from 'express';
import { displayAsteroids } from '../../controllers/asteroid-web-controller';
import { MeteorQuery } from '../../utils/types/queries';
import { TypedRequestQuery } from '../../utils/types/typed-requests';
import { mapQueryToMeteorRequest } from '../../utils/mappers/query-mapper';
import { getAsteroidsWithinPeriod } from '../../services/asteroid-service';

jest.mock('../../utils/mappers/query-mapper');
jest.mock('../../services/asteroid-service');

describe('asteroid web controller', () => {
  const meteorRequest = {
    date: new Date('2024-01-24'),
    countOnly: false,
    wereDangerousMeteors: false,
  };
  const asteroidsData = { meteors: [] };
  const query = {};
  const req = { query } as TypedRequestQuery<MeteorQuery>;
  const error = { message: 'Error' };
  const res = {
    render: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();
  const mockMapQueryToMeteorRequest = mapQueryToMeteorRequest as jest.Mock;
  const mockGetAsteroidsWithinPeriod = getAsteroidsWithinPeriod as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display successfully', async () => {
    mockMapQueryToMeteorRequest.mockReturnValue(meteorRequest);
    mockGetAsteroidsWithinPeriod.mockResolvedValue(asteroidsData);
    await displayAsteroids(req, res, next);
    expect(mapQueryToMeteorRequest).toHaveBeenCalledWith(query);
    expect(getAsteroidsWithinPeriod).toHaveBeenCalledWith(meteorRequest);
    expect(res.render).toHaveBeenCalledWith('meteors.html', { ...asteroidsData, title: 'Asteroids' });
    expect(next).not.toHaveBeenCalled();
  });
  it('should handle error when service throws error', async () => {
    mockMapQueryToMeteorRequest.mockReturnValue(meteorRequest);
    mockGetAsteroidsWithinPeriod.mockRejectedValue(error);
    await displayAsteroids(req, res, next);
    expect(mapQueryToMeteorRequest).toHaveBeenCalledWith(query);
    expect(getAsteroidsWithinPeriod).toHaveBeenCalledWith(meteorRequest);
    expect(res.render).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
  });
});
