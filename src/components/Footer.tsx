import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#070707] border-t border-[#C5A059]/10 pt-16 pb-8 text-[#E8E4DF] font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        
        {/* Coluna 1: A Marca */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="text-lg font-medium tracking-[0.25em] text-[#C5A059] font-serif">LUMIÈRE</span>
            <span className="text-[9px] font-light text-[#E8E4DF]/60 tracking-[0.35em] uppercase">Sora</span>
          </div>
          <p className="text-xs text-[#E8E4DF]/60 leading-relaxed font-light max-w-sm">
            Criando experiências sensoriais inesquecíveis através da alta perfumaria. Cada frasco é uma composição artística de notas raras e sofisticação atemporal.
          </p>
        </div>

        {/* Coluna 2: Coleções */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold tracking-[0.2em] text-[#C5A059] uppercase font-serif">
            Coleções
          </h4>
          <ul className="space-y-2 text-xs font-light text-[#E8E4DF]/60">
            <li>
              <Link href="/produtos" className="hover:text-[#C5A059] transition-colors duration-300">
                Lumière Premium
              </Link>
            </li>
            <li>
              <Link href="/produtos" className="hover:text-[#C5A059] transition-colors duration-300">
                Sora Floral
              </Link>
            </li>
            <li>
              <Link href="/produtos" className="hover:text-[#C5A059] transition-colors duration-300">
                Edição Limitada
              </Link>
            </li>
            <li>
              <Link href="/produtos" className="hover:text-[#C5A059] transition-colors duration-300">
                Todos os Perfumes
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Atendimento */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold tracking-[0.2em] text-[#C5A059] uppercase font-serif">
            Suporte
          </h4>
          <ul className="space-y-2 text-xs font-light text-[#E8E4DF]/60">
            <li>
              <Link href="/contato" className="hover:text-[#C5A059] transition-colors duration-300">
                Fale Conosco
              </Link>
            </li>
            <li>
              <span className="hover:text-[#C5A059] transition-colors duration-300 cursor-pointer">
                Políticas de Devolução
              </span>
            </li>
            <li>
              <span className="hover:text-[#C5A059] transition-colors duration-300 cursor-pointer">
                Perguntas Frequentes
              </span>
            </li>
            <li>
              <span className="hover:text-[#C5A059] transition-colors duration-300 cursor-pointer">
                Termos de Serviço
              </span>
            </li>
          </ul>
        </div>

        {/* Coluna 4: Conecte-se */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold tracking-[0.2em] text-[#C5A059] uppercase font-serif">
            Universo Lumière
          </h4>
          <p className="text-xs text-[#E8E4DF]/60 font-light leading-relaxed">
            Siga-nos em nossas redes sociais para conhecer as inspirações por trás das fragrâncias.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <span className="text-[#E8E4DF]/60 hover:text-[#C5A059] transition-colors cursor-pointer" aria-label="Instagram">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </span>
            <span className="text-[#E8E4DF]/60 hover:text-[#C5A059] transition-colors cursor-pointer" aria-label="Facebook">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </span>
            <span className="text-[#E8E4DF]/60 hover:text-[#C5A059] transition-colors cursor-pointer" aria-label="WhatsApp">
              <MessageCircle className="w-5 h-5 stroke-[1.5]" />
            </span>
            <span className="text-[#E8E4DF]/60 hover:text-[#C5A059] transition-colors cursor-pointer" aria-label="E-mail">
              <Mail className="w-5 h-5 stroke-[1.5]" />
            </span>
          </div>
        </div>

      </div>

      {/* Faixa inferior */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-[#C5A059]/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[10px] text-[#E8E4DF]/40 tracking-wider text-center md:text-left font-light">
          &copy; {currentYear} <span className="text-[#C5A059] font-medium font-serif">LUMIÈRE SORA</span>. 
          Todos os direitos reservados.
        </p>

        <p className="text-[10px] tracking-[0.2em] uppercase italic text-[#C5A059] font-light">
          L'essence du ciel
        </p>
      </div>
    </footer>
  );
}