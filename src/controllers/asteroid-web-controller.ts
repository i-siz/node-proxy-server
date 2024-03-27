import { Response, NextFunction } from 'express';
import { getAsteroidsWithinPeriod } from '../services/asteroid-service';
import { mapQueryToMeteorRequest } from '../utils/mappers/query-mapper';
import { TypedRequestQuery } from '../utils/types/typed-requests';
import { MeteorQuery } from '../utils/types/queries';

export const displayAsteroids = async (req: TypedRequestQuery<MeteorQuery>, res: Response, next: NextFunction) => {
  const request = mapQueryToMeteorRequest(req.query);

  try {
    const data = await getAsteroidsWithinPeriod(request);
    res.render('meteors.html', { ...data, title: 'Asteroids' });
  } catch (error) {
    next(error);
  }
};
