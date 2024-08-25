class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = 'MMCOOPERRORS';
    this.statusCode = statusCode;
    this.isOperational = true;
    this.date = new Date();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad Request', statusCode = 400) {
    super(message, statusCode);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Something wrong happened.', statusCode = 500) {
    super(message, statusCode);
  }
}

export class UnAuthorizedError extends AppError {
  constructor(message = 'Not Authorized access', statusCode = 401) {
    super(message, statusCode);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', statusCode = 403) {
    super(message, statusCode);
  }
}
export class ExpectationFailedError extends AppError {
  constructor(message = 'Expected inputs were not supplied', statusCode = 417) {
    super(message, statusCode);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', statusCode = 404) {
    super(message, statusCode);
  }
}
export class InvalidError extends AppError {
  constructor(message = 'Invalid Input', statusCode = 422) {
    super(message, statusCode);
  }
}
export class DuplicateError extends AppError {
  constructor(message = 'Duplicate value', statusCode = 406) {
    super(message, statusCode);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict Error', statusCode = 409) {
    super(message, statusCode);
  }
}

export class OkMalformedError extends AppError {
  constructor(message = 'ok', statusCode = 200) {
    super(message, statusCode);
  }
}
