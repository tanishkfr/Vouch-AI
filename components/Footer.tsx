import React, { useState } from 'react';
import { Twitter, Instagram, Linkedin, ArrowRight, Check } from 'lucide-react';
import { Button } from './Button';

export const Footer: React.FC<{ setPage: (page: any) => void; activePage?: string }> = ({ setPage, activePage }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleLinkClick = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    alert(`${name} View Coming Soon (Legal Mock)`);
  };

  const handleSubscribe = () => {
      if(email) {
          setSubmitted(true);
      }
  };

  const isStudio = activePage === 'studio';

  return (
    <footer className="bg-[#1A1A1A] text-white pt-32 pb-12 px-6 mt-0 relative overflow-hidden border-t-[3px] border-[#333] w-full">
      
      {/* Massive Background Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none select-none flex justify-center items-center opacity-30">
        <h1 className="text-[20vw] font-black leading-none tracking-tighter" 
            style={{ WebkitTextStroke: '2px #333333', color: 'transparent' }}>
          AUDIT-POP
        </h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        
        {/* Dynamic Center-Piece CTA */}
        <div className="mb-32 space-y-10">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
            {isStudio ? (
                <>
                    Everything <br/> <span className="text-[#7BC65C]">sound right?</span>
                </>
            ) : (
                <>
                    Ready to keep your<br/>channel safe?
                </>
            )}
          </h2>
          <div className="flex justify-center">
             {isStudio ? (
                <Button 
                   variant="secondary" 
                   size="lg" 
                   onClick={() => alert("Simulating Publish Workflow...")}
                   className="scale-125 border-4 border-[#1A1A1A] shadow-[0_0_30px_rgba(123,198,92,0.3)] hover:shadow-[0_0_50px_rgba(123,198,92,0.6)]"
                >
                    Export & Publish
                </Button>
             ) : (
                <Button 
                   variant="secondary" 
                   size="lg" 
                   onClick={() => setPage('studio')} 
                   className="scale-125 border-4 border-[#1A1A1A] shadow-[0_0_30px_rgba(123,198,92,0.3)] hover:shadow-[0_0_50px_rgba(123,198,92,0.6)]"
                >
                    Enter The Studio
                </Button>
             )}
          </div>
        </div>

        {/* Newsletter Input */}
        <div className="mb-24 w-full max-w-sm h-24 flex items-center justify-center">
           {!submitted ? (
               <div className="w-full">
                    <div className="flex items-center border-b-2 border-white/20 pb-2 group focus-within:border-[#F0543C] transition-colors gap-2">
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="STAY SPICY" 
                            className="bg-transparent w-full outline-none text-xl font-black placeholder:text-white/30 text-white uppercase tracking-wider"
                        />
                        <button 
                            onClick={handleSubscribe}
                            className="text-white group-focus-within:translate-x-2 transition-transform duration-300"
                        >
                            <ArrowRight size={28} />
                        </button>
                    </div>
                    <p className="text-left text-xs font-bold uppercase tracking-widest mt-2 opacity-40 text-white">Join the newsletter</p>
               </div>
           ) : (
               <div className="text-2xl font-bold animate-in zoom-in fade-in duration-500 flex flex-col items-center gap-2">
                   <div className="flex items-center gap-2 text-[#7BC65C]">
                        <Check size={28} /> 
                        <span>You're on the list.</span>
                   </div>
                   <span className="text-sm opacity-60 uppercase tracking-widest text-white/60">Stay spicy! 🌶️</span>
               </div>
           )}
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 border-t-2 border-white/10 pt-12 relative">
          <div className="flex gap-8 text-sm font-black uppercase tracking-widest text-gray-400">
            <a href="#" onClick={(e) => handleLinkClick(e, "Privacy")} className="hover:text-white transition-colors">Privacy</a>
            <a href="#" onClick={(e) => handleLinkClick(e, "Terms")} className="hover:text-white transition-colors">Terms</a>
            <a href="#" onClick={(e) => handleLinkClick(e, "Security")} className="hover:text-white transition-colors">Security</a>
          </div>
          
          <div className="text-xs font-black uppercase tracking-widest text-gray-600 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-full text-center">
            © 2026 AUDIT-POP INC.
          </div>

          <div className="flex gap-6 text-white">
            <Twitter size={24} className="hover:text-[#F0543C] cursor-pointer transition-colors hover:-translate-y-1 duration-300" onClick={() => alert("Social Link: Twitter")} />
            <Instagram size={24} className="hover:text-[#F0543C] cursor-pointer transition-colors hover:-translate-y-1 duration-300" onClick={() => alert("Social Link: Instagram")} />
            <Linkedin size={24} className="hover:text-[#F0543C] cursor-pointer transition-colors hover:-translate-y-1 duration-300" onClick={() => alert("Social Link: LinkedIn")} />
          </div>
        </div>
      </div>
    </footer>
  );
};