"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (requireAdmin && user?.role !== "ADMIN") {
      router.replace("/");
    }
  }, [isAuthenticated, user, requireAdmin, router]);

  if (!isAuthenticated) return null;
  if (requireAdmin && user?.role !== "ADMIN") return null;

  return children;
}
