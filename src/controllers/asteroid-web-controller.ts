import { Request, Response, NextFunction } from 'express';

const { mapQueryToMeteorRequest } = require('../utils');
const { asteroidService } = require('../services');

export const displayAsteroids = async (req: Request, res: Response, next: NextFunction) => {
  const request = mapQueryToMeteorRequest(req.query);

  try {
    const data = await asteroidService.getAsteroidsWithinPeriod(request);
    res.render('meteors.html', { ...data, title: 'Asteroids' });
  } catch (error) {
    next(error);
  }
};
