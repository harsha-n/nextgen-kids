import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { restoreImageSlot } from "@/lib/image-slots";
import { getSchoolConfig, saveSchoolConfig } from "@/lib/runtime-config";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    requireAdminSession();

    const body = (await request.json().catch(() => null)) as { slotKey?: string } | null;

    if (!body?.slotKey) {
      return NextResponse.json({ ok: false, message: "Image slot is required." }, { status: 400 });
    }

    const config = restoreImageSlot(await getSchoolConfig(), body.slotKey);
    await saveSchoolConfig(config);

    return NextResponse.json({ ok: true, config });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not restore image.";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ ok: false, message }, { status });
  }
}
