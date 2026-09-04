import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { AuthService } from '../../services/auth.service.js';
import { EmailService } from '../../services/email.service.js';
import { formatSuccessResponse } from '../../core/response.js';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address format'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z.string().min(8, 'Confirm password is required'),
});

const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});

const resendVerificationSchema = z.object({
  email: z.string().email('Invalid email address format'),
});

const loginSchema = z.object({
  email: z.string().min(1, 'Email or Name is required'),
  password: z.string().min(1, 'Password is required'),
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address format'),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
  confirmPassword: z.string().min(8, 'Confirm password is required'),
});

export async function authRoutes(fastify: FastifyInstance) {
  const emailService = new EmailService();
  const authService = new AuthService(fastify.prisma, emailService);

  // POST /api/v1/auth/signup - User Signup
  fastify.post('/signup', {
    schema: {
      tags: ['Authentication'],
      summary: 'Register new user account (Argon2id Hashing + Email Verification)',
    },
  }, async (request, reply) => {
    const input = signupSchema.parse(request.body);
    const result = await authService.signup(input);
    return reply.status(201).send(formatSuccessResponse(result));
  });

  // POST /api/v1/auth/verify-email - Email Verification
  fastify.post('/verify-email', {
    schema: {
      tags: ['Authentication'],
      summary: 'Verify user email address using token',
    },
  }, async (request, reply) => {
    const { token } = verifyEmailSchema.parse(request.body);
    const result = await authService.verifyEmail(token);
    return reply.send(formatSuccessResponse(result));
  });

  // POST /api/v1/auth/resend-verification - Resend Verification Email
  fastify.post('/resend-verification', {
    schema: {
      tags: ['Authentication'],
      summary: 'Resend email verification link',
    },
  }, async (request, reply) => {
    const { email } = resendVerificationSchema.parse(request.body);
    const result = await authService.resendVerification(email);
    return reply.send(formatSuccessResponse(result));
  });

  // POST /api/v1/auth/login - User Login
  fastify.post('/login', {
    schema: {
      tags: ['Authentication'],
      summary: 'Authenticate user & issue JWT token',
    },
  }, async (request, reply) => {
    const input = loginSchema.parse(request.body);
    const { user } = await authService.login(input);

    // Sign JWT Token with userId, email, role
    const token = fastify.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role as 'ADMIN' | 'USER',
    });

    return reply.send(
      formatSuccessResponse({
        token,
        user,
      })
    );
  });

  // POST /api/v1/auth/forgot-password - Request Password Reset
  fastify.post('/forgot-password', {
    schema: {
      tags: ['Authentication'],
      summary: 'Request password reset token email',
    },
  }, async (request, reply) => {
    const { email } = forgotPasswordSchema.parse(request.body);
    const result = await authService.forgotPassword(email);
    return reply.send(formatSuccessResponse(result));
  });

  // POST /api/v1/auth/reset-password - Reset Password
  fastify.post('/reset-password', {
    schema: {
      tags: ['Authentication'],
      summary: 'Reset password using token',
    },
  }, async (request, reply) => {
    const input = resetPasswordSchema.parse(request.body);
    const result = await authService.resetPassword(input);
    return reply.send(formatSuccessResponse(result));
  });

  // POST /api/v1/auth/logout - Logout
  fastify.post('/logout', {
    schema: {
      tags: ['Authentication'],
      summary: 'Logout user session',
    },
  }, async (_request, reply) => {
    return reply.send(formatSuccessResponse({ message: 'Logged out successfully' }));
  });

  // GET /api/v1/auth/me - Get Authenticated User Profile
  fastify.get('/me', {
    preHandler: [fastify.authenticate],
    schema: {
      tags: ['Authentication'],
      summary: 'Get current authenticated user profile',
      security: [{ bearerAuth: [] }],
    },
  }, async (request, reply) => {
    return reply.send(formatSuccessResponse({ user: request.user }));
  });
}
