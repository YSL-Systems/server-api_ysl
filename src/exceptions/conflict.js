import { HttpException } from './root.js';

export class ConflictExceptions extends HttpException {
  constructor(message, errorCode, errors) {
    super(message, errorCode, 409, errors);
  }
}
