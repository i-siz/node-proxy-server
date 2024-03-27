import { Request, Response } from 'express';
import { exceptionFilter, pageNotFoundHandler } from '../../middlewares/error-middleware';

describe('error middlewares', () => {
  const req = {} as Request;
  const res = {
    render: jest.fn().mockReturnThis(),
  } as unknown as Response;
  const next = () => {};
  describe('exception filter', () => {
    it('should render error page', () => {
      const error = new Error('Something went wrong');
      exceptionFilter(error, req, res, next);
      expect(res.render).toHaveBeenCalledWith(expect.stringMatching(/\/views\/error.html$/), {
        message: error.message,
        title: 'Error',
      });
    });
  });
  describe('page not found handler', () => {
    it('should render page not found page', () => {
      pageNotFoundHandler(req, res);
      expect(res.render).toHaveBeenCalledWith(expect.stringMatching(/\/views\/page-not-found.html$/), {
        title: 'Page not found',
      });
    });
  });
});
