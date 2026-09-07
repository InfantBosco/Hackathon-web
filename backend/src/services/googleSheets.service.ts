import { settings } from '../config/settings.js';

export interface GoogleSheetsSyncPayload {
  registrationId: string;
  teamName: string;
  captainName: string;
  captainEmail: string;
  captainPhone: string;
  college: string;
  department: string;
  member2Name?: string;
  member3Name?: string;
  member4Name?: string;
  status: string;
}

export class GoogleSheetsService {
  /**
   * Post registration data to Google Apps Script Webhook
   */
  public static async syncRegistrationToSheet(payload: GoogleSheetsSyncPayload): Promise<boolean> {
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || (settings as any).GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn('⚠️ Google Sheets Webhook URL not configured. Skipping live sheet sync.');
      return false;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log(`✅ Successfully synced registration ${payload.registrationId} to Google Spreadsheet!`);
        return true;
      } else {
        console.error(`⚠️ Google Sheets sync response error status: ${response.status}`);
        return false;
      }
    } catch (err) {
      console.error('⚠️ Failed to sync registration to Google Spreadsheet:', err);
      return false;
    }
  }
}
