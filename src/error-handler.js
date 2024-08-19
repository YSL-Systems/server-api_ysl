import { ZodError } from 'zod';
import { InternalException } from './exceptions/internal-exception.js';
import { ErrorCode, ErrorMessage, HttpException } from './exceptions/root.js';
import { BadRequestsExceptions } from './exceptions/bad-requests.js';

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
          const ErrorRequiredField = error.errors.find((err) => err.message === 'Required');

          if (ErrorRequiredField) {
            exception = new BadRequestsExceptions(
              ErrorMessage.REQUIRED_FIELDS_NOT_FOUND,
              ErrorCode.REQUIRED_FIELDS_NOT_FOUND
              // error?.issues
            );
          } else {
            exception = new BadRequestsExceptions(ErrorMessage.FIELDS_UNVALID, ErrorCode.FIELDS_UNVALID);
          }
        } else {
          exception = new InternalException(ErrorMessage.INTERNAL_EXCEPTION, ErrorCode.INTERNAL_EXCEPTION, error);
        }
      }

      next(exception);
    }
  };
};
