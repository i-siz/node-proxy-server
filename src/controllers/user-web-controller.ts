import { Request, Response, NextFunction } from 'express';
import { getRoverPhotoUrl } from '../services/rover-photo-service';
const { mapQueryToUserRequest } = require('../utils');
const { userService } = require('../services');

export const displayRover = async (req: Request, res: Response, next: NextFunction) => {
  const request = mapQueryToUserRequest(req.body);

  try {
    await userService.processUserData(request);
    const roverPhotoUrl = await getRoverPhotoUrl();
    res.render('user.html', { roverPhotoUrl, title: 'Rover photo' });
  } catch (error) {
    next(error);
  }
};
