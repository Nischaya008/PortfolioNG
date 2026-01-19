import React from 'react';
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

function App() {
  return (
    <div className="bg-transparent min-h-screen text-white font-sans selection:bg-primary selection:text-black cursor-none">
      <Cursor />
      <Background />
      <Logo />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Experience />
        <Projects />
        <WhatIDo />
        <Skills />
        <Achievements />
      </main>
      <Footer />
      <ChatWidget />
      <ScrollToTop />
    </div>
  );
}

export default App;