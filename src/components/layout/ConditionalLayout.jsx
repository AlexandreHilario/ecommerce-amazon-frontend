"use client";

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  const rotasDeAutenticacao = ['/login', '/cadastro', '/esqueci-senha'];
  
  const isAuthPage = rotasDeAutenticacao.includes(pathname);

  return (
    <>
      {/* Se NÃO for página de autenticação, mostra o Header */}
      {!isAuthPage && <Header />}
      
      <main className="flex-grow">
        {children}
      </main>

      {/* Se NÃO for página de autenticação, mostra o Footer */}
      {!isAuthPage && <Footer />}
    </>
  );
}