"use client";

import { usePathname } from "next/navigation";

const titles = {
  "/admin": "Visão geral",
  "/admin/usuarios": "Usuários",
  "/admin/produtos": "Produtos",
  "/admin/vendas": "Vendas",
};

export function Topbar({ email }) {
  const pathname = usePathname();
  const initials = email?.slice(0, 2).toUpperCase() ?? "AD";

  return (
    <header className="topbar">
      <span className="topbar-title">{titles[pathname] ?? "Admin"}</span>
      <div className="topbar-right">
        <i className="ti ti-bell" />
        <span>{email}</span>
        <div className="avatar">{initials}</div>
      </div>
    </header>
  );
}