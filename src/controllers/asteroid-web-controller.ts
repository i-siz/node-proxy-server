import { Request, Response, NextFunction } from 'express';
import { getAsteroidsWithinPeriod } from '../services/asteroid-service';

const { mapQueryToMeteorRequest } = require('../utils/query-mapper');

export const displayAsteroids = async (req: Request, res: Response, next: NextFunction) => {
  const request = mapQueryToMeteorRequest(req.query);

  try {
    const data = await getAsteroidsWithinPeriod(request);
    res.render('meteors.html', { ...data, title: 'Asteroids' });
  } catch (error) {
    next(error);
  }
};
