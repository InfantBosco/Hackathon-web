import { EmailProvider, EmailSendResult, SendEmailOptions } from './email.provider.js';

export interface RecordedEmail extends SendEmailOptions {
  sentAt: Date;
}

export class MockEmailProvider implements EmailProvider {
  private sentEmails: RecordedEmail[] = [];
  public shouldFail: boolean = false;
  public failureMessage: string = 'Simulated email provider dispatch error';

  public async sendEmail(options: SendEmailOptions): Promise<EmailSendResult> {
    if (this.shouldFail) {
      return {
        success: false,
        error: this.failureMessage,
      };
    }

    const recorded: RecordedEmail = {
      ...options,
      sentAt: new Date(),
    };

    this.sentEmails.push(recorded);

    const recipientStr = Array.isArray(options.to) ? options.to.join(', ') : options.to;
    console.log(`✉️ [MOCK EMAIL DISPATCH] To: ${recipientStr} | Subject: "${options.subject}"`);

    return {
      success: true,
      messageId: `mock-msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    };
  }

  public getSentEmails(): RecordedEmail[] {
    return [...this.sentEmails];
  }

  public getLastSentEmail(): RecordedEmail | undefined {
    return this.sentEmails[this.sentEmails.length - 1];
  }

  public clear(): void {
    this.sentEmails = [];
    this.shouldFail = false;
  }
}
