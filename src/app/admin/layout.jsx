"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Topbar } from "@/components/admin/TopBar";
import "@/styles/admin.css";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user?.role !== "ADMIN") {
      router.replace("/");
    }
  }, [isAuthenticated, user]);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <Topbar email={user?.email ?? ""} nome={user?.nomeUsuario ?? ""} />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}