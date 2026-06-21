import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { uploadImageToSupabase } from "@/lib/supabase-storage";

export const runtime = "nodejs";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    requireAdminSession();

    const formData = await request.formData();
    const file = formData.get("file");
    const slotKey = String(formData.get("slotKey") || "general");
    const alt = String(formData.get("alt") || "");
    const width = Number(formData.get("width") || 0);
    const height = Number(formData.get("height") || 0);

    if (!(file instanceof File) || !alt || !width || !height) {
      return NextResponse.json(
        { ok: false, message: "Image file, alt text, width, and height are required." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { ok: false, message: "Only image uploads are allowed." },
        { status: 400 }
      );
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { ok: false, message: "Please upload an image smaller than 5 MB." },
        { status: 400 }
      );
    }

    const image = await uploadImageToSupabase({ file, slotKey, alt, width, height });

    return NextResponse.json({ ok: true, image });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not upload image.";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ ok: false, message }, { status });
  }
}
