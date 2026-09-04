import { renderBaseLayout } from './base.layout.js';

export interface PasswordResetTemplateData {
  name: string;
  resetUrl: string;
}

export function buildPasswordResetTemplate(data: PasswordResetTemplateData) {
  const subject = 'Reset your HackNEX 2026 Password';

  const bodyContentHtml = `
    <h2 style="color: #0f172a; font-size: 20px; font-weight: 700; margin-top: 0;">Password Reset Request</h2>
    <p>Hello <strong>${data.name}</strong>,</p>
    <p>We received a request to reset the password for your HackNEX 2026 account. Click the button below to choose a new secure password.</p>
    
    <div style="margin: 32px 0; text-align: center;">
      <a href="${data.resetUrl}" class="btn-primary">Reset Password</a>
    </div>

    <p style="font-size: 13px; color: #64748b;">Or copy and paste this link into your browser:</p>
    <p style="font-size: 12px; color: #0284c7; word-break: break-all;"><a href="${data.resetUrl}" style="color: #0284c7;">${data.resetUrl}</a></p>
    
    <div style="margin-top: 28px; padding: 12px 16px; background-color: #f1f5f9; border-left: 4px solid #e11d48; border-radius: 4px;">
      <p style="font-size: 12px; color: #475569; margin: 0;">⏰ <strong>Security Notice:</strong> This reset link is valid for <strong>1 hour</strong> only. If you did not request a password reset, your account is safe and you can safely disregard this email.</p>
    </div>
  `;

  const html = renderBaseLayout({
    title: subject,
    preheader: 'Instructions to reset your HackNEX 2026 account password.',
    bodyContentHtml,
  });

  const text = `HackNEX 2026 Password Reset Request

Hello ${data.name},

We received a request to reset the password for your HackNEX 2026 account.

Please click or copy the following link into your browser to reset your password:
${data.resetUrl}

Security Notice: This link will expire in 1 hour. If you did not request a password reset, please ignore this email.

---
HackNEX 2026 • NEXUS Club, Karunya Institute of Technology and Sciences
`;

  return { subject, html, text };
}
