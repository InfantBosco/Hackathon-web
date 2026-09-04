import { PrismaClient, Payment, PaymentStatus, RegistrationStatus, TeamStatus } from '@prisma/client';
import { ConflictError, NotFoundError, ValidationError, PaymentVerificationError, InvalidStateError } from '../core/errors.js';
import { ValidationService } from './validation.service.js';
import { TeamService } from './team.service.js';
import { EmailService } from './email.service.js';

export interface InitiatePaymentInput {
  registrationId: string;
  requesterUserId: string;
  provider?: string;
}

export interface VerifyPaymentInput {
  paymentId: string;
  transactionId: string;
  providerReference?: string;
}

export class PaymentService {
  constructor(private prisma: PrismaClient, private teamService: TeamService, private emailService?: EmailService) {}

  /**
   * Initiate a payment record for a team registration
   */
  public async initiatePayment(input: InitiatePaymentInput): Promise<Payment> {
    // 1. Retrieve Registration & Team
    const registration = await this.prisma.registration.findUnique({
      where: { registrationId: input.registrationId },
      include: {
        team: {
          include: {
            participants: true,
          },
        },
      },
    });

    if (!registration) {
      throw new NotFoundError(`Registration not found with ID ${input.registrationId}`);
    }

    // 2. Verify Captain Ownership
    await this.teamService.verifyCaptainOwnership(registration.teamId, input.requesterUserId);

    // 3. Validate Team Participant Count (Must be 4)
    const participantCount = registration.team.participants.length;
    ValidationService.validateTeamSizeForRegistration(participantCount);

    // 4. Calculate Authoritative Payment Amount (₹600 x 4 = ₹2,400)
    const calculatedAmount = ValidationService.calculateRegistrationFee(participantCount);

    // 5. Create Payment record & update status atomically
    const payment = await this.prisma.$transaction(async (tx) => {
      const createdPayment = await tx.payment.create({
        data: {
          registrationId: registration.id,
          amount: calculatedAmount, // Authoritative ₹2,400
          currency: 'INR',
          provider: input.provider || 'KARUNYA',
          status: PaymentStatus.INITIATED,
        },
      });

      await tx.registration.update({
        where: { id: registration.id },
        data: { status: RegistrationStatus.PAYMENT_PENDING },
      });

      await tx.team.update({
        where: { id: registration.teamId },
        data: { status: TeamStatus.PAYMENT_PENDING },
      });

      return createdPayment;
    });

    return payment;
  }

  /**
   * Transactional Atomic Payment Verification & Final Registration Confirmation
   */
  public async verifyPaymentTransaction(input: VerifyPaymentInput): Promise<{ payment: Payment; isConfirmed: boolean }> {
    // 1. Check if Transaction ID is already used globally
    const existingTx = await this.prisma.payment.findUnique({
      where: { transactionId: input.transactionId },
    });

    if (existingTx && existingTx.id !== input.paymentId && existingTx.status === PaymentStatus.VERIFIED) {
      throw new ConflictError(`Transaction ID '${input.transactionId}' has already been processed.`);
    }

    // 2. Retrieve Payment with Registration & Team
    const payment = await this.prisma.payment.findUnique({
      where: { id: input.paymentId },
      include: {
        registration: {
          include: {
            team: {
              include: {
                participants: true,
                captain: true,
              },
            },
          },
        },
      },
    });

    if (!payment) {
      throw new NotFoundError(`Payment record not found with ID ${input.paymentId}`);
    }

    // Idempotency: If already verified, return safely
    if (payment.status === PaymentStatus.VERIFIED) {
      return { payment, isConfirmed: true };
    }

    // 3. Verify Participant Count == 4
    const participantCount = payment.registration.team.participants.length;
    if (participantCount !== ValidationService.MANDATORY_TEAM_SIZE) {
      throw new PaymentVerificationError(
        `Verification failed: team contains ${participantCount} participant(s), expected ${ValidationService.MANDATORY_TEAM_SIZE}`
      );
    }

    // 4. Verify Payment Amount == ₹2,400 (₹600 per person x 4)
    ValidationService.validatePaymentAmount(participantCount, payment.amount);

    const now = new Date();

    // 5. ATOMIC DATABASE TRANSACTION (BEGIN TRANSACTION ... COMMIT / ROLLBACK)
    const result = await this.prisma.$transaction(async (tx) => {
      // Step A: Update Payment -> VERIFIED
      const updatedPayment = await tx.payment.update({
        where: { id: payment.id },
        data: {
          transactionId: input.transactionId,
          providerReference: input.providerReference || null,
          status: PaymentStatus.VERIFIED,
          verifiedAt: now,
        },
      });

      // Step B: Update Registration -> PAYMENT_VERIFIED -> CONFIRMED
      await tx.registration.update({
        where: { id: payment.registrationId },
        data: {
          status: RegistrationStatus.CONFIRMED,
          confirmedAt: now,
        },
      });

      // Step C: Update Team -> CONFIRMED
      await tx.team.update({
        where: { id: payment.registration.teamId },
        data: {
          status: TeamStatus.CONFIRMED,
        },
      });

      return updatedPayment;
    });

    // Step 6: Async Email Dispatch for Payment Contract (Safe & Non-blocking)
    if (this.emailService && payment.registration.team.captain) {
      try {
        const captain = payment.registration.team.captain;
        const team = payment.registration.team;

        await this.emailService.sendPaymentConfirmationEmail(captain.email, {
          teamName: team.teamName,
          teamCode: team.id.slice(0, 8).toUpperCase(),
          transactionId: result.transactionId || input.transactionId,
          referenceId: result.providerReference || 'N/A',
          amount: result.amount,
          paymentDate: result.verifiedAt ? result.verifiedAt.toISOString() : now.toISOString(),
          payerName: captain.name,
          status: result.status,
        });
      } catch (err) {
        console.error('⚠️ Non-critical error: Failed to dispatch payment receipt email:', err);
      }
    }

    return { payment: result, isConfirmed: true };
  }
}
