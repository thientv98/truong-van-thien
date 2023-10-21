import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import ErrorResponse from './interfaces/ErrorResponse';
import RequestValidators from './interfaces/RequestValidators';

export function validateRequest(validators: RequestValidators) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422);
        next(error);
      }
      next(error);
    }
  };
}

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  // next: NextFunction
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  if (err instanceof ZodError) {
    res.json({
      errors: err.issues,
      message: 'Invalid input',
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
  } else {
    res.json({
      message: err.message,
      errors: [],
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
  }
}
