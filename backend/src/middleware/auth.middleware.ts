import { FastifyRequest, FastifyReply } from 'fastify';
import '@fastify/jwt';
import { AuthenticationError, AuthorizationError } from '../core/errors.js';

export interface AuthUserPayload {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: AuthUserPayload;
    user: AuthUserPayload;
  }
}

/**
 * Authentication Middleware: Extract and verify JWT token
 */
export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Authentication required. Missing or malformed Bearer token.');
    }

    const token = authHeader.substring(7);
    const decoded = await request.server.jwt.verify<AuthUserPayload>(token);

    if (!decoded || !decoded.id) {
      throw new AuthenticationError('Invalid authentication token payload.');
    }

    request.user = decoded;
  } catch (err) {
    if (err instanceof AuthenticationError) throw err;
    throw new AuthenticationError('Invalid or expired authentication token.');
  }
}

/**
 * Authorization Middleware: Require ADMIN role
 */
export async function requireAdmin(request: FastifyRequest, reply: FastifyReply) {
  await authenticate(request, reply);
  if (!request.user || request.user.role !== 'ADMIN') {
    throw new AuthorizationError('Admin access required. Action forbidden for normal users.');
  }
}
