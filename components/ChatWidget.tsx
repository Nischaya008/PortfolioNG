import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Linkedin, Send, Loader2, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { LINKEDIN } from '../constants';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose, onToggle }) => {
  // Remove internal isOpen state
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi, I’m NisBot, Nischaya Garg’s professional AI representative. I can answer questions about my background, projects, and engineering experience." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue.trim();
    setInputValue("");
    setError(null);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    try {
      // Direct call to backend using 127.0.0.1 (Fixes Windows IPv6 'Stalled' connection issues)
      const response = await fetch('http://127.0.0.1:8000/api/nisbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMsg }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 429) throw new Error("Too many requests. Please wait a moment.");
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setMessages(prev => [...prev, { role: 'assistant', content: "Temporary connectivity issue. Debugging in progress." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 sm:bottom-4 md:bottom-6 right-4 sm:right-6 z-[60] flex flex-col items-end gap-3 sm:gap-4 pointer-events-none">
      {/* Chat Card */}
      <div
        className={`
          transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom-right pointer-events-auto
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8 pointer-events-none'}
          w-[360px] sm:w-[480px] h-[600px] bg-gradient-to-br from-zinc-900 to-[#001a0e] border border-[#00FF88]/20 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col
        `}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center bg-[#00FF88]/5 border-b border-[#00FF88]/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-black/10 overflow-hidden border border-[#00FF88]/20">
                <img src="/assets/Hero_Pic.jpg" alt="Nischaya" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00FF88] rounded-full border-2 border-zinc-900"></div>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">NisBot <span className="text-[10px] font-normal opacity-70 bg-[#00FF88]/10 text-[#00FF88] px-1.5 py-0.5 rounded ml-1">AI Agent</span></h3>
              <p className="text-white/60 text-[11px] font-medium">Replying as Nischaya Garg</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`
                  max-w-[90%] p-3.5 sm:p-4 rounded-2xl text-[15px] sm:text-base leading-relaxed tracking-wide shadow-sm
                  ${msg.role === 'user' ? 'bg-[#00FF88] text-black font-medium rounded-br-none' : 'bg-zinc-800/80 backdrop-blur-sm text-gray-100 rounded-bl-none border border-[#00FF88]/20'}
                `}
              >
                {msg.role === 'assistant' ? (
                  <div className="prose prose-invert prose-p:leading-relaxed prose-pre:bg-zinc-900 prose-pre:p-2 prose-pre:rounded-lg max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-zinc-800/50 text-gray-200 rounded-2xl rounded-bl-none border border-[#00FF88]/10 p-3 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-[#00FF88] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-[#00FF88] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-[#00FF88] rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-black/20 border-t border-[#00FF88]/10">
          <form
            onSubmit={handleSendMessage}
            className="flex gap-2 items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 focus-within:border-[#00FF88]/30 transition-colors"
          >
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about skills, projects..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="text-white/70 hover:text-[#00FF88] disabled:opacity-30 disabled:hover:text-white/70 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
          <div className="mt-2 text-center">
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] text-white/30 hover:text-[#00FF88] transition-colors flex items-center justify-center gap-1"
            >
              <Linkedin size={10} /> Connect directly on LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`
          w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer
          ${isOpen ? 'bg-zinc-800 text-white rotate-90' : 'bg-[#00FF88] text-black hover:scale-110 hover:shadow-[0_0_20px_rgba(0,255,136,0.5)]'}
        `}
      >
        {isOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <MessageCircle size={24} className="sm:w-7 sm:h-7" strokeWidth={2.5} />}
      </button>
    </div>
  );
};

export default ChatWidget;