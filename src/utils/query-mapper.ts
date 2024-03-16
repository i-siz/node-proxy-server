import { MeteorQuery, UserQuery } from './types/queries';

export const mapQueryToMeteorRequest = (query: MeteorQuery) => ({
  date: typeof query.date !== 'undefined' ? new Date(query.date) : null,
  countOnly: query.count_only === 'true',
  wereDangerousMeteors: query.were_dangerous_meteors === 'true',
});

export const mapQueryToUserRequest = (query: UserQuery) => ({
  userId: typeof query.user_id !== 'undefined' ? query.user_id : null,
  userName: typeof query.user_name !== 'undefined' ? query.user_name : null,
  apiKey: typeof query.api_key !== 'undefined' ? query.api_key : null,
});
