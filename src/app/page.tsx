"use client";

import BoasVindas from './BoasVindas/page';
import { Carrosel } from '../components/Carrosel';
import { Award, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import Link from 'next/link';


export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col text-[#E8E4DF] font-sans">
      
      <main className="flex-1">
        
        {/* Banner de Destaque */}
        <section className="w-full relative">
          <Carrosel />
          {/* Sombra removida conforme solicitado */}
        </section>
        
        {/* Boas Vindas Elegante */}
        <BoasVindas />

        {/* Seção: Pilares da Marca (Diferenciais de Luxo) */}
        <section className="py-12 px-6 max-w-7xl mx-auto border-y border-[#C5A059]/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4 space-y-3">
              <Award className="w-6 h-6 text-[#C5A059] stroke-[1.2]" />
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase font-serif">Essências Raras</h3>
              <p className="text-xs text-[#E8E4DF]/60 font-light max-w-xs leading-relaxed">
                Ingredientes selecionados à mão nos campos de Grasse, na França, para criar fragrâncias únicas.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 space-y-3">
              <Sparkles className="w-6 h-6 text-[#C5A059] stroke-[1.2]" />
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase font-serif">Fixação Excepcional</h3>
              <p className="text-xs text-[#E8E4DF]/60 font-light max-w-xs leading-relaxed">
                Nossos perfumes são criados na concentração Parfum, garantindo rastro e fixação prolongada.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#C5A059] stroke-[1.2]" />
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase font-serif">Originalidade Garantida</h3>
              <p className="text-xs text-[#E8E4DF]/60 font-light max-w-xs leading-relaxed">
                Cada frasco possui selo de autenticidade e certificado numerado de controle de qualidade.
              </p>
            </div>
          </div>
        </section>

        {/* Seção de Categorias ou Coleções em Destaque */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-2xl md:text-3xl font-light tracking-[0.25em] text-[#C5A059] font-serif">
              COLEÇÕES EXCLUSIVAS
            </h2>
            <div className="relative w-16 h-[1px] bg-[#C5A059]/50 mx-auto" />
            <p className="text-[10px] md:text-xs text-[#E8E4DF]/50 tracking-[0.2em] uppercase font-light">
              Escolha a família de fragrâncias que expressa seu estilo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Lumière Premium',
                desc: 'Fragrâncias intensas, raras e profundamente marcantes.',
                query: 'Lumiere Premium',
                bg: 'bg-gradient-to-b from-[#161514] to-[#0A0A0A]'
              },
              {
                title: 'Sora Floral',
                desc: 'Delicadeza, frescor e a poesia das flores primaveris.',
                query: 'Sora Floral',
                bg: 'bg-gradient-to-b from-[#1a1416] to-[#0A0A0A]'
              },
              {
                title: 'Edição Limitada',
                desc: 'Lotes numerados e frascos artísticos para colecionadores.',
                query: 'Edição Limitada',
                bg: 'bg-gradient-to-b from-[#14181a] to-[#0A0A0A]'
              }
            ].map((item) => (
              <div 
                key={item.title} 
                className={`group relative overflow-hidden border border-[#C5A059]/10 p-10 flex flex-col justify-between items-center text-center transition-all duration-500 hover:border-[#C5A059]/60 hover:shadow-2xl hover:shadow-[#C5A059]/5 ${item.bg}`}
              >
                <div className="space-y-4">
                  <h3 className="text-base tracking-[0.2em] font-medium font-serif uppercase text-[#C5A059]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#E8E4DF]/60 font-light leading-relaxed max-w-[240px] mx-auto">
                    {item.desc}
                  </p>
                </div>
                
                <Link 
                  href={`/produtos?colecao=${encodeURIComponent(item.query)}`}
                  className="mt-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#E8E4DF] hover:text-[#C5A059] border-b border-[#C5A059]/30 hover:border-[#C5A059] pb-1 transition-all duration-300 font-light"
                >
                  Conhecer Coleção <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Seção: Depoimentos de Clientes (Histórias de Aroma) */}
        <section className="bg-[#080807] py-24 px-6 border-y border-[#C5A059]/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-3">
              <h2 className="text-xl md:text-2xl font-light tracking-[0.2em] text-[#C5A059] font-serif uppercase">
                Histórias de Aroma
              </h2>
              <p className="text-[10px] text-[#E8E4DF]/40 tracking-[0.2em] uppercase font-light">
                O que dizem os apreciadores da alta perfumaria Lumière Sora
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "A fixação do Sora Liebe é indescritível. Passo de manhã e à noite ainda sinto as notas de baunilha e jasmim me envolvendo. Um luxo absoluto.",
                  author: "Helena Cavalcanti",
                  city: "Rio de Janeiro"
                },
                {
                  quote: "Murasaki Prime tornou-se minha assinatura. É enigmático, as pessoas sempre perguntam que perfume estou usando. A experiência de compra foi impecável.",
                  author: "Ricardo Alencar",
                  city: "São Paulo"
                },
                {
                  quote: "Étoile Noire é simplesmente uma obra de arte engarrafada. As notas amadeiradas são equilibradas perfeitamente com um toque cítrico refinado.",
                  author: "Sophia Dumont",
                  city: "Belo Horizonte"
                }
              ].map((t, idx) => (
                <div key={idx} className="bg-[#121211] p-8 border border-[#C5A059]/5 flex flex-col justify-between space-y-6">
                  <p className="text-xs text-[#E8E4DF]/80 leading-relaxed font-light italic">
                    "{t.quote}"
                  </p>
                  <div>
                    <h4 className="text-xs font-semibold text-[#C5A059] tracking-wider font-serif">
                      {t.author}
                    </h4>
                    <span className="text-[9px] text-[#E8E4DF]/40 tracking-wider">
                      {t.city}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Oferta/Call to Action */}
        <section className="bg-[#0A0A0A] py-28 px-6 text-center relative overflow-hidden">
          {/* Glow sutil */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A059]/3 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-8 relative z-10">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059]">Fragrâncias Atemporais</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-wide text-[#E8E4DF] font-serif leading-tight">
              Presenteie com Sofisticação
            </h2>
            <p className="text-[#E8E4DF]/60 text-xs md:text-sm leading-relaxed font-light max-w-lg mx-auto">
              Surpreenda quem você ama com nossa curadoria de presentes. Cada pedido acompanha caixa rígida especial com fita de cetim e amostras exclusivas da marca.
            </p>
            <div className="pt-4">
              <Link 
                href="/produtos" 
                className="px-10 py-4 bg-[#C5A059] text-[#0A0A0A] uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#8B7340] hover:text-white transition-all duration-500 shadow-xl"
              >
                Ver Curadoria
              </Link>
            </div>
          </div>
        </section>

        {/* Seção: Newsletter Privada */}
        <section className="bg-[#10100F] py-20 px-6 border-t border-[#C5A059]/10">
          <div className="max-w-xl mx-auto text-center space-y-6">
            <h3 className="text-lg font-light tracking-[0.2em] text-[#C5A059] font-serif uppercase">
              Faça Parte do Club Lumière
            </h3>
            <p className="text-xs text-[#E8E4DF]/50 leading-relaxed font-light">
              Receba em primeira mão convites para pré-vendas exclusivas, lançamentos privados de novos lotes e segredos da perfumaria de luxo.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 pt-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="SEU ENDEREÇO DE E-MAIL" 
                className="flex-1 bg-[#0A0A0A] border border-[#C5A059]/20 px-4 py-3 text-xs tracking-widest text-[#E8E4DF] placeholder-[#E8E4DF]/30 focus:border-[#C5A059] outline-none transition-colors"
                required
              />
              <button 
                type="submit" 
                className="px-8 py-3 bg-transparent border border-[#C5A059] text-xs tracking-[0.2em] text-[#C5A059] uppercase hover:bg-[#C5A059] hover:text-[#0A0A0A] transition-all duration-500 font-semibold cursor-pointer"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </section>

      </main>

    </div>
  );
}