import { renderBaseLayout } from './base.layout.js';

export interface VerificationTemplateData {
  name: string;
  verificationUrl: string;
}

export function buildVerificationTemplate(data: VerificationTemplateData) {
  const subject = 'Verify your HackNEX 2026 Account Email';

  const bodyContentHtml = `
    <h2 style="color: #0f172a; font-size: 20px; font-weight: 700; margin-top: 0;">Welcome to HackNEX 2026!</h2>
    <p>Hello <strong>${data.name}</strong>,</p>
    <p>Thank you for creating an account for HackNEX 2026, organized by NEXUS Club at Karunya Institute of Technology and Sciences.</p>
    <p>Please click the button below to verify your email address and activate your account. This step is required before creating or joining a team.</p>
    
    <div style="margin: 32px 0; text-align: center;">
      <a href="${data.verificationUrl}" class="btn-primary">Verify Email Address</a>
    </div>

    <p style="font-size: 13px; color: #64748b;">Or copy and paste this verification URL into your browser:</p>
    <p style="font-size: 12px; color: #0284c7; word-break: break-all;"><a href="${data.verificationUrl}" style="color: #0284c7;">${data.verificationUrl}</a></p>
    
    <div style="margin-top: 28px; padding: 12px 16px; background-color: #f1f5f9; border-left: 4px solid #0284c7; border-radius: 4px;">
      <p style="font-size: 12px; color: #475569; margin: 0;">⚠️ <strong>Note:</strong> This verification link will expire in <strong>24 hours</strong>. If you did not sign up for HackNEX 2026, please ignore this email.</p>
    </div>
  `;

  const html = renderBaseLayout({
    title: subject,
    preheader: 'Verify your email to complete your HackNEX 2026 account setup.',
    bodyContentHtml,
  });

  const text = `Welcome to HackNEX 2026!

Hello ${data.name},

Thank you for creating an account for HackNEX 2026, organized by NEXUS Club at Karunya Institute of Technology and Sciences.

Please click or copy the following link into your browser to verify your email address:
${data.verificationUrl}

Note: This verification link will expire in 24 hours.

If you did not sign up for HackNEX 2026, please ignore this email.

---
HackNEX 2026 • NEXUS Club, Karunya Institute of Technology and Sciences
`;

  return { subject, html, text };
}
