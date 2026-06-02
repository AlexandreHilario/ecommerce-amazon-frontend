"use client";

import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full mt-auto">
      {/* Botão Voltar ao Início */}
      <div
        onClick={scrollToTop}
        className="bg-[#37475A] hover:bg-[#50657e] text-white text-center py-3 text-sm cursor-pointer transition-all duration-300 font-medium"
      >
        Voltar ao início
      </div>

      {/* Área Principal */}
      <div className="bg-[#232f3e] text-white py-10 px-4 border-b border-gray-600">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

          {/* Coluna 1 */}
          <div>
            <h3 className="font-bold mb-3 text-base text-white">
              Conheça-nos
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-white transition-colors"
                >
                  Sobre o projeto
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-white transition-colors"
                >
                  Informações corporativas
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 2 */}
          <div>
            <h3 className="font-bold mb-3 text-base text-white">
              Ganhe dinheiro conosco
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-white transition-colors"
                >
                  Venda na Amazon
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-white transition-colors"
                >
                  Seja um associado
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 */}
          <div>
            <h3 className="font-bold mb-3 text-base text-white">
              Pagamento
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-white transition-colors"
                >
                  Cartões de crédito
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-white transition-colors"
                >
                  Pix e Boleto
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4 */}
          <div>
            <h3 className="font-bold mb-3 text-base text-white">
              Deixe-nos ajudar você
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>
                <Link
                  href="/perfil"
                  className="hover:underline hover:text-white transition-colors"
                >
                  Sua conta
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-white transition-colors"
                >
                  Frete e prazo de entrega
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-white transition-colors"
                >
                  Devoluções e reembolsos
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Direitos Autorais */}
      <div className="bg-[#131921] text-white text-center py-8 text-xs text-gray-400">

        <h2 className="text-2xl font-bold text-white mb-4">
          amazon
          <span className="text-[#febd69]">.</span>
        </h2>

        <div className="flex justify-center gap-4 mb-2 flex-wrap">
          <Link
            href="#"
            className="hover:underline text-blue-400"
          >
            Condições de Uso
          </Link>

          <Link
            href="#"
            className="hover:underline text-blue-400"
          >
            Aviso de Privacidade
          </Link>
        </div>

        <p>
          &copy; {new Date().getFullYear()} Amazon Clone - Projeto UNICAP
        </p>

        <p className="mt-1">
          Desenvolvido para fins educacionais.
        </p>
      </div>
    </footer>
  );
}