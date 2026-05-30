import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full mt-auto">
      {/* Botão Voltar ao Início */}
      <div 
        onClick={scrollToTop}
        className="bg-[#37475A] hover:bg-[#485769] text-white text-center py-3 text-sm cursor-pointer transition-colors"
      >
        Voltar ao início
      </div>
      
      {/* Área Principal de Links */}
      <div className="bg-[#232f3e] text-white py-10 px-4 border-b border-gray-600">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="font-bold mb-3 text-base">Conheça-nos</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="#" className="hover:underline">Sobre o projeto</Link></li>
              <li><Link href="#" className="hover:underline">Informações corporativas</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-base">Ganhe dinheiro conosco</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="#" className="hover:underline">Venda na Amazon</Link></li>
              <li><Link href="#" className="hover:underline">Seja um associado</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-base">Pagamento</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="#" className="hover:underline">Cartões de crédito</Link></li>
              <li><Link href="#" className="hover:underline">Pix e Boleto</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-base">Deixe-nos ajudar você</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/perfil" className="hover:underline">Sua conta</Link></li>
              <li><Link href="#" className="hover:underline">Frete e prazo de entrega</Link></li>
              <li><Link href="#" className="hover:underline">Devoluções e reembolsos</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Direitos Autorais */}
      <div className="bg-[#131921] text-white text-center py-8 text-xs text-gray-400">
        <div className="flex justify-center gap-4 mb-2">
          <Link href="#" className="hover:underline text-blue-400">Condições de Uso</Link>
          <Link href="#" className="hover:underline text-blue-400">Aviso de Privacidade</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Amazon Clone - Projeto UNICAP</p>
        <p className="mt-1">Desenvolvido para fins educacionais.</p>
      </div>
    </footer>
  );
}