import { mapQueryToMeteorRequest, mapQueryToUserRequest } from '../../../utils/mappers/query-mapper';
import { MeteorQuery, UserQuery } from '../../../utils/types/queries';

describe('meteor query to meteor request mapper', () => {
  it('should map meteor query to meteor request when date is defined, count_only is defined and were_dangerous_meteors is defined', () => {
    const meteorQuery: MeteorQuery = {
      date: '2024-03-10',
      count_only: 'true',
      were_dangerous_meteors: 'true',
    };
    const result = mapQueryToMeteorRequest(meteorQuery);
    expect(result).toStrictEqual({
      date: new Date('2024-03-10'),
      countOnly: true,
      wereDangerousMeteors: true,
    });
  });
  it('should map meteor query to meteor request when date is undefined, count_only is undefined and were_dangerous_meteors is undefined', () => {
    const meteorQuery: MeteorQuery = {
      date: undefined,
      count_only: undefined,
      were_dangerous_meteors: undefined,
    };
    const result = mapQueryToMeteorRequest(meteorQuery);
    expect(result).toStrictEqual({
      date: null,
      countOnly: false,
      wereDangerousMeteors: false,
    });
  });
  it('should map meteor query to meteor request when date is undefined, count_only is false and were_dangerous_meteors is false', () => {
    const meteorQuery: MeteorQuery = {
      date: undefined,
      count_only: 'false',
      were_dangerous_meteors: 'false',
    };
    const result = mapQueryToMeteorRequest(meteorQuery);
    expect(result).toStrictEqual({
      date: null,
      countOnly: false,
      wereDangerousMeteors: false,
    });
  });
});

describe('user query to user request mapper', () => {
  it('should map user query to user request when all parameters are defined', () => {
    const userQuery: UserQuery = {
      user_id: 42,
      user_name: 'John Galt',
      api_key: '0123456789012345678901234567890123456789',
    };
    const result = mapQueryToUserRequest(userQuery);
    expect(result).toStrictEqual({
      userId: 42,
      userName: 'John Galt',
      apiKey: '0123456789012345678901234567890123456789',
    });
  });
  it('should map user query to user request when all parameters are undefined', () => {
    const userQuery: UserQuery = {
      user_id: undefined,
      user_name: undefined,
      api_key: undefined,
    };
    const result = mapQueryToUserRequest(userQuery);
    expect(result).toStrictEqual({
      userId: null,
      userName: null,
      apiKey: null,
    });
  });
});
