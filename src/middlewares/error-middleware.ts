import { Request, Response } from 'express';

export const exceptionFilter = (
  err: { statusCode: number; message: string; errors: object[] },
  req: Request,
  res: Response,
) => {
  const errorCode = err.statusCode || 500;
  const error = {
    code: errorCode,
    message: err.message,
    errors: err.errors,
  };
  res.status(errorCode).json(error);
};

export const pageNotFoundHandler = (req: Request, res: Response) => res.status(404).json({ message: 'Page not found' });
