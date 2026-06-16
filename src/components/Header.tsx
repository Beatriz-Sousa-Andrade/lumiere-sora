"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ["Home", "Produtos", "Contato"];

  return (
    <>
      <header className="w-full bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#C5A059]/20 px-6 md:px-12 py-5 sticky top-0 z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        
        {/* Menu Hambúrguer (Mobile) */}
        <button 
          className="md:hidden p-2 -ml-2 text-[#E8E4DF]/80 hover:text-[#C5A059] transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Abrir menu principal"
          aria-expanded={isMobileMenuOpen}
        >
          <Menu className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
        </button>

        {/* Logo e Nome - Centralizado no mobile, alinhado à esquerda no desktop */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
        >
          <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 group-hover:rotate-12">
            <img
              src="/logo/logo.png"
              alt="Logo Lumière Sora"
              className="w-full h-full object-contain filter brightness-110"
              aria-hidden="true"
            />
          </div>
          <div className="flex flex-col hidden sm:flex">
            <h1 className="text-base md:text-xl font-medium tracking-[0.25em] text-[#C5A059] leading-none font-serif">
              LUMIÈRE
            </h1>
            <span className="text-[8px] md:text-[10px] font-light text-[#E8E4DF]/70 tracking-[0.35em] uppercase mt-0.5">
              Sora
            </span>
          </div>
        </Link>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-5 md:gap-8 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => {
            const href = item === "Home" ? "/" : `/${item.toLowerCase()}`;
            const isActive = pathname === href;
            
            return (
              <Link 
                key={item} 
                href={href} 
                className={`group relative text-xs tracking-[0.2em] uppercase transition-colors duration-300 py-1 font-light ${
                  isActive 
                    ? "text-[#C5A059] font-medium" 
                    : "text-[#E8E4DF]/80 hover:text-[#C5A059]"
                }`}
              >
                {item}
                <span 
                  className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#C5A059] transform transition-transform duration-300 origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} 
                />
              </Link>
            );
          })}
        </nav>

        {/* Lado Direito: Ícones (Carrinho) */}
        <div className="flex items-center">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#E8E4DF]/80 hover:text-[#C5A059] transition-colors duration-300 focus:outline-none cursor-pointer"
            aria-label="Abrir carrinho de compras"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A059] text-[#0A0A0A] text-[9px] font-bold rounded-full flex items-center justify-center animate-fade-in">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      </header>

      {/* Menu Overlay (Mobile) */}
      {isMobileMenuOpen && (
        <>
          {/* Fundo escuro e opaco (Backdrop) */}
          <div 
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Lateral */}
          <div className="fixed inset-y-0 left-0 z-[60] w-[80%] max-w-sm bg-[#0A0A0A] border-r border-[#C5A059]/20 shadow-2xl flex flex-col p-6 md:hidden animate-fade-in-up">
            <div className="flex justify-between items-center border-b border-[#C5A059]/20 pb-4">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3" aria-label="Ir para a Página Inicial">
                <img src="/logo/logo.png" alt="" className="w-8 h-8 object-contain" aria-hidden="true" />
                <h1 className="text-base font-medium tracking-[0.25em] text-[#C5A059] font-serif">LUMIÈRE</h1>
              </Link>
              <button 
                className="p-2 text-[#E8E4DF]/80 hover:text-[#C5A059]"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Fechar menu principal"
              >
                <X className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 mt-12">
              {navItems.map((item) => {
                const href = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                const isActive = pathname === href;
                
                return (
                  <Link 
                    key={item} 
                    href={href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm tracking-[0.2em] uppercase font-light border-b border-[#C5A059]/10 pb-4 ${
                      isActive ? "text-[#C5A059] font-medium" : "text-[#E8E4DF] hover:text-[#C5A059]"
                    }`}
                  >
                    {item}
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </>
  );
}