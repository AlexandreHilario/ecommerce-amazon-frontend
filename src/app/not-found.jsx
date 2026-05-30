import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "12px" }}>Página não encontrada</h1>
      <p style={{ color: "#565959", marginBottom: "20px" }}>
        Desculpe, não encontramos a página que você está procurando.
      </p>
      <Link href="/" style={{ color: "#007185", textDecoration: "none" }}>
        Voltar para a página inicial
      </Link>
    </div>
  );
}
