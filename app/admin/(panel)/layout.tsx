import { AdminSidebar } from "@/components/admin-sidebar";

export default function AdminPanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen min-w-0 flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
