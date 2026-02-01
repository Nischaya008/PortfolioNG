import React from 'react';
import { Mail, Phone, Github, Linkedin, ArrowUp, Code2, Terminal, Keyboard } from 'lucide-react';
import { EMAIL, PHONE, GITHUB, LINKEDIN, LEETCODE, GEEKSFORGEEKS, MONKEYTYPE } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="py-12 sm:py-20 border-t border-white/10 bg-black relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 mb-12 sm:mb-20">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-6 sm:mb-8 tracking-tight">
              Let's build <br />
              <span className="text-primary">something great.</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-10 max-w-md">
              Open to opportunities in Backend Engineering and Full-Stack Development.
            </p>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=nischayagarg008@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-primary text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all transform hover:-translate-y-1 text-sm sm:text-base"
            >
              Get in Touch
            </a>
          </div>

          <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Contact</h3>
              <a href={`mailto:${EMAIL}`} className="block text-lg sm:text-2xl font-semibold text-white hover:text-primary transition-colors mb-2 break-all">
                {EMAIL}
              </a>
              <p className="text-base sm:text-xl text-gray-400">{PHONE}</p>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Socials</h3>
              <div className="flex gap-3 sm:gap-4">
                <a href={GITHUB} target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-primary transition-all">
                  <Github size={20} className="text-white sm:w-6 sm:h-6" />
                </a>
                <a href={LINKEDIN} target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-primary transition-all">
                  <Linkedin size={20} className="text-white sm:w-6 sm:h-6" />
                </a>
              </div>
              <div className="flex gap-3 sm:gap-4 mt-3 sm:mt-4">
                <a href={LEETCODE} target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-primary transition-all" title="LeetCode">
                  <Code2 size={20} className="text-white sm:w-6 sm:h-6" />
                </a>
                <a href={GEEKSFORGEEKS} target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-primary transition-all" title="GeeksForGeeks">
                  <Terminal size={20} className="text-white sm:w-6 sm:h-6" />
                </a>
                <a href={MONKEYTYPE} target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-primary transition-all" title="MonkeyType">
                  <Keyboard size={20} className="text-white sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} Nischaya Garg. Built with React & Tailwind.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;