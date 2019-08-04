export class NotFoundError extends Error {
  public constructor() {
    super('NotFoundError');
    Error.captureStackTrace(this, NotFoundError);
  }
}

export class ValidationError extends Error {
  public validationMessages: string[];

  public constructor(validationMessages: string[]) {
    super('ValidationError');
    this.validationMessages = validationMessages;
    Error.captureStackTrace(this, ValidationError);
  }
}
