
import React from 'react';

// ----------------------------------------------------------------------
// INSTRUCCIONES PARA PONER TU IMAGEN PERSONALIZADA:
// 1. Sube tu imagen a https://imgbb.com/ (o cualquier host de imágenes).
// 2. Copia el "Enlace directo" de la imagen.
// 3. Pégalo dentro de las comillas de la variable CUSTOM_IMAGE_URL abajo.
// ----------------------------------------------------------------------

const CUSTOM_IMAGE_URL = "https://i.ibb.co/5XxvGbJV/Captura-de-pantalla-2025-05-05-195740.png"; 
// ^^^ PEGA TU ENLACE AQUÍ ^^^

export const CeremoniaImage: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`relative w-full h-full ${className} overflow-hidden bg-gray-200`}>
      <img 
        src={CUSTOM_IMAGE_URL} 
        alt="Ceremonia Amalfi Sartoriale" 
        className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-110"
        onError={(e) => {
          // Si el enlace falla, usa esta imagen de respaldo
          e.currentTarget.src = "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80";
        }}
      />
      {/* Overlay opcional para mejorar lectura de texto si la imagen es muy clara */}
      <div className="absolute inset-0 bg-gradient-to-t from-amalfi-navy/40 to-transparent mix-blend-multiply"></div>
    </div>
  );
};
