
import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Step {
  num: string;
  title: string;
  text: string;
  img: string;
}

const steps: Step[] = [
  {
    num: "01",
    title: "Consulta Inicial",
    text: "Todo comienza con una conversación. Conocemos tu estilo y necesidades para diseñar una prenda que hable de ti.",
    // Imagen: Herramientas de sastre, cinta métrica, tijeras
    img: "https://cdn.pixabay.com/photo/2017/05/03/17/18/write-2281591_1280.jpg"
  },
  {
    num: "02",
    title: "Selección de Materiales",
    text: "Te presentaremos una curaduría de telas de casas europeas de alta gama. Loro Piana, Zegna, y más.",
    // Imagen: Texturas de telas finas
    img: "https://cdn.pixabay.com/photo/2018/06/29/23/51/fabric-3506846_1280.jpg"
  },
  {
    num: "03",
    title: "Diseño a Medida",
    text: "Creamos un patrón exclusivo para ti, tomando en cuenta tu silueta y postura biomecánica.",
    // Imagen: Proceso de confección/hilvanado
    img: "https://cdn.pixabay.com/photo/2013/07/25/11/56/measure-166883_1280.jpg"
  },
  {
    num: "04",
    title: "Confección Artesanal",
    text: "Tu prenda cobra vida en manos expertas. Precisión milimétrica y acabados a mano.",
    // Imagen: Traje terminado (Resultado final)
    img: "https://cdn.pixabay.com/photo/2022/03/04/16/33/fashion-7047683_1280.jpg"
  }
];

export const Process3D: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  // Automatic rotation every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIdx]); // Reset timer on manual interaction to avoid jumpy behavior

  const nextStep = () => setActiveIdx((prev) => (prev + 1) % steps.length);
  const prevStep = () => setActiveIdx((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <div className="relative w-full max-w-6xl mx-auto h-[600px] perspective-1000 flex items-center justify-center group">
      {/* Navigation Buttons */}
      <button 
        onClick={prevStep} 
        className="absolute left-0 md:left-10 z-30 p-4 rounded-full bg-white/10 hover:bg-amalfi-gold text-white backdrop-blur-sm transition-all border border-white/20 hover:scale-110"
        aria-label="Anterior"
      >
        <ArrowLeft size={24} />
      </button>
      <button 
        onClick={nextStep} 
        className="absolute right-0 md:right-10 z-30 p-4 rounded-full bg-white/10 hover:bg-amalfi-gold text-white backdrop-blur-sm transition-all border border-white/20 hover:scale-110"
        aria-label="Siguiente"
      >
        <ArrowRight size={24} />
      </button>

      {/* 3D Stage */}
      <div className="relative w-full h-full flex items-center justify-center preserve-3d">
        {steps.map((step, i) => {
          // Calculate position relative to active index
          let offset = i - activeIdx;
          // Handle wrapping for visual continuity logic (simple version for 4 items)
          if (offset > 1) offset -= steps.length;
          if (offset < -1) offset += steps.length;
          
          // Determine styles based on offset
          const isActive = offset === 0;
          
          let transform = '';
          let opacity = '0';
          let zIndex = 0;

          if (isActive) {
            transform = 'translateX(0) scale(1) translateZ(0)';
            opacity = '1';
            zIndex = 20;
          } else if (offset === 1 || (i === 0 && activeIdx === steps.length - 1)) {
            transform = 'translateX(50%) scale(0.8) translateZ(-100px) rotateY(-15deg)';
            opacity = '0.6';
            zIndex = 10;
          } else if (offset === -1 || (i === steps.length - 1 && activeIdx === 0)) {
            transform = 'translateX(-50%) scale(0.8) translateZ(-100px) rotateY(15deg)';
            opacity = '0.6';
            zIndex = 10;
          } else {
            transform = 'translateZ(-200px) scale(0.6)';
            opacity = '0';
            zIndex = 0;
          }

          return (
            <div
              key={i}
              className="absolute w-[300px] md:w-[400px] bg-white shadow-2xl transition-all duration-700 ease-out"
              style={{
                transform,
                opacity,
                zIndex,
              }}
            >
              {/* Image Header */}
              <div className="h-64 overflow-hidden relative bg-gray-100">
                <div className="absolute inset-0 bg-amalfi-navy/10 z-10 mix-blend-multiply"></div>
                <img 
                  src={step.img} 
                  alt={step.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" 
                  onError={(e) => {
                    // Fallback universal si alguna falla
                    e.currentTarget.src = "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute top-4 right-4 z-20 bg-amalfi-navy text-amalfi-gold font-serif text-2xl w-12 h-12 flex items-center justify-center rounded-full shadow-lg border border-amalfi-gold">
                  {step.num}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8 border-b-4 border-amalfi-gold relative bg-white">
                <h3 className="font-serif text-2xl text-amalfi-navy mb-4">{step.title}</h3>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">{step.text}</p>
                
                {/* Progress bar for active slide */}
                {isActive && (
                   <div className="absolute bottom-0 left-0 h-1 bg-amalfi-gold animate-[width_4s_linear] w-full origin-left"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Mobile Indicators */}
      <div className="absolute bottom-10 flex gap-3 z-30">
        {steps.map((_, i) => (
          <button 
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`h-1 rounded-full transition-all duration-300 ${i === activeIdx ? 'w-12 bg-amalfi-gold' : 'w-4 bg-gray-400/50 hover:bg-amalfi-gold/50'}`}
            aria-label={`Ir al paso ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
