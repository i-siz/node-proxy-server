import { Query } from 'express-serve-static-core';

export interface MeteorQuery extends Query {
  date: string | undefined;
  count_only: string | undefined;
  were_dangerous_meteors: string | undefined;
}

export interface UserQuery {
  user_id: number | undefined;
  user_name: string | undefined;
  api_key: string | undefined;
}
