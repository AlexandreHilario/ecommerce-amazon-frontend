import Link from "next/link";

export default function AuthFooter() {
  return (
    <footer className="auth-footer">
      <div className="auth-footer-gradient" />
      <nav className="auth-footer-links">
        <Link href="#">Condições de Uso</Link>
        <Link href="#">Aviso de Privacidade</Link>
        <Link href="#">Ajuda</Link>
      </nav>
      <p className="auth-footer-copy">
        © 1996-2024, Amazon.com, Inc. ou suas afiliadas
      </p>
    </footer>
  );
}
