"use client";

import { useAuth } from "@/hooks/useAuth";
import { AdminSidebar, Sidebar } from "@/components/admin/AdminSidebar";
import { Topbar } from "@/components/admin/TopBar";
import "@/styles/admin.css";

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <span>Verificando acesso...</span>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <Topbar email={user?.sub ?? ""} />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}