import { EmailProvider, EmailSendResult } from './email.provider.js';
import { ResendProvider } from './resend.provider.js';
import { MockEmailProvider } from './mock.provider.js';
import { settings } from '../../config/settings.js';
import {
  buildVerificationTemplate,
  VerificationTemplateData,
  buildPasswordResetTemplate,
  PasswordResetTemplateData,
  buildRegistrationConfirmationTemplate,
  RegistrationConfirmationTemplateData,
  buildPaymentConfirmationTemplate,
  PaymentConfirmationTemplateData,
  buildAnnouncementTemplate,
  AnnouncementTemplateData,
} from './templates/index.js';

import { SmtpProvider } from './smtp.provider.js';

export class EmailService {
  private provider: EmailProvider;

  constructor(customProvider?: EmailProvider) {
    if (customProvider) {
      this.provider = customProvider;
    } else if (settings.SMTP_USER && settings.SMTP_PASS) {
      this.provider = new SmtpProvider();
    } else if (
      settings.NODE_ENV !== 'test' &&
      settings.RESEND_API_KEY &&
      settings.RESEND_API_KEY.startsWith('re_') &&
      !settings.RESEND_API_KEY.includes('placeholder')
    ) {
      this.provider = new ResendProvider();
    } else {
      this.provider = new MockEmailProvider();
    }
  }

  public getProvider(): EmailProvider {
    return this.provider;
  }

  /**
   * Send Email Verification Link (24-hour expiration)
   */
  public async sendVerificationEmail(recipientEmail: string, name: string, token: string): Promise<EmailSendResult> {
    const verificationUrl = `${settings.APP_URL}/verify-email?token=${token}`;
    const templateData: VerificationTemplateData = { name, verificationUrl };
    const { subject, html, text } = buildVerificationTemplate(templateData);

    console.log(`\n==================================================`);
    console.log(`✉️  [LOCAL DEV EMAIL VERIFICATION DISPATCH]`);
    console.log(`To: ${recipientEmail}`);
    console.log(`Verification Link: ${verificationUrl}`);
    console.log(`==================================================\n`);

    return this.provider.sendEmail({
      to: recipientEmail,
      subject,
      html,
      text,
    });
  }

  /**
   * Send Password Reset Link (1-hour expiration)
   */
  public async sendPasswordResetEmail(recipientEmail: string, name: string, token: string): Promise<EmailSendResult> {
    const resetUrl = `${settings.APP_URL}/reset-password?token=${token}`;
    const templateData: PasswordResetTemplateData = { name, resetUrl };
    const { subject, html, text } = buildPasswordResetTemplate(templateData);

    console.log(`\n==================================================`);
    console.log(`✉️  [LOCAL DEV PASSWORD RESET DISPATCH]`);
    console.log(`To: ${recipientEmail}`);
    console.log(`Reset Link: ${resetUrl}`);
    console.log(`==================================================\n`);

    return this.provider.sendEmail({
      to: recipientEmail,
      subject,
      html,
      text,
    });
  }

  /**
   * Send Team Registration Confirmation Email
   */
  public async sendRegistrationConfirmationEmail(
    recipientEmail: string,
    details: RegistrationConfirmationTemplateData
  ): Promise<EmailSendResult> {
    const { subject, html, text } = buildRegistrationConfirmationTemplate(details);

    return this.provider.sendEmail({
      to: recipientEmail,
      subject,
      html,
      text,
    });
  }

  /**
   * Send Payment Confirmation Contract Email
   */
  public async sendPaymentConfirmationEmail(
    recipientEmail: string,
    details: PaymentConfirmationTemplateData
  ): Promise<EmailSendResult> {
    const { subject, html, text } = buildPaymentConfirmationTemplate(details);

    return this.provider.sendEmail({
      to: recipientEmail,
      subject,
      html,
      text,
    });
  }

  /**
   * Send Announcement / Broadcast Notice
   */
  public async sendAnnouncementEmail(
    recipientEmail: string | string[],
    details: AnnouncementTemplateData
  ): Promise<EmailSendResult> {
    const { subject, html, text } = buildAnnouncementTemplate(details);

    return this.provider.sendEmail({
      to: recipientEmail,
      subject,
      html,
      text,
    });
  }
}
