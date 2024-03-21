import joi from 'joi';
import { asteroidSchema, userSchema } from '../../validators/request-validators';

describe('joi schemas', () => {
  describe('asteroid schema', () => {
    it('should validate joi asteroid schema', () => {
      expect(joi.isSchema(asteroidSchema)).toBe(true);
    });
  });
  describe('user schema', () => {
    it('should validate joi user schema', () => {
      expect(joi.isSchema(userSchema)).toBe(true);
    });
  });
});
