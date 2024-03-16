import { Response, NextFunction } from 'express';
import { getAsteroidsWithinPeriod } from '../services/asteroid-service';
import { mapQueryToMeteorRequest } from '../utils/query-mapper';
import { TypedRequestQuery } from '../utils/types/typed-requests';

export const getAsteroids = async (
  req: TypedRequestQuery<{ date: string; count_only: string; were_dangerous_meteors: string }>,
  res: Response,
  next: NextFunction,
) => {
  const request = mapQueryToMeteorRequest(req.query);

  try {
    const data = await getAsteroidsWithinPeriod(request);
    res.json({ data });
  } catch (error) {
    next(error);
  }
};
