import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { AppError, ErrorCode } from '../core/errors.js';
import { formatErrorResponse } from '../core/response.js';
import { settings } from '../config/settings.js';

export function errorHandler(error: FastifyError | Error, request: FastifyRequest, reply: FastifyReply) {
  request.log.error({ err: error, url: request.url }, 'API Request Error Handler caught exception');

  // Handle custom AppError instances
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send(
      formatErrorResponse(error.code, error.message, error.details)
    );
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return reply.status(400).send(
      formatErrorResponse(
        ErrorCode.VALIDATION_ERROR,
        'Request input validation failed',
        error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }))
      )
    );
  }

  // Handle Fastify built-in schema validation errors
  if ('validation' in error && error.validation) {
    return reply.status(400).send(
      formatErrorResponse(
        ErrorCode.VALIDATION_ERROR,
        error.message || 'Invalid request payload',
        error.validation
      )
    );
  }

  // Handle Fastify status code errors (e.g. 404, 429)
  const statusCode = (error as FastifyError).statusCode || 500;

  if (statusCode === 404) {
    return reply.status(404).send(
      formatErrorResponse(ErrorCode.NOT_FOUND, 'Requested resource or API endpoint not found')
    );
  }

  if (statusCode === 429) {
    return reply.status(429).send(
      formatErrorResponse(ErrorCode.RATE_LIMIT_ERROR, 'Too many requests. Rate limit exceeded.')
    );
  }

  // Generic 500 Server Error
  const message = settings.NODE_ENV === 'production' 
    ? 'An unexpected server error occurred' 
    : error.message || 'Internal Server Error';

  return reply.status(statusCode).send(
    formatErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR, message)
  );
}

export function notFoundHandler(request: FastifyRequest, reply: FastifyReply) {
  request.log.info({ url: request.url }, 'Route not found handler triggered');
  return reply.status(404).send(
    formatErrorResponse(ErrorCode.NOT_FOUND, `Route ${request.method}:${request.url} not found`)
  );
}
