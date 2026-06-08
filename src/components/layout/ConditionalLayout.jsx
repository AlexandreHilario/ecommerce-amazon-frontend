"use client";

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  const rotasDeAutenticacao = ['/login', '/cadastro', '/esqueci-senha'];

  const isAuthPage = rotasDeAutenticacao.includes(pathname);
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <>
      {!isAuthPage && !isAdminPage && <Header />}

      <main className="flex-grow">
        {children}
      </main>

      {!isAuthPage && !isAdminPage && <Footer />}
    </>
  );
}