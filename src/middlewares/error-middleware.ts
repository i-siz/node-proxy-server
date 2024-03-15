import { Request, Response, NextFunction } from 'express';
import path from 'path';
import Exception from '../utils/exception';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const exceptionFilter = (err: Exception | Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.render(path.resolve(__dirname, '..', 'views', 'error.html'), { message: err.message });
};

export const pageNotFoundHandler = (req: Request, res: Response) =>
  res.render(path.resolve(__dirname, '../views', 'page-not-found.html'), { title: 'Page not found' });