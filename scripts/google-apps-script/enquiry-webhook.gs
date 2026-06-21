const SHEET_NAME = "Admission Enquiries";
const HEADERS = [
  "Timestamp",
  "Parent name",
  "Child name",
  "Child age",
  "Phone",
  "Email",
  "Interested program",
  "Preferred visit date",
  "Message",
  "Page URL",
  "Status"
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const expectedSecret = PropertiesService.getScriptProperties().getProperty("ENQUIRY_SHARED_SECRET");
    const recipient = PropertiesService.getScriptProperties().getProperty("SCHOOL_ENQUIRY_EMAIL");

    if (!expectedSecret || payload.secret !== expectedSecret) {
      return jsonResponse({ ok: false, message: "Unauthorized" });
    }

    const sheet = getOrCreateSheet();
    const row = [
      payload.submittedAt || new Date().toISOString(),
      payload.parentName || "",
      payload.childName || "",
      payload.childAge || "",
      payload.phone || "",
      payload.email || "",
      payload.program || "",
      payload.preferredVisitDate || "",
      payload.message || "",
      payload.pageUrl || "",
      "New"
    ];

    sheet.appendRow(row);

    if (recipient) {
      MailApp.sendEmail({
        to: recipient,
        subject: "New admission enquiry - NextGen Kids",
        body: buildEmailText(payload),
        htmlBody: buildEmailHtml(payload)
      });
    }

    return jsonResponse({ ok: true, message: "Enquiry captured" });
  } catch (error) {
    return jsonResponse({ ok: false, message: "Unable to capture enquiry" });
  }
}

function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  return sheet;
}

function buildEmailHtml(payload) {
  return `
    <h2>New admission enquiry</h2>
    <p><strong>Parent:</strong> ${escapeHtml(payload.parentName)}</p>
    <p><strong>Child:</strong> ${escapeHtml(payload.childName)}</p>
    <p><strong>Age:</strong> ${escapeHtml(payload.childAge)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Program:</strong> ${escapeHtml(payload.program)}</p>
    <p><strong>Preferred visit date:</strong> ${escapeHtml(payload.preferredVisitDate)}</p>
    <p><strong>Message:</strong> ${escapeHtml(payload.message)}</p>
    <p><strong>Page URL:</strong> ${escapeHtml(payload.pageUrl)}</p>
  `;
}

function buildEmailText(payload) {
  return [
    "New admission enquiry",
    "",
    `Parent: ${payload.parentName || ""}`,
    `Child: ${payload.childName || ""}`,
    `Age: ${payload.childAge || ""}`,
    `Phone: ${payload.phone || ""}`,
    `Email: ${payload.email || ""}`,
    `Program: ${payload.program || ""}`,
    `Preferred visit date: ${payload.preferredVisitDate || ""}`,
    `Message: ${payload.message || ""}`,
    `Page URL: ${payload.pageUrl || ""}`
  ].join("\n");
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}
