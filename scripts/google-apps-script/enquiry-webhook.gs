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
  "Status",
  "Admin notes",
  "Last updated"
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const expectedSecret = PropertiesService.getScriptProperties().getProperty("ENQUIRY_SHARED_SECRET");

    if (!expectedSecret || payload.secret !== expectedSecret) {
      return jsonResponse({ ok: false, message: "Unauthorized" });
    }

    if (payload.action === "listLeads") {
      return listLeads(payload);
    }

    if (payload.action === "updateLead") {
      return updateLead(payload);
    }

    return appendLead(payload);
  } catch (error) {
    return jsonResponse({ ok: false, message: "Unable to process enquiry request" });
  }
}

function appendLead(payload) {
  const recipient = PropertiesService.getScriptProperties().getProperty("SCHOOL_ENQUIRY_EMAIL");
  const sheet = getOrCreateSheet();
  const rowByHeader = {
    "Timestamp": payload.submittedAt || new Date().toISOString(),
    "Parent name": payload.parentName || "",
    "Child name": payload.childName || "",
    "Child age": payload.childAge || "",
    "Phone": plainText(payload.phone),
    "Email": payload.email || "",
    "Interested program": payload.program || "",
    "Preferred visit date": payload.preferredVisitDate || "",
    "Message": payload.message || "",
    "Page URL": payload.pageUrl || "",
    "Status": "New",
    "Admin notes": "",
    "Last updated": ""
  };

  sheet.appendRow(HEADERS.map(function(header) {
    return rowByHeader[header] || "";
  }));

  let emailSent = false;

  if (recipient) {
    try {
      MailApp.sendEmail({
        to: recipient,
        subject: "New admission enquiry - NextGen Kids",
        body: buildEmailText(payload),
        htmlBody: buildEmailHtml(payload)
      });
      emailSent = true;
    } catch (error) {
      console.error("Lead saved, but email alert failed: " + error);
    }
  }

  return jsonResponse({
    ok: true,
    message: emailSent || !recipient
      ? "Enquiry captured"
      : "Enquiry captured, but email alert could not be sent"
  });
}

function listLeads(payload) {
  const sheet = getOrCreateSheet();
  const headerMap = getHeaderMap(sheet);
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  if (lastRow < 2) {
    return jsonResponse({ ok: true, leads: [] });
  }

  const limit = Math.min(Number(payload.limit || 200), 500);
  const values = sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues();
  const leads = values.map(function(row, index) {
    return leadFromRow(row, headerMap, index + 2);
  }).reverse().slice(0, limit);

  return jsonResponse({ ok: true, leads: leads });
}

function updateLead(payload) {
  const sheet = getOrCreateSheet();
  const headerMap = getHeaderMap(sheet);
  const rowNumber = Number(payload.rowNumber);

  if (!rowNumber || rowNumber < 2 || rowNumber > sheet.getLastRow()) {
    return jsonResponse({ ok: false, message: "Lead row was not found" });
  }

  setCellByHeader(sheet, headerMap, rowNumber, "Status", payload.status || "New");
  setCellByHeader(sheet, headerMap, rowNumber, "Admin notes", payload.notes || "");
  setCellByHeader(sheet, headerMap, rowNumber, "Last updated", new Date().toISOString());

  const row = sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn()).getValues()[0];

  return jsonResponse({ ok: true, lead: leadFromRow(row, headerMap, rowNumber) });
}

function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    return sheet;
  }

  ensureHeaders(sheet);

  return sheet;
}

function ensureHeaders(sheet) {
  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  const existing = sheet.getRange(1, 1, 1, lastColumn).getValues()[0].map(function(header) {
    return String(header || "");
  });

  HEADERS.forEach(function(header) {
    if (existing.indexOf(header) === -1) {
      existing.push(header);
      sheet.getRange(1, existing.length).setValue(header);
    }
  });
}

function getHeaderMap(sheet) {
  ensureHeaders(sheet);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const map = {};

  headers.forEach(function(header, index) {
    map[String(header || "")] = index;
  });

  return map;
}

function setCellByHeader(sheet, headerMap, rowNumber, header, value) {
  const columnIndex = headerMap[header];

  if (columnIndex === undefined) {
    return;
  }

  sheet.getRange(rowNumber, columnIndex + 1).setValue(value);
}

function readByHeader(row, headerMap, header) {
  const index = headerMap[header];

  if (index === undefined) {
    return "";
  }

  return String(row[index] || "");
}

function leadFromRow(row, headerMap, rowNumber) {
  return {
    rowNumber: rowNumber,
    timestamp: readByHeader(row, headerMap, "Timestamp"),
    parentName: readByHeader(row, headerMap, "Parent name"),
    childName: readByHeader(row, headerMap, "Child name"),
    childAge: readByHeader(row, headerMap, "Child age"),
    phone: readByHeader(row, headerMap, "Phone").replace(/^'/, ""),
    email: readByHeader(row, headerMap, "Email"),
    program: readByHeader(row, headerMap, "Interested program"),
    preferredVisitDate: readByHeader(row, headerMap, "Preferred visit date"),
    message: readByHeader(row, headerMap, "Message"),
    pageUrl: readByHeader(row, headerMap, "Page URL"),
    status: readByHeader(row, headerMap, "Status") || "New",
    notes: readByHeader(row, headerMap, "Admin notes"),
    updatedAt: readByHeader(row, headerMap, "Last updated")
  };
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

function plainText(value) {
  const text = String(value || "");
  return text ? `'${text}` : "";
}

function jsonResponse(body) {
  return HtmlService.createHtmlOutput(JSON.stringify(body));
}
