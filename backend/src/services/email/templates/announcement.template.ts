import { renderBaseLayout } from './base.layout.js';

export interface AnnouncementTemplateData {
  recipientName?: string;
  title: string;
  body: string;
  senderName?: string;
  actionUrl?: string;
  actionText?: string;
}

export function buildAnnouncementTemplate(data: AnnouncementTemplateData) {
  const subject = `[HackNEX 2026] ${data.title}`;
  const greeting = data.recipientName ? `Hello <strong>${data.recipientName}</strong>,` : 'Hello HackNEX Participant,';
  const sender = data.senderName || 'HackNEX Organizing Committee';

  // Format line breaks in body if present
  const formattedBody = data.body
    .split('\n\n')
    .map((p) => `<p style="line-height: 1.6;">${p.replace(/\n/g, '<br/>')}</p>`)
    .join('');

  const ctaHtml =
    data.actionUrl && data.actionText
      ? `
    <div style="margin: 32px 0; text-align: center;">
      <a href="${data.actionUrl}" class="btn-primary">${data.actionText}</a>
    </div>
  `
      : '';

  const bodyContentHtml = `
    <div style="text-align: center; margin-bottom: 24px;">
      <span class="badge badge-info" style="font-size: 13px; padding: 5px 12px;">Official Announcement</span>
    </div>
    <h2 style="color: #0f172a; font-size: 20px; font-weight: 700; margin-top: 0;">${data.title}</h2>
    <p>${greeting}</p>
    
    <div style="margin: 20px 0; color: #334155;">
      ${formattedBody}
    </div>

    ${ctaHtml}

    <div style="margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
      <p style="font-size: 13px; color: #64748b; margin: 0;">Regards,</p>
      <p style="font-size: 14px; font-weight: 700; color: #0f172a; margin: 4px 0 0 0;">${sender}</p>
    </div>
  `;

  const html = renderBaseLayout({
    title: subject,
    preheader: data.title,
    bodyContentHtml,
  });

  const ctaText = data.actionUrl && data.actionText ? `\n${data.actionText}: ${data.actionUrl}\n` : '';

  const text = `[HackNEX 2026] ${data.title}

${data.recipientName ? `Hello ${data.recipientName},` : 'Hello HackNEX Participant,'}

${data.body}
${ctaText}
Regards,
${sender}

---
HackNEX 2026 • NEXUS Club, Karunya Institute of Technology and Sciences
`;

  return { subject, html, text };
}
