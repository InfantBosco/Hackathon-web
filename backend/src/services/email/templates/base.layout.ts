export interface BaseLayoutOptions {
  title: string;
  preheader?: string;
  bodyContentHtml: string;
}

export function renderBaseLayout(options: BaseLayoutOptions): string {
  const preheaderHtml = options.preheader
    ? `<span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; max-height:0; max-width:0; overflow:hidden; font-size:1px; line-height:1px;">${options.preheader}</span>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${options.title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      color: #334155;
    }
    .wrapper {
      width: 100%;
      background-color: #f8fafc;
      padding: 40px 0;
    }
    .main-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
      border: 1px solid #e2e8f0;
    }
    .header {
      background-color: #0f172a;
      padding: 28px 32px;
      text-align: center;
    }
    .header-logo {
      font-size: 24px;
      font-weight: 800;
      color: #38bdf8;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }
    .header-subtext {
      color: #94a3b8;
      font-size: 12px;
      letter-spacing: 0.5px;
      margin-top: 4px;
      font-weight: 500;
    }
    .content {
      padding: 36px 32px;
    }
    .footer {
      background-color: #f1f5f9;
      padding: 24px 32px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
      font-size: 12px;
      color: #64748b;
    }
    .footer p {
      margin: 4px 0;
    }
    .btn-primary {
      background-color: #0284c7;
      color: #ffffff !important;
      padding: 14px 28px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 15px;
      display: inline-block;
      text-align: center;
      transition: background-color 0.2s ease;
    }
    .table-container {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .table-container th {
      background-color: #f8fafc;
      color: #475569;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 10px 14px;
      border-bottom: 2px solid #e2e8f0;
      text-align: left;
    }
    .table-container td {
      padding: 12px 14px;
      border-bottom: 1px solid #e2e8f0;
      font-size: 14px;
      color: #334155;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .badge-success {
      background-color: #dcfce7;
      color: #166534;
    }
    .badge-info {
      background-color: #e0f2fe;
      color: #0369a1;
    }
  </style>
</head>
<body>
  ${preheaderHtml}
  <div class="wrapper">
    <div class="main-container">
      <div class="header">
        <div class="header-logo">⚡ HackNEX 2026</div>
        <div class="header-subtext">NEXUS Club • Karunya Institute of Technology and Sciences</div>
      </div>
      <div class="content">
        ${options.bodyContentHtml}
      </div>
      <div class="footer">
        <p><strong>HackNEX 2026</strong> — October 7–9, 2026</p>
        <p>Organized by NEXUS Club, Karunya Institute of Technology and Sciences</p>
        <p style="margin-top: 12px; color: #94a3b8;">If you did not initiate this request, please contact hacknex@karunya.edu</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}
