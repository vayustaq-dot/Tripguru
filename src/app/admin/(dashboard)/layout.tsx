import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "TrippGuru Admin",
  robots: { index: false, follow: false },
};

/** Content is read from disk on every request, so the admin is never cached. */
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAuth();
  return <AdminShell>{children}</AdminShell>;
}
