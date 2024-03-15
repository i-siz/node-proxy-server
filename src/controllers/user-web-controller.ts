import { Request, Response, NextFunction } from 'express';
import { getRoverPhotoUrl } from '../services/rover-photo-service';
import { processUserData } from '../services/user-service';

const { mapQueryToUserRequest } = require('../utils/query-mapper');

export const displayRover = async (req: Request, res: Response, next: NextFunction) => {
  const request = mapQueryToUserRequest(req.body);

  try {
    await processUserData(request);
    const roverPhotoUrl = await getRoverPhotoUrl();
    res.render('user.html', { roverPhotoUrl, title: 'Rover photo' });
  } catch (error) {
    next(error);
  }
};
