import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { Message } from '../types';
import { sendChatMessage } from '../services/geminiService';
import { Logo } from './Logo';

export const Concierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Bienvenido a Amalfi Sartoriale. Soy tu asistente virtual. Estoy aquí para orientarte sobre nuestra experiencia de sastrería a medida y diseño exclusivo. ¿En qué puedo ayudarte hoy?", timestamp: new Date() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Format history for API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await sendChatMessage(history, input);
    
    const modelMsg: Message = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-50 bg-amalfi-gold text-white p-4 rounded-full shadow-2xl hover:bg-gray-800 transition-all duration-300 flex items-center gap-2 group ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />
        <span className="font-serif italic pr-1">Asistente Virtual</span>
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-8 right-8 z-50 w-96 bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-500 transform border border-gray-100 ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-amalfi-navy p-5 flex justify-between items-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-amalfi-gold/10"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 rounded-full bg-amalfi-navy overflow-hidden border-2 border-amalfi-gold shadow-lg flex items-center justify-center p-2">
               <Logo className="w-full h-full object-contain" color="#ffffff" />
            </div>
            <div>
              <h3 className="font-serif text-xl leading-none">Amalfi Concierge</h3>
              <p className="text-xs text-amalfi-gold uppercase tracking-wider mt-1">Asistente Virtual</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors relative z-10">
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-96 overflow-y-auto p-4 bg-amalfi-stone/30 space-y-4 scrollbar-thin scrollbar-thumb-amalfi-navy">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-sans leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-amalfi-navy text-white rounded-br-sm' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 flex gap-1 items-center">
                <span className="text-xs text-gray-400 mr-2 font-serif italic">Escribiendo</span>
                <span className="w-1 h-1 bg-amalfi-gold rounded-full animate-bounce"></span>
                <span className="w-1 h-1 bg-amalfi-gold rounded-full animate-bounce delay-100"></span>
                <span className="w-1 h-1 bg-amalfi-gold rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Escribe tu consulta..."
              className="w-full pr-12 pl-5 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-amalfi-gold focus:ring-1 focus:ring-amalfi-gold font-sans text-sm transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-amalfi-navy text-white rounded-full hover:bg-amalfi-gold disabled:opacity-50 disabled:hover:bg-amalfi-navy transition-all duration-300"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-gray-400 uppercase tracking-widest">
            <Sparkles size={10} className="text-amalfi-gold" />
            <span>IA Amalfi Sartoriale</span>
          </div>
        </div>
      </div>
    </>
  );
};