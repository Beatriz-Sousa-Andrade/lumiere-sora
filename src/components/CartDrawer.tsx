"use client";

import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag, Check } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    clearCart,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<"idle" | "loading" | "success">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!mounted) return null;

  const handleCheckout = () => {
    setCheckoutStep("loading");
    setTimeout(() => {
      setCheckoutStep("success");
      setTimeout(() => {
        clearCart();
        setIsCartOpen(false);
        setCheckoutStep("idle");
      }, 4000); // Exibe mensagem de sucesso por 4 segundos
    }, 2000); // Simula processamento por 2 segundos
  };

  const formattedTotal = cartTotal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // Cálculo de frete simulado (grátis acima de R$ 350,00)
  const shippingThreshold = 350;
  const isFreeShipping = cartTotal >= shippingThreshold;
  const shippingCost = isFreeShipping ? 0 : 25;
  const formattedShipping = isFreeShipping ? "Grátis" : "R$ 25,00";
  
  const finalTotal = cartTotal + shippingCost;
  const formattedFinalTotal = finalTotal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const progressPercent = Math.min((cartTotal / shippingThreshold) * 100, 100);

  return (
    <>
      {/* Backdrop com desfoque de fundo */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => checkoutStep !== "loading" && setIsCartOpen(false)}
      />

      {/* Painel do Carrinho */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[480px] bg-[#0E0E0D] border-l border-[#C5A059]/20 text-[#E8E4DF] shadow-2xl transition-transform duration-500 flex flex-col font-sans ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cabeçalho do Carrinho */}
        <div className="p-6 border-b border-[#C5A059]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
            <h2 className="text-lg font-medium tracking-[0.15em] uppercase font-serif">
              Sua Sacola
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            disabled={checkoutStep === "loading"}
            className="p-2 text-[#E8E4DF]/60 hover:text-[#C5A059] transition-colors disabled:opacity-30"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#C5A059]/20 scrollbar-track-transparent">
          {checkoutStep === "success" ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12 animate-fade-in">
              <div className="w-16 h-16 bg-[#C5A059]/10 border border-[#C5A059] rounded-full flex items-center justify-center text-[#C5A059] animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-serif text-[#C5A059] tracking-wider">
                  Pedido Recebido!
                </h3>
                <p className="text-sm text-[#E8E4DF]/60 max-w-sm mx-auto font-light">
                  Sua fragrância está sendo preparada com o cuidado que você merece. Enviamos a confirmação e o código de rastreamento para o seu e-mail.
                </p>
              </div>
              <p className="text-xs text-[#C5A059]/50 tracking-[0.2em] uppercase italic">
                Merci de votre confiance.
              </p>
            </div>
          ) : checkoutStep === "loading" ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
              <div className="w-10 h-10 border-2 border-[#C5A059]/20 border-t-[#C5A059] rounded-full animate-spin" />
              <p className="text-sm tracking-widest text-[#C5A059] uppercase font-light">
                Verificando disponibilidade e segurança...
              </p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
              <ShoppingBag className="w-12 h-12 text-[#C5A059]/30 stroke-[1]" />
              <div className="space-y-2">
                <p className="text-base font-light tracking-wide">
                  Sua sacola de compras está vazia.
                </p>
                <p className="text-xs text-[#E8E4DF]/40 max-w-xs mx-auto">
                  Adicione fragrâncias de nossa curadoria exclusiva para iniciar a sua jornada sensorial.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-8 py-3 border border-[#C5A059] text-xs uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#0A0A0A] transition-colors"
              >
                Explorar Coleções
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Barra de Progresso de Frete Grátis */}
              <div className="bg-[#161514] border border-[#C5A059]/10 p-4 rounded-sm space-y-2">
                <p className="text-xs font-light text-[#E8E4DF]/80">
                  {isFreeShipping ? (
                    <span>Parabéns! Você garantiu <strong>Frete Premium Grátis</strong>.</span>
                  ) : (
                    <span>
                      Adicione mais <strong>R$ {(shippingThreshold - cartTotal).toFixed(2).replace(".", ",")}</strong> para obter <strong>Frete Grátis</strong>.
                    </span>
                  )}
                </p>
                <div className="w-full h-[3px] bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#8B7340] to-[#C5A059] transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Lista de Itens */}
              <div className="divide-y divide-[#C5A059]/10">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                    <div className="relative w-20 h-24 bg-[#161514] border border-[#C5A059]/10 shrink-0">
                      <Image
                        src={item.imagem}
                        alt={item.nome}
                        fill
                        className="object-cover p-1"
                        sizes="80px"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-medium tracking-wider uppercase font-serif">
                            {item.nome}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#E8E4DF]/40 hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-[#C5A059] font-light mt-1 tracking-wider">
                          {item.preco}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Controle de Quantidade */}
                        <div className="flex items-center border border-[#C5A059]/20 rounded-sm overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                            className="p-1 px-2.5 text-[#E8E4DF]/60 hover:text-[#C5A059] hover:bg-[#C5A059]/5 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-light min-w-6 text-center">
                            {item.quantidade}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                            className="p-1 px-2.5 text-[#E8E4DF]/60 hover:text-[#C5A059] hover:bg-[#C5A059]/5 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Subtotal do Item */}
                        <span className="text-xs text-[#E8E4DF]/80 font-light tracking-wider">
                          {(
                            parseFloat(
                              item.preco
                                .replace("R$", "")
                                .replace(/\s/g, "")
                                .replace(/\./g, "")
                                .replace(",", ".")
                            ) * item.quantidade
                          ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Rodapé do Carrinho (Resumo Financeiro) */}
        {cartItems.length > 0 && checkoutStep === "idle" && (
          <div className="p-6 border-t border-[#C5A059]/10 bg-[#0A0A0A] space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#E8E4DF]/60 font-light">
                <span>Subtotal</span>
                <span>{formattedTotal}</span>
              </div>
              <div className="flex justify-between text-xs text-[#E8E4DF]/60 font-light">
                <span>Frete Especial</span>
                <span>{formattedShipping}</span>
              </div>
              <div className="flex justify-between text-base border-t border-[#C5A059]/10 pt-3 font-medium tracking-wider text-[#C5A059] font-serif">
                <span>Total Estimado</span>
                <span>{formattedFinalTotal}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-[#C5A059] text-[#0A0A0A] font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#8B7340] hover:text-white transition-all duration-500 shadow-lg"
            >
              Finalizar Pedido
            </button>
            <p className="text-[10px] text-center text-[#E8E4DF]/40 font-light italic">
              Embalagem de luxo e amostras de cortesia inclusas em todas as compras.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
