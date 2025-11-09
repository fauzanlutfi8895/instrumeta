export class AppError extends Error {
  constructor(message: string, public readonly statusCode: number, public readonly isOperational: boolean = true, public readonly details?: any) {
    super(message);
    Error.captureStackTrace(this);
  }
}

// Not Found Error
export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

// Validation Error
export class ValidationError extends AppError {
  constructor(message: string = "Validation error", details?: any) {
    super(message, 400, true, details);
  }
}

// Authentication Error
export class AuthError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

// Forbidden Error
export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden access") {
    super(message, 403);
  }
}
