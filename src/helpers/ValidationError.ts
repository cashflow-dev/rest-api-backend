class ValidationError extends Error {
  public validationMessages: string[];

  public constructor(validationMessages: string[]) {
    super('ValidationError');
    this.validationMessages = validationMessages;
    Error.captureStackTrace(this, ValidationError);
  }
}

export default ValidationError;
