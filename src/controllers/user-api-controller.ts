import { Request, Response, NextFunction } from 'express';
import { getRoverPhotoUrl } from '../services/rover-photo-service';
import { processUserData } from '../services/user-service';

const { mapQueryToUserRequest } = require('../utils/query-mapper');

export const postUser = async (req: Request, res: Response, next: NextFunction) => {
  const request = mapQueryToUserRequest(req.body);

  try {
    await processUserData(request);
    const roverPhotoUrl = await getRoverPhotoUrl();
    res.send(`<img src="${roverPhotoUrl}">`);
  } catch (error) {
    next(error);
  }
};
