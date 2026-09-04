export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  DUPLICATE_RESOURCE = 'DUPLICATE_RESOURCE',
  INVALID_STATE_TRANSITION = 'INVALID_STATE_TRANSITION',
  INVALID_PAYMENT_AMOUNT = 'INVALID_PAYMENT_AMOUNT',
  PAYMENT_ERROR = 'PAYMENT_ERROR',
  PAYMENT_VERIFICATION_ERROR = 'PAYMENT_VERIFICATION_ERROR',
  REGISTRATION_CLOSED = 'REGISTRATION_CLOSED',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly details?: unknown;

  constructor(message: string, statusCode: number = 500, code: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Invalid request parameters', details?: unknown) {
    super(message, 400, ErrorCode.VALIDATION_ERROR, details);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, ErrorCode.AUTHENTICATION_ERROR);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 403, ErrorCode.AUTHORIZATION_ERROR);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, ErrorCode.NOT_FOUND);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict or duplicate entry') {
    super(message, 409, ErrorCode.DUPLICATE_RESOURCE);
  }
}

export class InvalidStateError extends AppError {
  constructor(message: string = 'Invalid state transition') {
    super(message, 422, ErrorCode.INVALID_STATE_TRANSITION);
  }
}

export class PaymentAmountError extends AppError {
  constructor(message: string = 'Incorrect payment amount calculated') {
    super(message, 400, ErrorCode.INVALID_PAYMENT_AMOUNT);
  }
}

export class PaymentVerificationError extends AppError {
  constructor(message: string = 'Payment verification failed') {
    super(message, 400, ErrorCode.PAYMENT_VERIFICATION_ERROR);
  }
}

export class RegistrationClosedError extends AppError {
  constructor(message: string = 'Registration period is currently closed') {
    super(message, 400, ErrorCode.REGISTRATION_CLOSED);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests. Please try again later.') {
    super(message, 429, ErrorCode.RATE_LIMIT_ERROR);
  }
}
