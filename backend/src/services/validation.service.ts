import { FoodPreference } from '@prisma/client';
import { ValidationError, PaymentAmountError } from '../core/errors.js';

export class ValidationService {
  public static readonly REGISTRATION_FEE_PER_PERSON = 600;
  public static readonly MANDATORY_TEAM_SIZE = 4;

  /**
   * Authoritatively calculate registration fee based on participant count.
   * 1 participant = ₹600, 4 participants = ₹2,400.
   */
  public static calculateRegistrationFee(participantCount: number): number {
    if (participantCount <= 0) {
      throw new ValidationError('Participant count must be greater than 0');
    }
    return participantCount * this.REGISTRATION_FEE_PER_PERSON;
  }

  /**
   * Validate payment amount matches calculated amount for participant count
   */
  public static validatePaymentAmount(participantCount: number, providedAmount: number): void {
    const expectedAmount = this.calculateRegistrationFee(participantCount);
    if (providedAmount !== expectedAmount) {
      throw new PaymentAmountError(
        `Invalid payment amount: expected ₹${expectedAmount} for ${participantCount} participant(s), received ₹${providedAmount}`
      );
    }
  }

  /**
   * Validate team has exactly 4 participants for confirmation/payment
   */
  public static validateTeamSizeForRegistration(participantCount: number): void {
    if (participantCount !== this.MANDATORY_TEAM_SIZE) {
      throw new ValidationError(
        `Team registration requires EXACTLY ${this.MANDATORY_TEAM_SIZE} participants. Currently has ${participantCount}.`
      );
    }
  }

  /**
   * Validate participant email format
   */
  public static validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      throw new ValidationError(`Invalid email format: ${email}`);
    }
  }

  /**
   * Validate phone format (10-15 digits)
   */
  public static validatePhone(phone: string): void {
    const phoneRegex = /^[0-9+--\s()]{10,15}$/;
    if (!phone || !phoneRegex.test(phone.trim())) {
      throw new ValidationError(`Invalid phone number format: ${phone}`);
    }
  }

  /**
   * Validate Food Preference
   */
  public static validateFoodPreference(preference: string): FoodPreference {
    if (preference !== FoodPreference.VEG && preference !== FoodPreference.NON_VEG) {
      throw new ValidationError(`Invalid food preference. Must be VEG or NON_VEG.`);
    }
    return preference as FoodPreference;
  }
}
