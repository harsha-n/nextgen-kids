import { NextResponse } from "next/server";
import { clearAdminSession, requireAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST() {
  try {
    requireAdminSession();
    clearAdminSession();
    return NextResponse.json({ ok: true, message: "Signed out." });
  } catch {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }
}
