import { UserRequest } from '../utils/types/requests';

export const processUserData = (request: UserRequest) => {
  console.log(`User data to be processed: ${JSON.stringify(request)}`);
  return true;
};
