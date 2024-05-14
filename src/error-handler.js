import { ZodError } from 'zod';
import { InternalException } from './exceptions/internal-exception.js';
import { ErrorCode, ErrorMessage, HttpException } from './exceptions/root.js';
import { UnprocessableEntity } from './exceptions/validation.js';

export const errorHandler = (method) => {
  return async (req, res, next) => {
    try {
      await method(req, res, next);
    } catch (error) {
      let exception;

      console.log('errror', error);

      if (error instanceof HttpException) {
        exception = error;
      } else {
        if (error instanceof ZodError) {
          exception = new UnprocessableEntity(ErrorMessage.UNPROCESSABLE_ENTITY, ErrorCode.UNPROCESSABLE_ENTITY);
        } else {
          exception = new InternalException(ErrorMessage.INTERNAL_EXCEPTION, error, ErrorCode.INTERNAL_EXCEPTION);
        }
      }

      next(exception);
    }
  };
};
