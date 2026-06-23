import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

type EnquiryLead = {
  rowNumber: number;
  timestamp: string;
  parentName: string;
  childName: string;
  childAge: string;
  phone: string;
  email: string;
  program: string;
  preferredVisitDate: string;
  message: string;
  pageUrl: string;
  status: string;
  notes: string;
  updatedAt: string;
};

type AppsScriptResponse<T> = {
  ok?: boolean;
  message?: string;
} & T;

async function readAppsScriptJson<T>(response: Response): Promise<AppsScriptResponse<T>> {
  if (response.status >= 300 && response.status < 400) {
    const redirectUrl = response.headers.get("location");

    if (!redirectUrl) {
      throw new Error("Lead service did not return a valid response.");
    }

    return readAppsScriptJson<T>(
      await fetch(redirectUrl, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store"
      })
    );
  }

  if (!response.ok) {
    throw new Error("Lead service is not available.");
  }

  const text = await response.text();

  try {
    return JSON.parse(text || "{}") as AppsScriptResponse<T>;
  } catch {
    throw new Error("Lead service returned an invalid response.");
  }
}

async function callAppsScript<T>(payload: Record<string, unknown>) {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_ENQUIRY_URL;
  const sharedSecret = process.env.ENQUIRY_SHARED_SECRET;

  if (!scriptUrl || !sharedSecret) {
    throw new Error("Lead service is not configured.");
  }

  const response = await fetch(scriptUrl, {
    method: "POST",
    redirect: "manual",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify({
      secret: sharedSecret,
      ...payload
    }),
    cache: "no-store"
  });

  const result = await readAppsScriptJson<T>(response);

  if (result.ok !== true) {
    throw new Error(result.message || "Lead service request failed.");
  }

  return result;
}

export async function GET() {
  try {
    requireAdminSession();

    const result = await callAppsScript<{ leads?: EnquiryLead[] }>({
      action: "listLeads",
      limit: 200
    });

    return NextResponse.json({ ok: true, leads: result.leads ?? [] });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load leads.";
    const status = message === "Unauthorized" ? 401 : message.includes("configured") ? 503 : 500;
    return NextResponse.json({ ok: false, message }, { status });
  }
}

export async function PATCH(request: Request) {
  try {
    requireAdminSession();

    const body = (await request.json().catch(() => null)) as {
      rowNumber?: number;
      status?: string;
      notes?: string;
    } | null;

    if (!body?.rowNumber || !Number.isInteger(body.rowNumber) || body.rowNumber < 2) {
      return NextResponse.json({ ok: false, message: "A valid lead row is required." }, { status: 400 });
    }

    const result = await callAppsScript<{ lead?: EnquiryLead }>({
      action: "updateLead",
      rowNumber: body.rowNumber,
      status: body.status || "New",
      notes: body.notes || ""
    });

    return NextResponse.json({ ok: true, lead: result.lead });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update lead.";
    const status = message === "Unauthorized" ? 401 : message.includes("configured") ? 503 : 500;
    return NextResponse.json({ ok: false, message }, { status });
  }
}
