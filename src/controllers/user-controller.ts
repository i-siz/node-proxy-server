import { Request, Response, NextFunction } from 'express';
import { getRoverPhotoUrl } from '../services/rover-photo-service';
const { mapQueryToUserRequest } = require('../utils');
const { userService } = require('../services');

export const postUser = async (req: Request, res: Response, next: NextFunction) => {
  const request = mapQueryToUserRequest(req.body);

  try {
    await userService.processUserData(request);
    const roverPhotoUrl = await getRoverPhotoUrl();
    res.send(`<img src="${roverPhotoUrl}">`);
  } catch (error) {
    next(error);
  }
};
