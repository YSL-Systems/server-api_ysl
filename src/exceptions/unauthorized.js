import { HttpException } from './root.js';

export class UnauthorizedExceptions extends HttpException {
  constructor(message, errorCode) {
    super(message, errorCode, 401, null);
  }
}
