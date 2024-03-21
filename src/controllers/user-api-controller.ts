import { Response, NextFunction } from 'express';
import { getRoverPhotoUrl } from '../services/rover-photo-service';
import { processUserData } from '../services/user-service';
import { mapQueryToUserRequest } from '../utils/mappers/query-mapper';
import { TypedRequestBody } from '../utils/types/typed-requests';
import { UserQuery } from '../utils/types/queries';

export const postUser = async (req: TypedRequestBody<UserQuery>, res: Response, next: NextFunction) => {
  const request = mapQueryToUserRequest(req.body);

  try {
    processUserData(request);
    const roverPhotoUrl = await getRoverPhotoUrl();
    res.send(`<img src="${roverPhotoUrl}">`);
  } catch (error) {
    next(error);
  }
};
