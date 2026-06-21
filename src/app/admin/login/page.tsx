import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  if (getAdminSession()) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sunshine-50 via-white to-coral-50/60 px-4 py-20">
      <AdminLoginForm />
    </main>
  );
}
