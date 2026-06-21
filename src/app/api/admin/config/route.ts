import { NextResponse } from "next/server";
import type { SchoolConfig } from "@/data/school.config";
import { requireAdminSession } from "@/lib/admin-auth";
import { getSchoolConfig, saveSchoolConfig } from "@/lib/runtime-config";

export const runtime = "nodejs";

function isSchoolConfig(value: unknown): value is SchoolConfig {
  return Boolean(
    value &&
      typeof value === "object" &&
      "schoolInfo" in value &&
      "seo" in value &&
      "programs" in value &&
      "contact" in value
  );
}

export async function GET() {
  try {
    requireAdminSession();
    return NextResponse.json({ ok: true, config: await getSchoolConfig() });
  } catch {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    requireAdminSession();
    const body = (await request.json().catch(() => null)) as { config?: unknown } | null;

    if (!isSchoolConfig(body?.config)) {
      return NextResponse.json({ ok: false, message: "Invalid school config." }, { status: 400 });
    }

    await saveSchoolConfig(body.config);

    return NextResponse.json({ ok: true, config: body.config });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save config.";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ ok: false, message }, { status });
  }
}
