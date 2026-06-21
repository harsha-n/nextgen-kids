import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { getRuntimeStatus } from "@/lib/runtime-config";

export const runtime = "nodejs";

export async function GET() {
  try {
    requireAdminSession();
    return NextResponse.json({ ok: true, status: getRuntimeStatus() });
  } catch {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }
}
