import React from 'react';

interface LogoProps {
  className?: string;
  color?: string; // Optional hex override, otherwise inherits currentColor
}

export const Logo: React.FC<LogoProps> = ({ className, color }) => {
  return (
    <svg 
      viewBox="0 0 240 60" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Amalfi Sartoriale Logo"
    >
      <text 
        x="120" 
        y="35" 
        fontFamily='"Cormorant Garamond", serif' 
        fontSize="38" 
        fill={color || "currentColor"} 
        textAnchor="middle" 
        letterSpacing="0.15em"
        fontWeight="400"
      >
        AMALFI
      </text>
      <text 
        x="120" 
        y="52" 
        fontFamily='"Montserrat", sans-serif' 
        fontSize="8" 
        fill={color || "currentColor"} 
        textAnchor="middle" 
        letterSpacing="0.4em"
        style={{ textTransform: 'uppercase' }}
      >
        Sartoriale
      </text>
    </svg>
  );
};