"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Visão geral", icon: "ti-layout-dashboard" },
  { href: "/admin/usuarios", label: "Usuários", icon: "ti-users" },
  { href: "/admin/produtos", label: "Produtos", icon: "ti-package" },
  { href: "/admin/vendas", label: "Vendas", icon: "ti-shopping-cart" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; path=/; max-age=0";
    window.location.href = "/login";
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-text">amazon</span>
        <small>Central de admin</small>
      </div>

      <nav className="nav-section">
        <span className="nav-label">Principal</span>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${pathname === item.href ? "active" : ""}`}
          >
            <i className={`ti ${item.icon}`} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="nav-bottom">
        <Link href="/" className="nav-item" style={{ marginBottom: 8 }}>
          <i className="ti ti-home" />
          Ir para a loja
        </Link>
        <button onClick={handleLogout} className="nav-item logout-btn">
          <i className="ti ti-logout" />
          Sair
        </button>
      </div>
    </aside>
  );
}