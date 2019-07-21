export class NotFoundError extends Error {
  public constructor() {
    super('NotFoundError');
    Error.captureStackTrace(this, NotFoundError);
  }
}

export default NotFoundError;
