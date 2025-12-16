
import React from 'react';

// EL ERROR OCURRÍA PORQUE EL ENLACE ANTERIOR ERA UNA PÁGINA WEB, NO UNA IMAGEN DIRECTA.
// He colocado esta imagen temporal de alta calidad para la sección de Negocios.
// Si deseas poner TU foto específica, asegúrate de copiar el "Enlace directo de la imagen" (debe terminar en .jpg o .png).
const CUSTOM_IMAGE_URL = "https://i.ibb.co/rRYMpXWf/Captura-de-pantalla-2025-10-06-204617.png"; 

export const NegociosImage: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`relative w-full h-full ${className} overflow-hidden bg-gray-200`}>
      <img 
        src={CUSTOM_IMAGE_URL} 
        alt="Negocios Amalfi Sartoriale" 
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-110"
        onError={(e) => {
          e.currentTarget.src = "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-amalfi-navy/40 to-transparent mix-blend-multiply"></div>
    </div>
  );
};
