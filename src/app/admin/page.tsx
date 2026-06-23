import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getAdminSession } from "@/lib/admin-auth";
import { getSchoolConfig, getRuntimeStatus } from "@/lib/runtime-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Website editor | NextGen Kids",
  robots: {
    index: false,
    follow: false
  }
};

export default async function AdminPage() {
  if (!getAdminSession()) {
    redirect("/admin/login");
  }

  const config = await getSchoolConfig();
  const status = getRuntimeStatus();

  return <AdminDashboard initialConfig={config} status={status} />;
}
