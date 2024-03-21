import { processUserData } from '../../services/user-service';

const userRequest = {
  userId: 42,
  userName: 'John Galt',
  apiKey: '0123456789012345678901234567890123456789',
};

describe('user service', () => {
  it('should process user data', () => {
    const result = processUserData(userRequest);
    expect(result).toBeTruthy();
  });
});
