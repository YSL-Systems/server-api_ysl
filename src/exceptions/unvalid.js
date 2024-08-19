import { HttpException } from './root.js';

export class UnvalidException extends HttpException {
  constructor(message, errorCode) {
    super(message, errorCode, 403, null);
  }
}
