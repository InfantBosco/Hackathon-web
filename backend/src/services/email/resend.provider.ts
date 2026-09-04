import { Resend } from 'resend';
import { EmailProvider, EmailSendResult, SendEmailOptions } from './email.provider.js';
import { settings } from '../../config/settings.js';

export class ResendProvider implements EmailProvider {
  private resend: Resend;

  constructor(apiKey?: string) {
    const key = apiKey !== undefined ? apiKey : settings.RESEND_API_KEY;
    if (!key || key.includes('placeholder')) {
      throw new Error('Invalid or missing RESEND_API_KEY');
    }
    this.resend = new Resend(key);
  }

  public async sendEmail(options: SendEmailOptions): Promise<EmailSendResult> {
    try {
      const from = options.from || settings.EMAIL_FROM;
      const response = await this.resend.emails.send({
        from,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        replyTo: options.replyTo,
      });

      if (response.error) {
        return {
          success: false,
          error: response.error.message || 'Unknown Resend error',
        };
      }

      return {
        success: true,
        messageId: response.data?.id,
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Failed to dispatch email via Resend API',
      };
    }
  }
}
