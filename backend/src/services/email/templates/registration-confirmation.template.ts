import { renderBaseLayout } from './base.layout.js';

export interface TeamMemberInfo {
  name: string;
  email: string;
  role: string;
}

export interface RegistrationConfirmationTemplateData {
  teamName: string;
  teamCode: string;
  trackTitle: string;
  leaderName: string;
  members: TeamMemberInfo[];
}

export function buildRegistrationConfirmationTemplate(data: RegistrationConfirmationTemplateData) {
  const subject = `Registration Confirmed — Team ${data.teamName} [${data.teamCode}]`;

  const memberRowsHtml = data.members
    .map(
      (m, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${m.name}</strong></td>
        <td>${m.email}</td>
        <td><span class="badge ${m.role.toLowerCase().includes('leader') ? 'badge-info' : 'badge-success'}">${m.role}</span></td>
      </tr>
    `
    )
    .join('');

  const bodyContentHtml = `
    <div style="text-align: center; margin-bottom: 24px;">
      <span class="badge badge-success" style="font-size: 14px; padding: 6px 14px;">Registration Submitted</span>
    </div>
    <h2 style="color: #0f172a; font-size: 20px; font-weight: 700; margin-top: 0; text-align: center;">Team Registration Successful!</h2>
    <p>Congratulations! Your team <strong>${data.teamName}</strong> has been registered for <strong>HackNEX 2026</strong>.</p>
    
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 24px 0;">
      <table style="width: 100%; font-size: 14px;">
        <tr>
          <td style="color: #64748b; padding-bottom: 8px; width: 35%;">Team Name:</td>
          <td style="font-weight: 700; color: #0f172a; padding-bottom: 8px;">${data.teamName}</td>
        </tr>
        <tr>
          <td style="color: #64748b; padding-bottom: 8px;">Unique Team Code:</td>
          <td style="font-weight: 700; color: #0284c7; font-family: monospace; font-size: 16px; padding-bottom: 8px;">${data.teamCode}</td>
        </tr>
        <tr>
          <td style="color: #64748b; padding-bottom: 8px;">Selected Track:</td>
          <td style="font-weight: 600; color: #334155; padding-bottom: 8px;">${data.trackTitle}</td>
        </tr>
        <tr>
          <td style="color: #64748b;">Team Leader:</td>
          <td style="font-weight: 600; color: #334155;">${data.leaderName}</td>
        </tr>
      </table>
    </div>

    <h3 style="color: #0f172a; font-size: 16px; font-weight: 700; margin-top: 28px;">Team Roster (Exactly 4 Members):</h3>
    <table class="table-container">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        ${memberRowsHtml}
      </tbody>
    </table>

    <div style="margin-top: 24px; padding: 16px; background-color: #e0f2fe; border-radius: 8px; border-left: 4px solid #0284c7;">
      <p style="font-size: 13px; color: #0369a1; margin: 0;">
        📍 <strong>Next Steps:</strong> Complete the registration payment of <strong>₹2,400</strong> (₹600 × 4 members) to confirm your slot for the offline event at Karunya Campus on October 7–9, 2026.
      </p>
    </div>
  `;

  const html = renderBaseLayout({
    title: subject,
    preheader: `Team ${data.teamName} registration for HackNEX 2026 is submitted.`,
    bodyContentHtml,
  });

  const memberTextList = data.members.map((m, idx) => `${idx + 1}. ${m.name} (${m.email}) - ${m.role}`).join('\n');

  const text = `HackNEX 2026 — Team Registration Confirmation

Congratulations! Your team ${data.teamName} has been successfully registered for HackNEX 2026.

Team Details:
- Team Name: ${data.teamName}
- Unique Team Code: ${data.teamCode}
- Selected Track: ${data.trackTitle}
- Team Leader: ${data.leaderName}

Team Roster:
${memberTextList}

Next Steps:
Complete the registration payment of ₹2,400 (₹600 × 4 members) to lock in your spot for October 7–9, 2026.

---
HackNEX 2026 • NEXUS Club, Karunya Institute of Technology and Sciences
`;

  return { subject, html, text };
}
