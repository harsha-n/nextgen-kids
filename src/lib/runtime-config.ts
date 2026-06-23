import { unstable_noStore as noStore } from "next/cache";
import { schoolConfig as defaultSchoolConfig, type SchoolConfig } from "@/data/school.config";

const CONFIG_ID = "nextgen-kids";

type SupabaseConfigRow = {
  config: SchoolConfig;
};

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  return { url, serviceRoleKey };
}

function isSupabaseConfigured() {
  const { url, serviceRoleKey } = getSupabaseEnv();
  return Boolean(url && serviceRoleKey);
}

function getHeaders() {
  const { serviceRoleKey } = getSupabaseEnv();

  const headers: Record<string, string> = {
    apikey: serviceRoleKey ?? "",
    "Content-Type": "application/json"
  };

  if (serviceRoleKey && !serviceRoleKey.startsWith("sb_secret_")) {
    headers.Authorization = `Bearer ${serviceRoleKey}`;
  }

  return headers;
}

export function getDefaultSchoolConfig() {
  return structuredClone(defaultSchoolConfig);
}

export async function getSchoolConfig(): Promise<SchoolConfig> {
  noStore();

  const { url } = getSupabaseEnv();

  if (!isSupabaseConfigured() || !url) {
    return getDefaultSchoolConfig();
  }

  try {
    const response = await fetch(
      `${url}/rest/v1/school_config?id=eq.${CONFIG_ID}&select=config&limit=1`,
      {
        headers: getHeaders(),
        cache: "no-store"
      }
    );

    if (!response.ok) {
      return getDefaultSchoolConfig();
    }

    const rows = (await response.json()) as SupabaseConfigRow[];
    return rows[0]?.config ?? getDefaultSchoolConfig();
  } catch {
    return getDefaultSchoolConfig();
  }
}

export async function saveSchoolConfig(config: SchoolConfig) {
  const { url } = getSupabaseEnv();

  if (!isSupabaseConfigured() || !url) {
    throw new Error("Supabase is not configured.");
  }

  const response = await fetch(`${url}/rest/v1/school_config?on_conflict=id`, {
    method: "POST",
    headers: {
      ...getHeaders(),
      Prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify({
      id: CONFIG_ID,
      config,
      updated_at: new Date().toISOString()
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Could not save school config.");
  }

  return config;
}

export function getRuntimeStatus() {
  return {
    supabaseConfigured: isSupabaseConfigured(),
    enquiryConfigured: Boolean(
      process.env.GOOGLE_APPS_SCRIPT_ENQUIRY_URL && process.env.ENQUIRY_SHARED_SECRET
    ),
    adminConfigured: Boolean(
      process.env.ADMIN_USERNAME &&
        process.env.ADMIN_PASSWORD_HASH &&
        process.env.ADMIN_SESSION_SECRET
    )
  };
}
