import { Query } from 'express-serve-static-core';

export interface MeteorQuery extends Query {
  date?: string;
  count_only?: string;
  were_dangerous_meteors?: string;
}

export interface UserQuery {
  user_id?: number;
  user_name?: string;
  api_key?: string;
}
