export default function BoasVindas() {
  return (
    <section className="bg-[#0A0A0A] flex flex-col items-center justify-center px-6 py-24 text-center relative overflow-hidden">
      
      {/* Luz dourada de fundo difusa (Efeito Boutique) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#C5A059]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-3xl space-y-8 animate-fade-in-up relative z-10">
        
        {/* Título com degradê sutil e espaçamento de luxo */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-b from-[#E5C483] via-[#C5A059] to-[#8B7340] tracking-[0.25em] drop-shadow-sm font-serif">
            BEM-VINDO
          </h1>
          <p className="text-[#E8E4DF]/50 text-xs md:text-sm tracking-[0.45em] uppercase font-light">
            À experiência Lumière
          </p>
        </div>

        {/* Separador com efeito de brilho */}
        <div className="relative w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto" />

        {/* Texto de apoio com melhor legibilidade */}
        <p className="text-[#E8E4DF]/90 text-base md:text-xl leading-relaxed font-light max-w-xl mx-auto italic font-serif">
          "Onde a sofisticação encontra a essência. 
          Explore nossa curadoria exclusiva e descubra o luxo em cada detalhe."
        </p>

        {/* Botão de Ação com efeito Glassmorphism suave */}
        <div className="pt-6">
          <a 
            href="/produtos"
            className="group relative inline-flex items-center justify-center px-10 py-4 border border-[#C5A059]/30 text-[#E8E4DF] text-xs font-light tracking-[0.2em] uppercase transition-all duration-500 hover:border-[#C5A059] hover:bg-[#C5A059]/10"
          >
            <span className="relative z-10">Explorar Coleção</span>
            {/* Efeito de brilho ao passar o mouse */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#C5A059]/0 via-[#C5A059]/20 to-[#C5A059]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </a>
        </div>
        
      </div>
    </section>
  );
}