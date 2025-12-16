import React from 'react';
import { Briefcase, TrendingUp, UserCheck, ArrowRight } from 'lucide-react';

export const Careers: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Main Card */}
        <div className="relative bg-amalfi-navy rounded-sm overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-duration-500 transition-transform">
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amalfi-gold/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="flex flex-col lg:flex-row relative z-10">
            
            {/* Image Side */}
            <div className="lg:w-2/5 relative min-h-[300px] lg:min-h-full">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80" 
                alt="Sartorial Consultant" 
                className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amalfi-navy via-amalfi-navy/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-amalfi-navy"></div>
            </div>

            {/* Content Side */}
            <div className="lg:w-3/5 p-10 lg:p-16 text-white flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-[1px] bg-amalfi-gold"></span>
                <span className="font-sans text-xs tracking-[0.3em] uppercase text-amalfi-gold">Oportunidad Profesional</span>
              </div>

              <h2 className="font-serif text-3xl md:text-5xl mb-6 leading-tight">
                Embajadores de la Excelencia
              </h2>

              <p className="font-sans text-gray-300 leading-relaxed mb-8 text-sm md:text-base max-w-xl">
                Amalfi Sartoriale expande su legado. Buscamos <strong>Consultores de Estilo</strong> y ventas con una red distinguida y pasión por la alta sastrería. Si entiendes el lenguaje del lujo, este es tu escenario.
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 border-t border-white/10 pt-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-full text-amalfi-gold">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-1 text-white">Ingresos Superiores</h4>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed">
                      Ofrecemos el esquema de comisiones más competitivo y atractivo del mercado sartorial actual.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-full text-amalfi-gold">
                    <UserCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-1 text-white">Autonomía Total</h4>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed">
                      Gestiona tu propia agenda y clientela con el respaldo de una marca de prestigio internacional.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <a 
                  href="https://api.whatsapp.com/send/?phone=525554127828&text=Hola,+me+interesa+la+vacante+de+vendedor&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-amalfi-gold text-white font-sans text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-amalfi-navy transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <Briefcase size={16} />
                  <span>Aplicar Ahora</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <span className="font-sans text-xs text-gray-500">
                  Requisitos estrictos de experiencia.
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};