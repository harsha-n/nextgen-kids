import type { ImageAsset } from "@/data/school.config";

const BUCKET = "school-media";

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  return { url, serviceRoleKey };
}

export function isStorageConfigured() {
  const { url, serviceRoleKey } = getSupabaseEnv();
  return Boolean(url && serviceRoleKey);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function extensionFor(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension || "jpg";
}

export async function uploadImageToSupabase({
  file,
  slotKey,
  alt,
  width,
  height
}: {
  file: File;
  slotKey: string;
  alt: string;
  width: number;
  height: number;
}): Promise<ImageAsset> {
  const { url, serviceRoleKey } = getSupabaseEnv();

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase storage is not configured.");
  }

  const objectPath = `admin/${slugify(slotKey)}/${Date.now()}-${slugify(file.name)}.${extensionFor(file)}`;
  const uploadUrl = `${url}/storage/v1/object/${BUCKET}/${objectPath}`;

  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "false"
    },
    body: await file.arrayBuffer(),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Could not upload image.");
  }

  const image = {
    src: `${url}/storage/v1/object/public/${BUCKET}/${objectPath}`,
    alt,
    width,
    height
  };

  await recordMediaAsset({ image, slotKey, objectPath });

  return image;
}

async function recordMediaAsset({
  image,
  slotKey,
  objectPath
}: {
  image: ImageAsset;
  slotKey: string;
  objectPath: string;
}) {
  const { url, serviceRoleKey } = getSupabaseEnv();

  if (!url || !serviceRoleKey) {
    return;
  }

  const response = await fetch(`${url}/rest/v1/media_assets`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      slot_key: slotKey,
      label: slotKey,
      url: image.src,
      alt: image.alt,
      width: image.width,
      height: image.height,
      object_path: objectPath,
      is_default: false,
      created_at: new Date().toISOString()
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Could not record media asset.");
  }
}
