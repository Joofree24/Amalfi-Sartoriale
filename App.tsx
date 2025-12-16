import React, { useState, useEffect } from 'react';
import { Concierge } from './components/Concierge';
import { AtelierScene } from './components/AtelierScene';
import { Process3D } from './components/Process3D';
import { Careers } from './components/Careers';
import { Logo } from './components/Logo';
import { CeremoniaImage } from './components/CeremoniaImage';
import { NegociosImage } from './components/NegociosImage';
import { Menu, X, Instagram, Facebook, Scissors, Scroll, Cpu, Feather, Fingerprint, Infinity } from 'lucide-react';

// 3D Tilt Card Component
const TiltCard: React.FC<{ 
  children?: React.ReactNode; 
  title: string; 
  subtitle?: string; 
  icon?: React.ReactNode; 
  description?: string; 
  image?: string;
  customImage?: React.ReactNode;
}> = ({ title, subtitle, icon, description, image, customImage }) => {
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Subtle rotation
    const rotateX = ((y - centerY) / centerY) * -8; 
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
  };

  if (image || customImage) {
    // Image Card Variation
    return (
      <div 
        className="relative group h-[500px] overflow-hidden transition-all duration-300 ease-out shadow-xl rounded-sm"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform, transition: 'transform 0.1s ease-out' }}
      >
        {customImage ? (
          <div className="absolute inset-0 w-full h-full">
            {customImage}
          </div>
        ) : (
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-amalfi-navy/90 via-amalfi-navy/20 to-transparent opacity-90"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-serif text-2xl mb-2">{title}</h3>
          <p className="font-sans text-xs tracking-[0.2em] text-amalfi-gold uppercase">{subtitle}</p>
        </div>
      </div>
    );
  }

  // Icon/Text Card Variation
  return (
    <div 
      className="bg-white p-8 md:p-10 text-center hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-amalfi-gold/30 rounded-sm group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: 'transform 0.1s ease-out' }}
    >
      <div className="w-16 h-16 mx-auto bg-amalfi-navy text-white rounded-full flex items-center justify-center mb-6 group-hover:bg-amalfi-gold transition-colors duration-500 shadow-lg group-hover:shadow-amalfi-gold/50">
        {icon}
      </div>
      <h3 className="font-serif text-xl text-amalfi-navy mb-4 group-hover:text-amalfi-gold transition-colors">{title}</h3>
      <p className="font-sans text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position for parallax (-1 to 1)
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-amalfi-charcoal selection:bg-amalfi-gold selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-amalfi-navy/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex flex-col items-center md:items-start cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
             <Logo 
               className="h-12 w-auto transition-transform duration-300 hover:scale-105" 
               color={scrolled ? '#ffffff' : '#ffffff'} 
             />
          </div>
          
          {/* Desktop Menu */}
          <div className={`hidden md:flex space-x-10 text-xs tracking-[0.2em] font-sans font-medium uppercase ${scrolled ? 'text-gray-300' : 'text-white/90'}`}>
            <button onClick={() => scrollToSection('experience')} className="hover:text-amalfi-gold transition-colors">Experiencia</button>
            <button onClick={() => scrollToSection('process')} className="hover:text-amalfi-gold transition-colors">Proceso</button>
          </div>

          <div className="hidden md:block">
            <button 
              onClick={() => scrollToSection('contact')}
              className={`px-8 py-3 border transition-all duration-300 font-sans text-[10px] tracking-[0.2em] uppercase ${scrolled ? 'border-amalfi-gold text-amalfi-gold hover:bg-amalfi-gold hover:text-white' : 'border-white text-white hover:bg-white hover:text-amalfi-navy'}`}
            >
              Agenda tu visita
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-amalfi-navy z-40 flex flex-col items-center justify-center space-y-8 text-white font-serif text-2xl">
          <button onClick={() => scrollToSection('experience')}>Experiencia</button>
          <button onClick={() => scrollToSection('process')}>Proceso</button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-amalfi-gold text-sm font-sans tracking-widest border border-amalfi-gold px-10 py-4 mt-8 uppercase"
          >
            Agenda tu visita
          </button>
        </div>
      )}

      {/* Hero Section with 3D Parallax */}
      {/* Changed background to amalfi-charcoal (dark grey) to distinguish from the next black section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden perspective-1000 bg-amalfi-charcoal">
        <AtelierScene />
        
        <div 
          className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in"
          style={{
            transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20}px, 0)`
          }}
        >
          <div className="w-px h-24 bg-gradient-to-b from-transparent to-amalfi-gold mx-auto mb-8"></div>
          
          <div className="mb-12 flex justify-center">
            <Logo className="w-full max-w-md h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-700 opacity-90" color="#ffffff" />
          </div>
          
          <p className="font-sans text-sm md:text-base tracking-[0.3em] text-gray-300 mb-12 uppercase">
            Showroom Privado • Ciudad de México
          </p>
          
          <button 
            onClick={() => scrollToSection('contact')}
            className="inline-block bg-white/5 backdrop-blur-sm border border-white px-10 py-4 text-white font-sans text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-amalfi-navy transition-all duration-300 shadow-lg hover:shadow-amalfi-gold/50"
          >
            Agenda tu visita
          </button>
        </div>
      </header>

      {/* Experience Section (Intro) */}
      <section id="experience" className="py-24 md:py-32 bg-amalfi-navy text-white relative overflow-hidden scroll-mt-32">
         <div className="container mx-auto px-6 relative z-10">
           <div className="flex flex-col lg:flex-row items-center gap-16">
             <div className="lg:w-1/2">
                <span className="text-amalfi-gold font-sans text-xs tracking-[0.2em] uppercase mb-6 block">Sobre Nosotros</span>
                <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
                  Una experiencia hecha a tu medida
                </h2>
                <p className="font-sans text-gray-400 leading-loose mb-6 text-sm md:text-base">
                  Nuestro showroom en la Ciudad de México no es una tienda: es un espacio reservado para quienes buscan algo más que ropa. Aquí comienza el viaje hacia una prenda verdaderamente única.
                </p>
                <p className="font-sans text-gray-400 leading-loose mb-8 text-sm md:text-base">
                   Accesible únicamente con cita o invitación, este lugar ha sido diseñado para ofrecer una experiencia personalizada, donde el detalle lo es todo. Desde la elección de telas —incluidas telas italianas e inglesas de la más alta calidad— hasta el corte.
                </p>
             </div>
             <div className="lg:w-1/2 relative perspective-1000">
                <div className="absolute -inset-4 border border-amalfi-gold/30 z-0 translate-x-4 translate-y-4"></div>
                {/* Updated Image: Removed grayscale effect */}
                <img 
                  src="https://i.ibb.co/p64bV8K4/Whats-App-Image-2025-11-07-at-2-39-35-PM.jpg" 
                  alt="Sastre trabajando en taller" 
                  className="relative z-10 w-full h-[500px] object-cover transition-all duration-700 shadow-2xl hover:rotate-y-2 transform preserve-3d"
                />
             </div>
           </div>
         </div>
      </section>

      {/* The 6 Pillars of Excellence (Grid) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-serif text-4xl text-amalfi-navy mb-4">La excelencia AMALFI SARTORIALE</h2>
            <p className="font-sans text-gray-500 tracking-wide text-sm">Lo que nos distingue en el arte de la sastrería contemporánea</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* 1. Patronaje Anatómico */}
             <TiltCard 
               title="Patronaje Anatómico" 
               description="Cada patrón se diseña según tu postura y movimiento natural. No seguimos moldes: los creamos contigo."
               icon={<Scissors className="w-8 h-8" />}
             />
             
             {/* 2. Telas Vivientes */}
             <TiltCard 
               title="Telas Vivientes" 
               description="Tejidos inteligentes que regulan tu temperatura, repelen líquidos y mantienen su forma. Tecnología y tradición."
               icon={<Scroll className="w-8 h-8" />}
             />
             
             {/* 3. Herencia Modernizada */}
             <TiltCard 
               title="Herencia Modernizada" 
               description="Aplicamos técnicas napolitanas del siglo XVIII con precisión moderna. Costuras impecables hechas para durar."
               icon={<Cpu className="w-8 h-8" />}
             />

             {/* 4. Ajuste Cero-G */}
             <TiltCard 
               title="Ajuste Cero-G" 
               description="Desarrollamos patrones que respetan tu biomecánica. Una prenda tan ligera y precisa que olvidas que la llevas."
               icon={<Feather className="w-8 h-8" />}
             />

             {/* 5. Firmas Ocultas */}
             <TiltCard 
               title="Firmas Ocultas" 
               description="Cada prenda lleva detalles que solo tú conoces: costuras secretas, guiños al diseño y acabados personalizados."
               icon={<Fingerprint className="w-8 h-8" />}
             />

             {/* 6. Evolución Garantizada */}
             <TiltCard 
               title="Evolución Garantizada" 
               description="Tu estilo cambia, y tu prenda puede hacerlo contigo. Diseñamos para permitir ajustes futuros sin perder la forma."
               icon={<Infinity className="w-8 h-8" />}
             />
          </div>
        </div>
      </section>

      {/* Process Section with 3D Carousel */}
      <section id="process" className="py-24 bg-amalfi-stone text-amalfi-navy overflow-hidden scroll-mt-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="font-serif text-4xl md:text-5xl mb-4">El proceso AMALFI SARTORIALE</h2>
            <p className="font-sans text-gray-600 tracking-widest uppercase text-xs">Cuatro etapas de excelencia sartorial</p>
          </div>
          
          {/* New 3D Component */}
          <Process3D />
          
        </div>
      </section>

      {/* Collections Preview with Tilt */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Updated Collection Images */}
              <TiltCard 
                title="Ceremonia" 
                subtitle="Black Tie & Eventos"
                customImage={<CeremoniaImage />}
              />
              <TiltCard 
                title="Negocios" 
                subtitle="Power Suits & Diario"
                customImage={<NegociosImage />}
              />
              <TiltCard 
                title="Casual Sartorial" 
                subtitle="Jacketing & Lino"
                image="https://i.ibb.co/LX9BZ9ck/Captura-de-pantalla-2025-05-05-195716.png"
              />
           </div>
         </div>
      </section>

      {/* Careers / Sales Recruitment */}
      <Careers />

      {/* Footer / Contact */}
      <footer id="contact" className="bg-amalfi-navy pt-24 pb-12 text-white border-t border-gray-800 scroll-mt-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-sans tracking-[0.3em] text-amalfi-gold uppercase text-xs mb-6">Contacto</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-8">Visita nuestro Showroom</h2>
            
            <div className="flex flex-col justify-center items-center gap-4 font-serif text-2xl">
              <a href="tel:+525554127828" className="hover:text-amalfi-gold transition-colors border-b border-transparent hover:border-amalfi-gold pb-1">
                +52 55 5412 7828
              </a>
              <a href="mailto:contacto@amalfisartoriale.com" className="hover:text-amalfi-gold transition-colors border-b border-transparent hover:border-amalfi-gold pb-1">
                contacto@amalfisartoriale.com
              </a>
            </div>

            {/* Social Icons Row */}
            <div className="flex justify-center items-center gap-8 mt-10">
              <a 
                href="https://www.facebook.com/amalfisartoriale/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 hover:bg-amalfi-gold hover:text-white transition-all transform hover:scale-110"
              >
                <Facebook size={24} />
              </a>
              
              <a 
                href="https://www.instagram.com/amalfisartoriale/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 hover:bg-amalfi-gold hover:text-white transition-all transform hover:scale-110"
              >
                <Instagram size={24} />
              </a>

              <a 
                href="https://api.whatsapp.com/send/?phone=525554127828&text&type=phone_number&app_absent=0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 hover:bg-amalfi-gold hover:text-white transition-all transform hover:scale-110"
              >
                 {/* WhatsApp SVG */}
                 <svg 
                   xmlns="http://www.w3.org/2000/svg" 
                   width="24" 
                   height="24" 
                   viewBox="0 0 24 24" 
                   fill="none" 
                   stroke="currentColor" 
                   strokeWidth="2" 
                   strokeLinecap="round" 
                   strokeLinejoin="round"
                 >
                   <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                 </svg>
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-12 flex flex-col items-center justify-center gap-6">
             <div className="text-center flex flex-col items-center">
                <Logo className="h-8 w-auto opacity-80" color="#ffffff" />
                <p className="font-sans text-[10px] tracking-widest uppercase text-gray-500 mt-2">Ciudad de México</p>
             </div>
          </div>
          
          <div className="mt-12 text-center font-sans text-[10px] text-gray-600 uppercase tracking-widest">
            &copy; 2025 Amalfi Sartoriale. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* Chat Bot */}
      <Concierge />

    </div>
  );
}

export default App;