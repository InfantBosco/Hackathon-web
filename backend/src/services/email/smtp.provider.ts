import dns from 'dns';
import nodemailer, { Transporter } from 'nodemailer';
import { EmailProvider, EmailSendResult, SendEmailOptions } from './email.provider.js';
import { settings } from '../../config/settings.js';

try {
  dns.setDefaultResultOrder('ipv4first');
} catch {
  // Ignore if unsupported
}

export class SmtpProvider implements EmailProvider {
  private transporter: Transporter;

  constructor() {
    const host = settings.SMTP_HOST || 'smtp.gmail.com';
    const port = settings.SMTP_PORT || 587;
    const user = settings.SMTP_USER;
    const pass = settings.SMTP_PASS;

    const transportConfig: any = {
      host,
      port,
      secure: settings.SMTP_SECURE || port === 465,
      auth: {
        user,
        pass,
      },
    };

    if (host.includes('gmail')) {
      transportConfig.service = 'gmail';
    }

    this.transporter = nodemailer.createTransport(transportConfig);
  }

  public async sendEmail(options: SendEmailOptions): Promise<EmailSendResult> {
    try {
      const from = options.from || settings.EMAIL_FROM || `NEXUS Club <${settings.SMTP_USER}>`;
      const info = await this.transporter.sendMail({
        from,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        replyTo: options.replyTo,
      });

      console.log('✅ SMTP Email sent successfully! Message ID:', info.messageId);

      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (err: any) {
      console.error('❌ SMTP Email Dispatch Error:', err?.message || err);
      return {
        success: false,
        error: err?.message || 'Failed to send email via SMTP server',
      };
    }
  }
}
