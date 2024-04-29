import { HttpException } from './root.js';

export class NotFoundExceptions extends HttpException {
  constructor(message, errorCode) {
    super(message, errorCode, 404, null);
  }
}
