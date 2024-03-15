import { Request, Response, NextFunction } from 'express';
import { getAsteroidsWithinPeriod } from '../services/asteroid-service';

const { mapQueryToMeteorRequest } = require('../utils/query-mapper');

export const getAsteroids = async (req: Request, res: Response, next: NextFunction) => {
  const request = mapQueryToMeteorRequest(req.query);

  try {
    const data = await getAsteroidsWithinPeriod(request);
    res.json({ data });
  } catch (error) {
    next(error);
  }
};
