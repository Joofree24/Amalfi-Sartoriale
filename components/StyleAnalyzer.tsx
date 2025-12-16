import React, { useState, useRef } from 'react';
import { RefreshCw, Camera, CheckCircle, Upload } from 'lucide-react';
import { analyzeStyleImage } from '../services/geminiService';
import { AnalysisResult, LoadingState } from '../types';

export const StyleAnalyzer: React.FC = () => {
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setStatus(LoadingState.LOADING);
    setResult(null);

    // Convert to base64 for Gemini
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = (reader.result as string).split(',')[1];
      const mimeType = file.type;
      
      const analysis = await analyzeStyleImage(base64String, mimeType);
      if (analysis) {
        setResult(analysis);
        setStatus(LoadingState.SUCCESS);
      } else {
        setStatus(LoadingState.ERROR);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="py-32 bg-amalfi-stone relative overflow-hidden scroll-mt-32" id="style-analyzer">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amalfi-gold/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amalfi-navy/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-amalfi-gold font-sans text-sm tracking-[0.3em] uppercase block mb-4">Inteligencia Artesanal</span>
          <h2 className="font-serif text-4xl md:text-6xl text-amalfi-navy mb-8">El Atelier Visual</h2>
          <p className="font-sans text-gray-600 leading-relaxed text-lg">
            ¿Viste un traje en una película o una tela que te inspira? 
            Sube la foto. Nuestra IA, entrenada con décadas de conocimiento sartorial, 
            analizará el corte y te dirá cómo podemos crearlo para ti.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start justify-center">
          
          {/* Upload Zone */}
          <div className="w-full max-w-md perspective-1000 mx-auto lg:mx-0">
            <div 
              className={`relative group cursor-pointer border-2 border-dashed rounded-2xl h-[500px] flex flex-col items-center justify-center transition-all duration-500 bg-white shadow-xl transform hover:rotate-y-2 preserve-3d overflow-hidden
                ${status === LoadingState.LOADING ? 'border-amalfi-gold' : 'border-gray-300 hover:border-amalfi-gold'}
              `}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileSelect}
              />
              
              {preview ? (
                <>
                   <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60" />
                   <div className="absolute inset-0 bg-amalfi-navy/30"></div>
                </>
              ) : null}

              <div className="relative z-10 text-center p-8 transform translate-z-20">
                {status === LoadingState.LOADING ? (
                  <RefreshCw className="w-16 h-16 text-white animate-spin mx-auto mb-6 drop-shadow-lg" />
                ) : (
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 shadow-lg ${preview ? 'bg-white/20 backdrop-blur-md text-white' : 'bg-amalfi-stone text-amalfi-navy group-hover:bg-amalfi-gold group-hover:text-white'}`}>
                     {preview ? <RefreshCw size={32} /> : <Upload size={32} />}
                  </div>
                )}
                
                <h3 className={`font-serif text-2xl mb-3 ${preview ? 'text-white' : 'text-amalfi-navy'}`}>
                  {status === LoadingState.LOADING ? "Analizando Tejido..." : (preview ? "Cambiar Imagen" : "Sube tu Inspiración")}
                </h3>
                <p className={`text-sm font-sans tracking-wide ${preview ? 'text-gray-200' : 'text-gray-500'}`}>
                  {status === LoadingState.LOADING ? "Consultando archivos..." : "JPG o PNG"}
                </p>
              </div>
            </div>
          </div>

          {/* Result Card */}
          {result && status === LoadingState.SUCCESS && (
            <div className="w-full max-w-md bg-white p-10 shadow-2xl border-t-4 border-amalfi-gold relative animate-fade-in-up mx-auto lg:mx-0 rounded-b-xl">
               <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-amalfi-navy text-amalfi-gold p-3 rounded-full shadow-lg ring-4 ring-white">
                 <CheckCircle size={32} />
               </div>
               
               <div className="text-center mb-8 mt-4">
                 <h3 className="font-serif text-3xl text-amalfi-navy mb-2">{result.title}</h3>
                 <div className="w-24 h-0.5 bg-amalfi-gold mx-auto opacity-50"></div>
               </div>
               
               <div className="space-y-8">
                 <div className="group">
                   <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-1 block group-hover:text-amalfi-gold transition-colors">Composición</span>
                   <p className="font-serif text-xl text-gray-800 border-l-2 border-transparent group-hover:border-amalfi-gold pl-0 group-hover:pl-3 transition-all duration-300">{result.fabric}</p>
                 </div>
                 
                 <div className="group">
                   <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-1 block group-hover:text-amalfi-gold transition-colors">Ocasión Sugerida</span>
                   <p className="font-sans text-gray-600 text-sm leading-relaxed">{result.occasion}</p>
                 </div>
                 
                 <div className="bg-amalfi-stone/50 p-6 rounded-lg border border-amalfi-gold/20 relative">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amalfi-gold to-transparent opacity-30"></div>
                   <span className="text-[10px] font-bold tracking-[0.2em] text-amalfi-gold uppercase mb-2 block">La Voz del Sastre</span>
                   <p className="font-serif italic text-lg text-amalfi-navy leading-relaxed">"{result.advice}"</p>
                 </div>
               </div>

               <button className="w-full mt-10 bg-amalfi-navy text-white py-5 font-sans text-xs tracking-[0.2em] hover:bg-amalfi-gold transition-colors uppercase flex items-center justify-center gap-3 group">
                 <span>Solicitar Presupuesto</span>
                 <span className="group-hover:translate-x-1 transition-transform">→</span>
               </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};