"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="w-full bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#C5A059]/20 px-6 md:px-12 py-5 sticky top-0 z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo e Nome */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 group-hover:rotate-12">
            <img
              src="/logo/logo.png"
              alt="Logo Lumière Sora"
              className="w-full h-full object-contain filter brightness-110"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-base md:text-xl font-medium tracking-[0.25em] text-[#C5A059] leading-none font-serif">
              LUMIÈRE
            </h1>
            <span className="text-[8px] md:text-[10px] font-light text-[#E8E4DF]/70 tracking-[0.35em] uppercase mt-0.5">
              Sora
            </span>
          </div>
        </Link>

        {/* Lado Direito: Navegação e Carrinho */}
        <div className="flex items-center gap-6 md:gap-10">
          {/* Navegação */}
          <nav className="flex items-center gap-5 md:gap-8">
            {["Home", "Produtos", "Contato"].map((item) => {
              const href = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              const isActive = pathname === href;
              
              return (
                <Link 
                  key={item} 
                  href={href} 
                  className={`group relative text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors duration-300 py-1 font-light ${
                    isActive 
                      ? "text-[#C5A059] font-medium" 
                      : "text-[#E8E4DF]/80 hover:text-[#C5A059]"
                  }`}
                >
                  {item}
                  {/* Underline animado para link ativo e hover */}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#C5A059] transform transition-transform duration-300 origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`} 
                  />
                </Link>
              );
            })}
          </nav>

          {/* Botão de Sacola de Compras */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#E8E4DF]/80 hover:text-[#C5A059] transition-colors duration-300 focus:outline-none cursor-pointer"
            aria-label="Abrir carrinho"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A059] text-[#0A0A0A] text-[9px] font-bold rounded-full flex items-center justify-center animate-fade-in">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}