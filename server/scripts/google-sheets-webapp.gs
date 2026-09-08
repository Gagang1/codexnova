/**
 * Codex Nova — Google Apps Script for Enroll / Talk to a Mentor forms.
 *
 * Setup (one-time):
 * 1. Open this Google Sheet:
 *    https://docs.google.com/spreadsheets/d/1Rtq6LbQ9IEdtLU_-Sxrm36V1dgw4dgG7-9zDsX8k0qQ/edit
 * 2. Extensions → Apps Script
 * 3. Delete any placeholder code, paste this entire file, Save
 * 4. Deploy → Manage deployments → Edit (pencil) → New version → Deploy
 *    (or New deployment → Type: Web app, Execute as: Me, Who has access: Anyone)
 * 5. Keep GOOGLE_SHEETS_WEBAPP_URL in server/.env pointing at the web app URL
 * 6. Restart the API server
 *
 * Tabs:
 * - Leads     → Enroll Now form
 * - Enquiry   → Talk to a Mentor form
 *
 * Do not put this URL in frontend / client code.
 */

const LEADS_SHEET = 'Leads';
const ENQUIRY_SHEET = 'Enquiry';
const DEFAULT_SHEET_ID = '1Rtq6LbQ9IEdtLU_-Sxrm36V1dgw4dgG7-9zDsX8k0qQ';

const LEADS_HEADERS = [
  'Timestamp',
  'Type',
  'Full Name',
  'Email',
  'Phone',
  'City',
  'College',
  'Degree',
  'Branch',
  'Year',
  'Course',
  'Preferred Mode',
  'Message',
];

const ENQUIRY_HEADERS = [
  'Timestamp',
  'Type',
  'Full Name',
  'Email',
  'Phone',
  'Subject',
  'Message',
];

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const tabName = resolveTabName_(data);
    const sheet = getOrCreateSheet_(data.sheetId || DEFAULT_SHEET_ID, tabName);

    if (tabName === ENQUIRY_SHEET) {
      sheet.appendRow([
        data.timestamp || new Date().toISOString(),
        data.type || 'Talk to a Mentor',
        data.fullName || data.name || '',
        data.email || '',
        data.phone || '',
        data.subject || '',
        data.message || '',
      ]);
    } else {
      sheet.appendRow([
        data.timestamp || new Date().toISOString(),
        data.type || 'Enroll Now',
        data.fullName || data.name || '',
        data.email || '',
        data.phone || '',
        data.city || '',
        data.college || '',
        data.degree || '',
        data.branch || '',
        data.year || '',
        data.course || '',
        data.preferredMode || '',
        data.message || '',
      ]);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, sheet: tabName }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(error) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, service: 'Codex Nova Leads & Enquiry' }),
  ).setMimeType(ContentService.MimeType.JSON);
}

function resolveTabName_(data) {
  const explicit = String(data.sheetName || data.tab || '').trim();
  if (explicit) return explicit;

  const type = String(data.type || '').toLowerCase();
  if (type.includes('mentor') || type.includes('contact') || type.includes('enquiry') || type.includes('inquiry')) {
    return ENQUIRY_SHEET;
  }
  return LEADS_SHEET;
}

function getOrCreateSheet_(sheetId, tabName) {
  const spreadsheet = SpreadsheetApp.openById(String(sheetId));
  let sheet = spreadsheet.getSheetByName(tabName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(tabName);
    const headers = tabName === ENQUIRY_SHEET ? ENQUIRY_HEADERS : LEADS_HEADERS;
    sheet.appendRow(headers);
  } else if (sheet.getLastRow() === 0) {
    const headers = tabName === ENQUIRY_SHEET ? ENQUIRY_HEADERS : LEADS_HEADERS;
    sheet.appendRow(headers);
  }
  return sheet;
}
