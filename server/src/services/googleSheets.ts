import { env } from '../config/env.js';

type LeadRow = Record<string, string | number | undefined | null>;

export type SheetTab = 'Leads' | 'Enquiry';

/**
 * Appends a lead row to Google Sheets via Apps Script web app.
 * Never throws — MongoDB / Sheets failures are best-effort.
 *
 * - Enroll Now → Leads tab
 * - Talk to a Mentor → Enquiry tab
 */
export async function saveLeadToGoogleSheet(
  row: LeadRow,
  sheetName: SheetTab = 'Leads',
): Promise<{ saved: boolean; reason?: string; sheet?: SheetTab }> {
  const url = env.GOOGLE_SHEETS_WEBAPP_URL.trim();
  if (!url) {
    console.warn(
      '[google-sheets] GOOGLE_SHEETS_WEBAPP_URL is not set. Lead saved to MongoDB only. Deploy server/scripts/google-sheets-webapp.gs and paste the web app URL.',
    );
    return { saved: false, reason: 'GOOGLE_SHEETS_WEBAPP_URL is not set' };
  }

  const payload = {
    ...row,
    sheetName,
    timestamp: new Date().toISOString(),
    sheetId: env.GOOGLE_SHEET_ID,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    const text = await response.text();
    if (!response.ok || /<!doctype html/i.test(text) || /<html/i.test(text)) {
      console.error('[google-sheets] Web app returned an unexpected response:', text.slice(0, 200));
      return { saved: false, reason: 'Unexpected Google Sheets response' };
    }

    if (text) {
      try {
        const parsed = JSON.parse(text) as { ok?: boolean; success?: boolean; error?: string };
        if (parsed.ok === false || parsed.success === false) {
          console.error('[google-sheets] Append failed:', parsed.error ?? parsed);
          return { saved: false, reason: parsed.error ?? 'Sheets append failed' };
        }
      } catch {
        // Non-JSON success bodies from Apps Script redirects are still treated as OK when HTTP is 200
      }
    }

    return { saved: true, sheet: sheetName };
  } catch (error) {
    console.error('[google-sheets] Request failed:', error);
    return { saved: false, reason: error instanceof Error ? error.message : 'Sheets request failed' };
  }
}
