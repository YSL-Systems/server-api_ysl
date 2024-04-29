import { HttpException } from './root.js';

export class BadRequestsExceptions extends HttpException {
  constructor(message, errorCode) {
    super(message, errorCode, 400, null);
  }
}
