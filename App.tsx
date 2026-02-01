import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Background from './components/Background';
import ChatWidget from './components/ChatWidget';
import Cursor from './components/Cursor';
import ScrollToTop from './components/ScrollToTop';
import Logo from './components/Logo';
import WhatIDo from './components/WhatIDo';
import Achievements from './components/Achievements';
import Loader from './components/Loader';
import { useDirectHover } from './hooks/useDirectHover';

function App() {
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useDirectHover(); // Initialize direct hover manager that works on scroll

  return (
    <div className="bg-transparent min-h-screen text-white font-sans selection:bg-primary selection:text-black cursor-none">
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Cursor />
      <Background />
      <Logo onClick={() => setLoading(true)} />
      <Navbar />
      <main className="relative z-10">
        <Hero openChat={() => setIsChatOpen(true)} />
        <Experience />
        <Projects />
        <WhatIDo />
        <Skills />
        <Achievements />
      </main>
      <Footer />
      <ChatWidget
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
      <ScrollToTop />
    </div>
  );
}

export default App;
