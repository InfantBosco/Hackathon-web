import { renderBaseLayout } from './base.layout.js';

export interface PaymentConfirmationTemplateData {
  teamName: string;
  teamCode: string;
  transactionId: string;
  referenceId: string;
  amount: number;
  paymentDate: string;
  payerName: string;
  status: string;
}

export function buildPaymentConfirmationTemplate(data: PaymentConfirmationTemplateData) {
  const subject = `Payment Confirmed — Receipt for Team ${data.teamName} [${data.transactionId}]`;

  const bodyContentHtml = `
    <div style="text-align: center; margin-bottom: 24px;">
      <span class="badge badge-success" style="font-size: 14px; padding: 6px 14px; background-color: #dcfce7; color: #15803d;">Payment Verified</span>
    </div>
    <h2 style="color: #0f172a; font-size: 20px; font-weight: 700; margin-top: 0; text-align: center;">Official Payment Receipt</h2>
    <p>Dear <strong>${data.payerName}</strong>,</p>
    <p>Thank you! Your payment for <strong>HackNEX 2026</strong> team registration has been verified and confirmed.</p>
    
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin: 24px 0;">
      <h3 style="color: #0f172a; font-size: 15px; font-weight: 700; margin-top: 0; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Transaction Summary</h3>
      <table style="width: 100%; font-size: 14px;">
        <tr>
          <td style="color: #64748b; padding-bottom: 8px; width: 40%;">Transaction ID:</td>
          <td style="font-weight: 700; color: #0f172a; font-family: monospace; padding-bottom: 8px;">${data.transactionId}</td>
        </tr>
        <tr>
          <td style="color: #64748b; padding-bottom: 8px;">Bank / Gateway Ref:</td>
          <td style="font-weight: 600; color: #334155; font-family: monospace; padding-bottom: 8px;">${data.referenceId}</td>
        </tr>
        <tr>
          <td style="color: #64748b; padding-bottom: 8px;">Team Name:</td>
          <td style="font-weight: 600; color: #334155; padding-bottom: 8px;">${data.teamName} (${data.teamCode})</td>
        </tr>
        <tr>
          <td style="color: #64748b; padding-bottom: 8px;">Fee Calculation:</td>
          <td style="color: #334155; padding-bottom: 8px;">4 Members × ₹600 / person</td>
        </tr>
        <tr>
          <td style="color: #64748b; padding-bottom: 8px;">Total Amount Paid:</td>
          <td style="font-weight: 800; color: #15803d; font-size: 18px; padding-bottom: 8px;">₹${data.amount.toLocaleString('en-IN')}</td>
        </tr>
        <tr>
          <td style="color: #64748b; padding-bottom: 8px;">Date & Time:</td>
          <td style="color: #334155; padding-bottom: 8px;">${data.paymentDate}</td>
        </tr>
        <tr>
          <td style="color: #64748b;">Payment Status:</td>
          <td style="font-weight: 700; color: #15803d; text-transform: uppercase;">${data.status}</td>
        </tr>
      </table>
    </div>

    <div style="padding: 16px; background-color: #f1f5f9; border-radius: 8px; border-left: 4px solid #10b981;">
      <p style="font-size: 13px; color: #334155; margin: 0;">
        🎉 <strong>Your Team is All Set!</strong> Bring a copy of this digital receipt or show this email during check-in on <strong>October 7, 2026</strong> at Karunya Campus, Coimbatore.
      </p>
    </div>
  `;

  const html = renderBaseLayout({
    title: subject,
    preheader: `Payment confirmation receipt of ₹${data.amount} for Team ${data.teamName}.`,
    bodyContentHtml,
  });

  const text = `HackNEX 2026 — Official Payment Receipt

Dear ${data.payerName},

Thank you! Your payment for HackNEX 2026 team registration has been verified and confirmed.

Transaction Summary:
- Transaction ID: ${data.transactionId}
- Gateway Ref: ${data.referenceId}
- Team: ${data.teamName} (${data.teamCode})
- Fee Structure: 4 Members × ₹600
- Total Amount Paid: ₹${data.amount}
- Date & Time: ${data.paymentDate}
- Status: ${data.status}

Please retain this receipt for event check-in on October 7–9, 2026 at Karunya Institute of Technology and Sciences.

---
HackNEX 2026 • NEXUS Club, Karunya Institute of Technology and Sciences
`;

  return { subject, html, text };
}
