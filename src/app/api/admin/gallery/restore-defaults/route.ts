import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { restoreDefaultGallery } from "@/lib/image-slots";
import { getSchoolConfig, saveSchoolConfig } from "@/lib/runtime-config";

export const runtime = "nodejs";

export async function POST() {
  try {
    requireAdminSession();

    const config = restoreDefaultGallery(await getSchoolConfig());
    await saveSchoolConfig(config);

    return NextResponse.json({ ok: true, config });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not restore gallery.";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ ok: false, message }, { status });
  }
}
