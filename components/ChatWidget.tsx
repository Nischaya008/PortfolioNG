import React, { useState } from 'react';
import { MessageCircle, X, Linkedin } from 'lucide-react';
import { LINKEDIN } from '../constants';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-4 pointer-events-none">
      {/* Chat Card */}
      <div
        className={`
          transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom-right pointer-events-auto
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8 pointer-events-none'}
          w-[320px] bg-card border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden
        `}
      >
        {/* Header */}
        <div className="bg-primary p-5 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-black/10 overflow-hidden border border-black/10">
                <img src="../assets/Hero_Pic.jpg" alt="Nischaya" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-white rounded-full border-2 border-primary"></div>
            </div>
            <div>
              <h3 className="text-black font-bold text-sm leading-tight">Nischaya Garg</h3>
              <p className="text-black/70 text-xs font-medium">Software Engineer</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-black/50 hover:text-black transition-colors rounded-full p-1 hover:bg-black/5 cursor-none"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-[#0a0a0a]">
          <p className="text-gray-300 text-sm mb-6 leading-relaxed">
            Hey there! 👋 <br />
            Want to chat about backend systems, distributed architectures, or anything tech?
            <br /><br />
            Click below to message me on LinkedIn!
          </p>

          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#0077b5] hover:bg-[#006097] text-white rounded-lg font-semibold text-sm transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95 cursor-none"
          >
            <Linkedin size={18} />
            Message on LinkedIn
          </a>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-none
          ${isOpen ? 'bg-zinc-800 text-white rotate-90' : 'bg-primary text-black hover:scale-110 hover:shadow-[0_0_20px_rgba(0,255,136,0.5)]'}
        `}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} strokeWidth={2.5} />}
      </button>
    </div>
  );
};

export default ChatWidget;