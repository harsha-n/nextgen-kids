import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

type AppsScriptResponse = {
  ok?: boolean;
};

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return forwardedFor || realIp || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function jsonResponse(status: number, message: string) {
  return NextResponse.json({ ok: status >= 200 && status < 300, message }, { status });
}

async function readAppsScriptResult(response: Response) {
  if (response.status >= 300 && response.status < 400) {
    const redirectUrl = response.headers.get("location");

    if (!redirectUrl) {
      return false;
    }

    const redirectResponse = await fetch(redirectUrl, {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
      cache: "no-store"
    });

    if (!redirectResponse.ok) {
      return false;
    }

    const result = (await redirectResponse.json()) as AppsScriptResponse;
    return result.ok === true;
  }

  if (!response.ok) {
    return false;
  }

  const resultText = await response.text();
  const result = resultText ? (JSON.parse(resultText) as AppsScriptResponse) : { ok: true };
  return result.ok === true;
}

export async function POST(request: NextRequest) {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_ENQUIRY_URL;
  const sharedSecret = process.env.ENQUIRY_SHARED_SECRET;

  if (!scriptUrl || !sharedSecret) {
    return jsonResponse(503, "Enquiry service is not configured yet. Please contact the school directly.");
  }

  if (isRateLimited(getClientKey(request))) {
    return jsonResponse(429, "Too many enquiry attempts. Please try again after a few minutes.");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, "Invalid enquiry request.");
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return jsonResponse(400, "Please check the form fields and try again.");
  }

  if (parsed.data.website) {
    return jsonResponse(200, "Thank you. Our team will contact you shortly.");
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      redirect: "manual",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        secret: sharedSecret,
        submittedAt: new Date().toISOString(),
        ...parsed.data
      }),
      cache: "no-store"
    });

    if (!(await readAppsScriptResult(response))) {
      return jsonResponse(502, "We could not submit your enquiry right now. Please try again or WhatsApp us.");
    }

    return jsonResponse(200, "Thank you. Our team will contact you shortly.");
  } catch {
    return jsonResponse(502, "We could not submit your enquiry right now. Please try again or WhatsApp us.");
  }
}
