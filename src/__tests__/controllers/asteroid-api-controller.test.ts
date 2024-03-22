import { Response } from 'express';
import { getAsteroids } from '../../controllers/asteroid-api-controller';
import { MeteorQuery } from '../../utils/types/queries';
import { TypedRequestQuery } from '../../utils/types/typed-requests';
import { mapQueryToMeteorRequest } from '../../utils/mappers/query-mapper';
import { getAsteroidsWithinPeriod } from '../../services/asteroid-service';

jest.mock('../../utils/mappers/query-mapper');
jest.mock('../../services/asteroid-service');

describe('asteroid api controller', () => {
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
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get asteroids successfully', async () => {
    (mapQueryToMeteorRequest as jest.Mock).mockReturnValue(meteorRequest);
    (getAsteroidsWithinPeriod as jest.Mock).mockResolvedValue(asteroidsData);
    await getAsteroids(req, res, next);
    expect(mapQueryToMeteorRequest).toHaveBeenCalledWith(query);
    expect(getAsteroidsWithinPeriod).toHaveBeenCalledWith(meteorRequest);
    expect(res.json).toHaveBeenCalledWith({ data: asteroidsData });
    expect(next).not.toHaveBeenCalled();
  });
  it('should handle error when service throws error', async () => {
    (mapQueryToMeteorRequest as jest.Mock).mockReturnValue(meteorRequest);
    (getAsteroidsWithinPeriod as jest.Mock).mockRejectedValue(error);
    await getAsteroids(req, res, next);
    expect(mapQueryToMeteorRequest).toHaveBeenCalledWith(query);
    expect(getAsteroidsWithinPeriod).toHaveBeenCalledWith(meteorRequest);
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
  });
});
