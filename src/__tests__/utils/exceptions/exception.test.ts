import Exception from '../../../utils/exceptions/exception';

describe('exception', () => {
  it('should create new exception', () => {
    const code = 500;
    const message = 'Test message';
    const exception = new Exception(code, message);
    expect(exception.code).toEqual(code);
    expect(exception.message).toEqual(message);
  });
});
