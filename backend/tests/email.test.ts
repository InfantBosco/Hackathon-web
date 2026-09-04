import { describe, it, expect, beforeEach } from 'vitest';
import { EmailService } from '../src/services/email.service.js';
import { MockEmailProvider } from '../src/services/email/mock.provider.js';
import { ResendProvider } from '../src/services/email/resend.provider.js';
import { settings } from '../src/config/settings.js';

describe('Phase 6 — Email & Notification System Master Test Suite', () => {
  let mockProvider: MockEmailProvider;
  let emailService: EmailService;

  beforeEach(() => {
    mockProvider = new MockEmailProvider();
    emailService = new EmailService(mockProvider);
  });

  describe('Provider Architecture & Initialization', () => {
    it('should default to MockEmailProvider when no valid RESEND_API_KEY is configured', () => {
      const defaultService = new EmailService();
      expect(defaultService.getProvider()).toBeInstanceOf(MockEmailProvider);
    });

    it('should throw an error when ResendProvider is initialized without a valid API key', () => {
      expect(() => new ResendProvider('')).toThrow('Invalid or missing RESEND_API_KEY');
      expect(() => new ResendProvider('placeholder_key')).toThrow('Invalid or missing RESEND_API_KEY');
    });

    it('should record sent emails in MockEmailProvider for test verification', async () => {
      const result = await emailService.sendVerificationEmail('test@example.com', 'Test User', 'token123');

      expect(result.success).toBe(true);
      expect(result.messageId).toBeDefined();

      const sent = mockProvider.getSentEmails();
      expect(sent.length).toBe(1);
      expect(sent[0].to).toBe('test@example.com');
      expect(sent[0].subject).toContain('Verify your HackNEX 2026 Account Email');
    });

    it('should support clearing mock email records', async () => {
      await emailService.sendVerificationEmail('user1@example.com', 'User One', 'tok1');
      expect(mockProvider.getSentEmails().length).toBe(1);

      mockProvider.clear();
      expect(mockProvider.getSentEmails().length).toBe(0);
    });

    it('should handle email dispatch failures gracefully when provider fails', async () => {
      mockProvider.shouldFail = true;
      mockProvider.failureMessage = 'Network connection reset by peer';

      const result = await emailService.sendVerificationEmail('user@example.com', 'User', 'token123');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Network connection reset by peer');
    });
  });

  describe('Template 1: Email Verification Template', () => {
    it('should render HTML and plain-text email verification content correctly', async () => {
      await emailService.sendVerificationEmail('alex@karunya.edu', 'Alex Mercer', 'verif_sec_token_99');

      const email = mockProvider.getLastSentEmail();
      expect(email).toBeDefined();
      expect(email!.to).toBe('alex@karunya.edu');
      expect(email!.subject).toBe('Verify your HackNEX 2026 Account Email');

      // Check HTML content
      expect(email!.html).toContain('Alex Mercer');
      expect(email!.html).toContain(`${settings.APP_URL}/verify-email?token=verif_sec_token_99`);
      expect(email!.html).toContain('24 hours');
      expect(email!.html).toContain('NEXUS Club');

      // Check Plain Text fallback
      expect(email!.text).toContain('Hello Alex Mercer');
      expect(email!.text).toContain(`${settings.APP_URL}/verify-email?token=verif_sec_token_99`);
      expect(email!.text).toContain('24 hours');
    });
  });

  describe('Template 2: Password Reset Template', () => {
    it('should render HTML and plain-text password reset content correctly', async () => {
      await emailService.sendPasswordResetEmail('sam@karunya.edu', 'Sam Alt', 'reset_tok_88');

      const email = mockProvider.getLastSentEmail();
      expect(email).toBeDefined();
      expect(email!.to).toBe('sam@karunya.edu');
      expect(email!.subject).toBe('Reset your HackNEX 2026 Password');

      // Check HTML content
      expect(email!.html).toContain('Sam Alt');
      expect(email!.html).toContain(`${settings.APP_URL}/reset-password?token=reset_tok_88`);
      expect(email!.html).toContain('1 hour');
      expect(email!.html).toContain('Password Reset Request');

      // Check Plain Text fallback
      expect(email!.text).toContain('Hello Sam Alt');
      expect(email!.text).toContain(`${settings.APP_URL}/reset-password?token=reset_tok_88`);
      expect(email!.text).toContain('1 hour');
    });
  });

  describe('Template 3: Registration Confirmation Template', () => {
    it('should render team registration details, track, team code, and 4 members table', async () => {
      const details = {
        teamName: 'CyberKnights',
        teamCode: 'CYBER-404',
        trackTitle: 'AI & Autonomous Systems',
        leaderName: 'John Captain',
        members: [
          { name: 'John Captain', email: 'john@karunya.edu', role: 'Leader / Captain' },
          { name: 'Alice Developer', email: 'alice@karunya.edu', role: 'Member' },
          { name: 'Bob Designer', email: 'bob@karunya.edu', role: 'Member' },
          { name: 'Charlie Tester', email: 'charlie@karunya.edu', role: 'Member' },
        ],
      };

      await emailService.sendRegistrationConfirmationEmail('john@karunya.edu', details);

      const email = mockProvider.getLastSentEmail();
      expect(email).toBeDefined();
      expect(email!.to).toBe('john@karunya.edu');
      expect(email!.subject).toBe('Registration Confirmed — Team CyberKnights [CYBER-404]');

      // Check HTML structure
      expect(email!.html).toContain('CyberKnights');
      expect(email!.html).toContain('CYBER-404');
      expect(email!.html).toContain('AI & Autonomous Systems');
      expect(email!.html).toContain('John Captain');
      expect(email!.html).toContain('Alice Developer');
      expect(email!.html).toContain('Bob Designer');
      expect(email!.html).toContain('Charlie Tester');
      expect(email!.html).toContain('₹2,400');

      // Check Plain Text structure
      expect(email!.text).toContain('CYBER-404');
      expect(email!.text).toContain('1. John Captain (john@karunya.edu) - Leader / Captain');
      expect(email!.text).toContain('4. Charlie Tester (charlie@karunya.edu) - Member');
    });
  });

  describe('Template 4: Payment Confirmation Template', () => {
    it('should render digital receipt with transaction ID, amount ₹2,400, and verified status', async () => {
      const paymentDetails = {
        teamName: 'CyberKnights',
        teamCode: 'CYBER-404',
        transactionId: 'TXN-KARUNYA-998822',
        referenceId: 'REF-BANK-771100',
        amount: 2400,
        paymentDate: '2026-10-07T10:00:00.000Z',
        payerName: 'John Captain',
        status: 'VERIFIED',
      };

      await emailService.sendPaymentConfirmationEmail('john@karunya.edu', paymentDetails);

      const email = mockProvider.getLastSentEmail();
      expect(email).toBeDefined();
      expect(email!.to).toBe('john@karunya.edu');
      expect(email!.subject).toContain('Payment Confirmed — Receipt for Team CyberKnights');

      // Check HTML receipt fields
      expect(email!.html).toContain('TXN-KARUNYA-998822');
      expect(email!.html).toContain('REF-BANK-771100');
      expect(email!.html).toContain('₹2,400');
      expect(email!.html).toContain('VERIFIED');
      expect(email!.html).toContain('John Captain');

      // Check Text receipt fields
      expect(email!.text).toContain('TXN-KARUNYA-998822');
      expect(email!.text).toContain('₹2400');
      expect(email!.text).toContain('Status: VERIFIED');
    });
  });

  describe('Template 5: Admin Announcement Template', () => {
    it('should render announcement email with formatted paragraphs and custom action button', async () => {
      const announcementData = {
        recipientName: 'HackNEX Participant',
        title: 'Hackathon Schedule Update & Venue Guidelines',
        body: 'Welcome participants!\n\nPlease note that the inaugural ceremony starts at 9:00 AM on October 7, 2026 at the Main Auditorium.\n\nMake sure to carry your college ID cards.',
        senderName: 'HackNEX Executive Committee',
        actionUrl: 'https://hacknex.in/schedule',
        actionText: 'View Complete Schedule',
      };

      await emailService.sendAnnouncementEmail('all-participants@hacknex.in', announcementData);

      const email = mockProvider.getLastSentEmail();
      expect(email).toBeDefined();
      expect(email!.to).toBe('all-participants@hacknex.in');
      expect(email!.subject).toBe('[HackNEX 2026] Hackathon Schedule Update & Venue Guidelines');

      // Check HTML content
      expect(email!.html).toContain('Hackathon Schedule Update & Venue Guidelines');
      expect(email!.html).toContain('Welcome participants!');
      expect(email!.html).toContain('View Complete Schedule');
      expect(email!.html).toContain('https://hacknex.in/schedule');
      expect(email!.html).toContain('HackNEX Executive Committee');

      // Check Plain Text content
      expect(email!.text).toContain('View Complete Schedule: https://hacknex.in/schedule');
      expect(email!.text).toContain('HackNEX Executive Committee');
    });
  });
});
