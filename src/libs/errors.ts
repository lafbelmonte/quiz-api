class ValidationError extends Error {
  public readonly statusCode: number;
  public readonly errors: string[];

  constructor(message: string, errors?: string[]) {
    super(message);

    this.name = 'VALIDATION_ERROR';

    Error.captureStackTrace(this, this.constructor);

    this.statusCode = 400;
    this.errors = errors ? errors : [this.message];
  }
}

class NotFoundError extends Error {
  public readonly statusCode: number;
  public readonly errors: string[];

  constructor(message: string, errors?: string[]) {
    super(message);

    this.name = 'NOT_FOUND_ERROR';

    Error.captureStackTrace(this, this.constructor);

    this.statusCode = 404;
    this.errors = errors ? errors : [this.message];
  }
}

export { ValidationError, NotFoundError };
