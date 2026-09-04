import { PrismaClient, User } from '@prisma/client';
import { ConflictError, ValidationError, AuthenticationError, NotFoundError } from '../core/errors.js';
import { normalizeEmail, trimString } from '../utils/normalization.js';
import { hashPassword, verifyPassword, generateSecureToken, hashToken } from '../utils/crypto.js';
import { EmailService } from './email.service.js';

export interface SignupInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ResetPasswordInput {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export class AuthService {
  constructor(private prisma: PrismaClient, private emailService: EmailService) {}

  /**
   * Account Signup
   */
  public async signup(input: SignupInput) {
    const name = trimString(input.name);
    const email = normalizeEmail(input.email);

    if (!name) throw new ValidationError('Name is required');
    if (!email) throw new ValidationError('Email is required');

    // Password Policy: Minimum 8 characters
    if (!input.password || input.password.length < 8) {
      throw new ValidationError('Password must be at least 8 characters long');
    }

    // Confirm password validation
    if (input.password !== input.confirmPassword) {
      throw new ValidationError('Password and confirm password do not match');
    }

    // Check Duplicate Email
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (existingUser.emailVerified) {
        throw new ConflictError('An account with this email already exists and is verified. Please log in.');
      }

      // Clean up previous unverified account to allow fresh signup dispatch
      await this.prisma.$transaction(async (tx) => {
        await tx.verification.deleteMany({
          where: { identifier: `email_verification:${existingUser.id}` },
        });
        await tx.user.delete({
          where: { id: existingUser.id },
        });
      });
    }

    // Hash Password with Argon2id
    const passwordHash = await hashPassword(input.password);

    // Create User & Account atomically
    const { createdUser, rawToken } = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          emailVerified: false,
        },
      });

      await tx.account.create({
        data: {
          userId: user.id,
          accountId: user.id,
          providerId: 'credential',
          password: passwordHash,
        },
      });

      // Generate 24-hour verification token
      const rawToken = generateSecureToken();
      const tokenValueHash = hashToken(rawToken);
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      await tx.verification.create({
        data: {
          identifier: `email_verification:${user.id}`,
          value: tokenValueHash,
          expiresAt,
        },
      });

      return { createdUser: user, rawToken };
    });

    // Send Verification Email outside of database transaction
    await this.emailService.sendVerificationEmail(email, name, rawToken);

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      emailVerified: createdUser.emailVerified,
    };
  }

  /**
   * Email Verification
   */
  public async verifyEmail(rawToken: string) {
    if (!rawToken || !rawToken.trim()) {
      throw new ValidationError('Verification token is required');
    }

    const tokenValueHash = hashToken(rawToken);
    const now = new Date();

    // Find verification record
    const verification = await this.prisma.verification.findFirst({
      where: {
        value: tokenValueHash,
        expiresAt: { gt: now },
      },
    });

    if (!verification || !verification.identifier.startsWith('email_verification:')) {
      throw new ValidationError('Invalid or expired verification token');
    }

    const userId = verification.identifier.split(':')[1];

    // Activate account
    const user = await this.prisma.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { emailVerified: true },
      });

      await tx.verification.delete({
        where: { id: verification.id },
      });

      return updatedUser;
    });

    return {
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
      message: 'Email verified successfully. Account is now active.',
    };
  }

  /**
   * Resend Verification Email
   */
  public async resendVerification(rawEmail: string) {
    const email = normalizeEmail(rawEmail);
    if (!email) throw new ValidationError('Email is required');

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.emailVerified) {
      // Safe response to prevent email enumeration
      return { message: 'If an unverified account exists, a new verification email has been sent.' };
    }

    const identifier = `email_verification:${user.id}`;

    // Invalidate previous verification tokens
    await this.prisma.verification.deleteMany({
      where: { identifier },
    });

    // Generate new 24-hour verification token
    const rawToken = generateSecureToken();
    const tokenValueHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await this.prisma.verification.create({
      data: {
        identifier,
        value: tokenValueHash,
        expiresAt,
      },
    });

    await this.emailService.sendVerificationEmail(user.email, user.name, rawToken);

    return { message: 'If an unverified account exists, a new verification email has been sent.' };
  }

  /**
   * Account Login
   */
  public async login(input: LoginInput) {
    const rawIdentifier = trimString(input.email);
    if (!rawIdentifier) throw new ValidationError('Email or Name is required');
    if (!input.password) throw new ValidationError('Password is required');

    const normalizedEmail = normalizeEmail(rawIdentifier);

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: normalizedEmail || rawIdentifier },
          { name: { equals: rawIdentifier, mode: 'insensitive' } },
        ],
      },
      include: {
        accounts: true,
        admin: true,
      },
    });

    if (!user || !user.accounts.length || !user.accounts[0].password) {
      throw new AuthenticationError('Invalid email, name or password');
    }

    // Verify Password Hash via Argon2id
    const isPasswordValid = await verifyPassword(user.accounts[0].password, input.password);
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Check Role (ADMIN if in Admin table and active, else USER)
    const role = user.admin && user.admin.isActive ? 'ADMIN' : 'USER';

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        role,
      },
    };
  }

  /**
   * Forgot Password
   */
  public async forgotPassword(rawEmail: string) {
    const email = normalizeEmail(rawEmail);
    if (!email) throw new ValidationError('Email is required');

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { message: 'If an account exists for this email, password reset instructions have been sent.' };
    }

    const identifier = `password_reset:${user.id}`;

    // Invalidate existing reset tokens
    await this.prisma.verification.deleteMany({
      where: { identifier },
    });

    // Generate 1-hour reset token
    const rawToken = generateSecureToken();
    const tokenValueHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.prisma.verification.create({
      data: {
        identifier,
        value: tokenValueHash,
        expiresAt,
      },
    });

    await this.emailService.sendPasswordResetEmail(user.email, user.name, rawToken);

    return { message: 'If an account exists for this email, password reset instructions have been sent.' };
  }

  /**
   * Reset Password
   */
  public async resetPassword(input: ResetPasswordInput) {
    if (!input.token || !input.token.trim()) {
      throw new ValidationError('Reset token is required');
    }

    if (!input.newPassword || input.newPassword.length < 8) {
      throw new ValidationError('Password must be at least 8 characters long');
    }

    if (input.newPassword !== input.confirmPassword) {
      throw new ValidationError('New password and confirm password do not match');
    }

    const tokenValueHash = hashToken(input.token);
    const now = new Date();

    const verification = await this.prisma.verification.findFirst({
      where: {
        value: tokenValueHash,
        expiresAt: { gt: now },
      },
    });

    if (!verification || !verification.identifier.startsWith('password_reset:')) {
      throw new ValidationError('Invalid or expired password reset token');
    }

    const userId = verification.identifier.split(':')[1];

    // Hash new password with Argon2id
    const newPasswordHash = await hashPassword(input.newPassword);

    await this.prisma.$transaction(async (tx) => {
      await tx.account.updateMany({
        where: { userId },
        data: { password: newPasswordHash },
      });

      await tx.verification.delete({
        where: { id: verification.id },
      });
    });

    return { message: 'Password reset successfully. You may now log in with your new password.' };
  }
}
