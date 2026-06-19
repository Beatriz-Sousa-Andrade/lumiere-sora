"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import produtos from "../../../produtos.json";
import { useCart } from "@/context/CartContext";
import { Search, Heart, SlidersHorizontal, ChevronDown, Package, CheckCircle, XCircle } from "lucide-react";

// Função para gerar atributos de luxo virtuais (mantida igual)
const getProductAttributes = (id: number, nome: string) => {
  let colecao = "Edição Limitada";
  if (nome.toLowerCase().includes("prime") || nome.toLowerCase().includes("lumière") || id % 3 === 0) {
    colecao = "Lumière Premium";
  } else if (nome.toLowerCase().includes("sora") || nome.toLowerCase().includes("fleur") || nome.toLowerCase().includes("rose") || id % 3 === 1) {
    colecao = "Sora Floral";
  }

  let familia = "Oriental";
  let notas = "Fava Tonka, Baunilha, Âmbar";
  
  if (nome.toLowerCase().includes("wald") || nome.toLowerCase().includes("noire") || nome.toLowerCase().includes("kaze") || id % 4 === 0) {
    familia = "Amadeirado";
    notas = "Sândalo, Cedro e Patchouli";
  } else if (nome.toLowerCase().includes("fleur") || nome.toLowerCase().includes("rose") || nome.toLowerCase().includes("lilas") || nome.toLowerCase().includes("bloom") || id % 4 === 1) {
    familia = "Floral";
    notas = "Jasmim, Pétalas de Rosa e Peônia";
  } else if (nome.toLowerCase().includes("bleu") || nome.toLowerCase().includes("soleil") || nome.toLowerCase().includes("éclat") || id % 4 === 2) {
    familia = "Cítrico";
    notas = "Bergamota, Limão Siciliano e Verbena";
  }
  
  return { colecao, familia, notas };
};

function ProdutosContent() {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  // Estados
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColecao, setSelectedColecao] = useState("Todos");
  const [selectedFamilia, setSelectedFamilia] = useState("Todos");
  const [sortBy, setSortBy] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(12);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Inicializa coleção da URL
  useEffect(() => {
    const queryColecao = searchParams.get("colecao");
    if (queryColecao) setSelectedColecao(queryColecao);
  }, [searchParams]);

  // Favoritos do localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("lumiere_favorites");
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Verifica se algum botão está com pointer-events: none (diagnóstico)
  useEffect(() => {
    const checkButtons = () => {
      const btns = document.querySelectorAll('button');
      btns.forEach((btn, idx) => {
        const style = window.getComputedStyle(btn);
        if (style.pointerEvents === 'none') {
          console.warn(`Botão ${idx} está com pointer-events: none`, btn);
        }
      });
    };
    const timer = setTimeout(checkButtons, 500);
    return () => clearTimeout(timer);
  }, [visibleCount, searchQuery, selectedColecao, selectedFamilia]); // reavalia quando os produtos mudam

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id];
      localStorage.setItem("lumiere_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    setVisibleCount(12);
  }, [searchQuery, selectedColecao, selectedFamilia, sortBy]);

  const processedProducts = produtos
    .map((p) => ({ ...p, ...getProductAttributes(p.id, p.nome) }))
    .filter((p) => {
      const matchesSearch = p.nome.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesColecao = selectedColecao === "Todos" || p.colecao === selectedColecao;
      const matchesFamilia = selectedFamilia === "Todos" || p.familia === selectedFamilia;
      return matchesSearch && matchesColecao && matchesFamilia;
    })
    .sort((a, b) => {
      const parseVal = (valStr: string) =>
        parseFloat(
          valStr
            .replace("R$", "")
            .replace(/\s/g, "")
            .replace(/\./g, "")
            .replace(",", ".")
        ) || 0;

      if (sortBy === "price-asc") return parseVal(a.preco) - parseVal(b.preco);
      if (sortBy === "price-desc") return parseVal(b.preco) - parseVal(a.preco);
      if (sortBy === "name-asc") return a.nome.localeCompare(b.nome);
      return 0;
    });

  const visibleProducts = processedProducts.slice(0, visibleCount);

  const handleAddToCart = (produto: any) => {
    console.log("Tentando adicionar ao carrinho:", produto.nome);
    if (addToCart) {
      addToCart({ id: produto.id, nome: produto.nome, preco: produto.preco, imagem: produto.imagem });
      showToast(`${produto.nome} adicionado à sacola!`, "success");
    } else {
      console.error("addToCart não está disponível no CartContext");
      showToast("Erro: carrinho não inicializado. Contate o suporte.", "error");
    }
  };

  return (
    <main className="flex-1 py-16 px-6 max-w-7xl mx-auto w-full font-sans">
      


      {/* Cabeçalho da Página */}
      <div className="text-center mb-16 space-y-4 animate-fade-in">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059]">Alta Perfumaria</span>
        <h1 className="text-4xl md:text-5xl font-light tracking-[0.25em] text-[#C5A059] font-serif uppercase">
          Nossa Curadoria
        </h1>
        <div className="relative w-20 h-1px bg-linear-to-r from-transparent via-[#C5A059] to-transparent mx-auto" />
        <p className="max-w-md mx-auto text-[#E8E4DF]/60 tracking-widest uppercase text-[10px] md:text-xs font-light">
          Fragrâncias atemporais compostas por notas raras e fixação sublime
        </p>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="mb-12 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]/50" />
            <input
              type="text"
              placeholder="PESQUISAR FRAGRÂNCIA..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121211] border border-[#C5A059]/20 hover:border-[#C5A059]/40 focus:border-[#C5A059] pl-11 pr-4 py-3 text-xs tracking-widest text-[#E8E4DF] placeholder-[#E8E4DF]/30 outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#E8E4DF]/40 hover:text-[#C5A059]"
              >
                Limpar
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="lg:hidden flex items-center justify-center gap-2 border border-[#C5A059]/30 py-3 text-xs tracking-widest text-[#E8E4DF] hover:bg-[#C5A059]/5 transition-colors cursor-pointer"
            aria-expanded={showFiltersMobile}
            aria-controls="mobile-filters"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
            FILTROS E ORDENAÇÃO
          </button>

          <div className="hidden lg:flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#E8E4DF]/40 tracking-wider">Coleção:</span>
              <div className="relative">
                <select
                  value={selectedColecao}
                  onChange={(e) => setSelectedColecao(e.target.value)}
                  className="bg-[#121211] border border-[#C5A059]/20 text-[#E8E4DF] px-3 py-2 pr-8 outline-none focus:border-[#C5A059] tracking-wider cursor-pointer appearance-none text-[11px]"
                >
                  <option value="Todos">Todas as Coleções</option>
                  <option value="Lumière Premium">Lumière Premium</option>
                  <option value="Sora Floral">Sora Floral</option>
                  <option value="Edição Limitada">Edição Limitada</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#C5A059] pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#E8E4DF]/40 tracking-wider">Família:</span>
              <div className="relative">
                <select
                  value={selectedFamilia}
                  onChange={(e) => setSelectedFamilia(e.target.value)}
                  className="bg-[#121211] border border-[#C5A059]/20 text-[#E8E4DF] px-3 py-2 pr-8 outline-none focus:border-[#C5A059] tracking-wider cursor-pointer appearance-none text-[11px]"
                >
                  <option value="Todos">Todas as Famílias</option>
                  <option value="Floral">Floral</option>
                  <option value="Amadeirado">Amadeirado</option>
                  <option value="Cítrico">Cítrico</option>
                  <option value="Oriental">Oriental</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#C5A059] pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#E8E4DF]/40 tracking-wider">Ordenar:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#121211] border border-[#C5A059]/20 text-[#E8E4DF] px-3 py-2 pr-8 outline-none focus:border-[#C5A059] tracking-wider cursor-pointer appearance-none text-[11px]"
                >
                  <option value="featured">Relevância</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="name-asc">Nome (A - Z)</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#C5A059] pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {showFiltersMobile && (
          <div id="mobile-filters" className="lg:hidden bg-[#121211] border border-[#C5A059]/20 p-6 space-y-4 rounded-sm animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-[#E8E4DF]/40 uppercase tracking-widest">Coleção</label>
                <select
                  value={selectedColecao}
                  onChange={(e) => setSelectedColecao(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#C5A059]/20 text-[#E8E4DF] p-3 outline-none text-xs"
                >
                  <option value="Todos">Todas as Coleções</option>
                  <option value="Lumière Premium">Lumière Premium</option>
                  <option value="Sora Floral">Sora Floral</option>
                  <option value="Edição Limitada">Edição Limitada</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#E8E4DF]/40 uppercase tracking-widest">Família Olfativa</label>
                <select
                  value={selectedFamilia}
                  onChange={(e) => setSelectedFamilia(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#C5A059]/20 text-[#E8E4DF] p-3 outline-none text-xs"
                >
                  <option value="Todos">Todas as Famílias</option>
                  <option value="Floral">Floral</option>
                  <option value="Amadeirado">Amadeirado</option>
                  <option value="Cítrico">Cítrico</option>
                  <option value="Oriental">Oriental</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#E8E4DF]/40 uppercase tracking-widest">Ordenar por</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#C5A059]/20 text-[#E8E4DF] p-3 outline-none text-xs"
                >
                  <option value="featured">Relevância</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="name-asc">Nome (A - Z)</option>
                </select>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => {
                setSelectedColecao("Todos");
                setSelectedFamilia("Todos");
                setSortBy("featured");
                setSearchQuery("");
              }}
              className="w-full py-2.5 border border-red-500/20 text-red-400 text-xs tracking-widest uppercase hover:bg-red-500/5 transition-colors"
            >
              Limpar Todos os Filtros
            </button>
          </div>
        )}
      </div>

      <div className="mb-6 flex justify-between items-center text-xs text-[#E8E4DF]/40 tracking-wider">
        <span>Exibindo {visibleProducts.length} de {processedProducts.length} perfumes</span>
        {(selectedColecao !== "Todos" || selectedFamilia !== "Todos" || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setSelectedColecao("Todos");
              setSelectedFamilia("Todos");
              setSearchQuery("");
            }}
            className="text-[#C5A059] hover:underline"
          >
            Limpar Filtros
          </button>
        )}
      </div>

      {visibleProducts.length === 0 ? (
        <div className="py-24 text-center border border-[#C5A059]/10 bg-[#0E0E0D] rounded-sm space-y-4">
          <p className="text-sm font-light text-[#E8E4DF]/60">Nenhum perfume encontrado com os filtros selecionados.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedColecao("Todos");
              setSelectedFamilia("Todos");
              setSearchQuery("");
            }}
            className="px-6 py-2 border border-[#C5A059] text-xs uppercase tracking-widest text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0A0A0A] transition-colors"
          >
            Ver Todo o Catálogo
          </button>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
          {visibleProducts.map((produto) => {
            const isFav = favorites.includes(produto.id);
            return (
              <div key={produto.id} className="group flex flex-col justify-between h-full animate-fade-in-up">
                <div className="relative w-full aspect-3/4 bg-[#161514] overflow-hidden mb-5 border border-[#C5A059]/10 transition-all duration-500 group-hover:border-[#C5A059]/50 shadow-md">
                  <span className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-[#0A0A0A]/80 border border-[#C5A059]/20 text-[8px] font-medium tracking-widest text-[#C5A059] uppercase">
                    {produto.colecao}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleFavorite(produto.id)}
                    className="absolute top-3 right-3 z-10 p-2 bg-[#0A0A0A]/80 border border-[#C5A059]/20 hover:border-[#C5A059] rounded-full text-[#C5A059] transition-all duration-300 focus:outline-none cursor-pointer"
                    aria-label={isFav ? `Remover ${produto.nome} dos favoritos` : `Adicionar ${produto.nome} aos favoritos`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-transform duration-300 active:scale-125 ${
                        isFav ? "fill-[#C5A059]" : "fill-transparent"
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {produto.imagem && !imageErrors[produto.id] ? (
                    <Image
                      src={produto.imagem}
                      alt={`Foto do perfume ${produto.nome}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-800ms ease-out group-hover:scale-[1.04]"
                      onError={() => setImageErrors((prev) => ({ ...prev, [produto.id]: true }))}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#121211] text-[#C5A059]/40">
                      <Package className="w-12 h-12 mb-2 stroke-[1]" aria-hidden="true" />
                      <span className="text-[10px] uppercase tracking-widest font-light">Imagem Indisponível</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-[#0A0A0A]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
                    <span className="text-[9px] tracking-[0.25em] text-[#C5A059] uppercase font-light mb-2">
                      Família Olfativa
                    </span>
                    <h4 className="text-xs font-semibold tracking-widest text-[#E8E4DF] uppercase mb-4">
                      {produto.familia}
                    </h4>
                    <div className="w-10 h-1px bg-[#C5A059]/50 mb-4" />
                    <p className="text-[10px] text-[#E8E4DF]/80 font-light leading-relaxed max-w-160px italic">
                      "{produto.notas}"
                    </p>
                  </div>
                </div>

                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] tracking-wider text-[#E8E4DF]/40 uppercase font-light">
                      {produto.familia}
                    </span>
                    <h3 className="text-sm font-medium tracking-widest uppercase text-[#E8E4DF] font-serif group-hover:text-[#C5A059] transition-colors duration-300 line-clamp-1">
                      {produto.nome}
                    </h3>
                  </div>
                  
                  <div className="pt-2 pb-4 flex items-center justify-between border-t border-[#C5A059]/5">
                    <span className="text-xs text-[#C5A059] font-light tracking-widest font-mono">
                      {produto.preco}
                    </span>
                    <span className="text-[9px] text-[#E8E4DF]/40 uppercase tracking-widest font-light">
                      100ml / Parfum
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(produto)}
                    className="w-full py-3 border border-[#C5A059] text-[9px] font-semibold uppercase tracking-[0.25em] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0A0A0A] transition-all duration-500 focus:outline-none cursor-pointer"
                    aria-label={`Adicionar ${produto.nome} à sacola de compras`}
                  >
                    Adicionar à Sacola
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {processedProducts.length > visibleCount && (
        <div className="mt-20 text-center animate-fade-in">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="px-12 py-4 bg-transparent border border-[#C5A059] text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0A0A0A] transition-all duration-500 focus:outline-none cursor-pointer"
          >
            Carregar Mais Fragrâncias
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 shadow-xl border animate-fade-in-up transition-all duration-300 ${toast.type === 'success' ? 'bg-[#0A0A0A] border-[#C5A059]/50 text-[#C5A059]' : 'bg-[#0A0A0A] border-red-500/50 text-red-400'}`}>
          {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          <span className="text-[10px] sm:text-xs uppercase tracking-widest">{toast.message}</span>
        </div>
      )}
    </main>
  );
}

export default function Produto() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col text-[#E8E4DF]">
      <Suspense
        fallback={
          <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
            <div className="w-8 h-8 border-2 border-[#C5A059]/20 border-t-[#C5A059] rounded-full animate-spin" />
            <p className="text-xs tracking-widest text-[#C5A059] uppercase font-light">
              Carregando Perfumaria...
            </p>
          </div>
        }
      >
        <ProdutosContent />
      </Suspense>
    </div>
  );
}