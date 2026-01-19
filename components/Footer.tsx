import React from 'react';
import { Mail, Phone, Github, Linkedin, ArrowUp, Code2, Terminal, Keyboard } from 'lucide-react';
import { EMAIL, PHONE, GITHUB, LINKEDIN, LEETCODE, GEEKSFORGEEKS, MONKEYTYPE } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="py-20 border-t border-white/10 bg-black relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              Let's build <br />
              <span className="text-primary">something great.</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-md">
              Open to opportunities in Backend Engineering and Full-Stack Development.
            </p>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=nischayagarg008@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="inline-block px-8 py-4 bg-primary text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all transform hover:-translate-y-1"
            >
              Get in Touch
            </a>
          </div>

          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Contact</h3>
              <a href={`mailto:${EMAIL}`} className="block text-2xl font-semibold text-white hover:text-primary transition-colors mb-2">
                {EMAIL}
              </a>
              <p className="text-xl text-gray-400">{PHONE}</p>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Socials</h3>
              <div className="flex gap-4">
                <a href={GITHUB} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-primary transition-all">
                  <Github size={24} className="text-white" />
                </a>
                <a href={LINKEDIN} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-primary transition-all">
                  <Linkedin size={24} className="text-white" />
                </a>
              </div>
              <div className="flex gap-4 mt-4">
                <a href={LEETCODE} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-primary transition-all" title="LeetCode">
                  <Code2 size={24} className="text-white" />
                </a>
                <a href={GEEKSFORGEEKS} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-primary transition-all" title="GeeksForGeeks">
                  <Terminal size={24} className="text-white" />
                </a>
                <a href={MONKEYTYPE} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-primary transition-all" title="MonkeyType">
                  <Keyboard size={24} className="text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Nischaya Garg. Built with React & Tailwind.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;