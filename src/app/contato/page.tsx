'use client';

import { useState } from "react";
import { MapPin, Phone, Clock, Mail, CheckCircle2 } from "lucide-react";

export default function Contato() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ nome: "", email: "", mensagem: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.mensagem) return;
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ nome: "", email: "", mensagem: "" });
    }, 5000);
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center py-24 px-6 relative overflow-hidden font-sans">
      
      {/* Luz dourada de fundo difusa (Boutique glow) */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#C5A059]/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start relative z-10 animate-fade-in-up">
        
        {/* Lado Esquerdo: Identidade & Detalhes da Boutique */}
        <div className="space-y-10">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059]">Atendimento Exclusivo</span>
            <h1 className="text-4xl md:text-5xl font-light text-[#E8E4DF] leading-tight font-serif">
              Sua experiência <br />
              <span className="italic text-[#C5A059]">começa aqui.</span>
            </h1>
          </div>
          
          <div className="w-24 h-[1px] bg-[#C5A059]/30" />

          <p className="text-[#E8E4DF]/60 text-xs md:text-sm leading-relaxed max-w-md font-light">
            Para consultas sobre nossas coleções, encomendas sob medida, parcerias ou atendimento personalizado (Concierge Lumière), nossa equipe está à disposição para oferecer suporte dedicado e atencioso.
          </p>

          {/* Informações Físicas da Boutique */}
          <div className="space-y-5 pt-4 text-xs font-light text-[#E8E4DF]/70">
            <div className="flex items-start gap-4">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-[#C5A059] tracking-wider uppercase mb-1 font-serif">Maison Lumière</h4>
                <p>Av. Europa, 450 - Jardins</p>
                <p>São Paulo - SP, 01449-001</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-[#C5A059] tracking-wider uppercase mb-1 font-serif">Telefone Boutique</h4>
                <p>+55 (11) 3088-9100</p>
                <p className="text-[10px] text-[#E8E4DF]/40">Atendimento Concierge via WhatsApp</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-[#C5A059] tracking-wider uppercase mb-1 font-serif">Horário de Funcionamento</h4>
                <p>Segunda a Sexta: 10h às 19h</p>
                <p>Sábado: 10h às 16h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Formulário de Contato */}
        <div className="bg-[#121211] border border-[#C5A059]/10 p-8 md:p-10 rounded-sm shadow-xl">
          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
              <div className="w-12 h-12 bg-[#C5A059]/10 border border-[#C5A059] rounded-full flex items-center justify-center text-[#C5A059] animate-bounce">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-serif text-[#C5A059] tracking-wider">
                  Mensagem Enviada!
                </h3>
                <p className="text-xs text-[#E8E4DF]/60 max-w-xs leading-relaxed font-light">
                  Agradecemos seu contato. Um de nossos consultores de fragrância responderá ao seu e-mail em até 24 horas úteis.
                </p>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <h3 className="text-sm font-semibold tracking-[0.2em] text-[#C5A059] uppercase font-serif mb-4">
                Envie-nos uma Mensagem
              </h3>
              
              <div className="space-y-6">
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="NOME COMPLETO" 
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full bg-transparent border-b border-[#C5A059]/20 py-4 text-xs text-[#E8E4DF] placeholder-[#E8E4DF]/20 focus:border-[#C5A059] outline-none transition-all duration-500 tracking-[0.15em]"
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-500 group-focus-within:w-full" />
                </div>
                
                <div className="relative group">
                  <input 
                    type="email" 
                    placeholder="E-MAIL DE CONTATO" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-[#C5A059]/20 py-4 text-xs text-[#E8E4DF] placeholder-[#E8E4DF]/20 focus:border-[#C5A059] outline-none transition-all duration-500 tracking-[0.15em]"
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-500 group-focus-within:w-full" />
                </div>
                
                <div className="relative group">
                  <textarea 
                    placeholder="COMO PODEMOS AJUDAR?" 
                    required
                    rows={4}
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    className="w-full bg-transparent border-b border-[#C5A059]/20 py-4 text-xs text-[#E8E4DF] placeholder-[#E8E4DF]/20 focus:border-[#C5A059] outline-none transition-all duration-500 tracking-[0.15em] resize-none"
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-500 group-focus-within:w-full" />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full px-12 py-4 bg-[#C5A059] text-[#0A0A0A] font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-[#8B7340] hover:text-white transition-all duration-500 shadow-md cursor-pointer"
              >
                Enviar Mensagem
              </button>
            </form>
          )}
        </div>

      </div>
    </main>
  );
}