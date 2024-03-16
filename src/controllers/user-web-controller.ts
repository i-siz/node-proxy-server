import { Response, NextFunction } from 'express';
import { getRoverPhotoUrl } from '../services/rover-photo-service';
import { processUserData } from '../services/user-service';
import { mapQueryToUserRequest } from '../utils/mappers/query-mapper';
import { TypedRequestBody } from '../utils/types/typed-requests';

export const displayRover = async (
  req: TypedRequestBody<{ user_id: number; user_name: string; api_key: string }>,
  res: Response,
  next: NextFunction,
) => {
  const request = mapQueryToUserRequest(req.body);

  try {
    await processUserData(request);
    const roverPhotoUrl = await getRoverPhotoUrl();
    res.render('user.html', { roverPhotoUrl, title: 'Rover photo' });
  } catch (error) {
    next(error);
  }
};
