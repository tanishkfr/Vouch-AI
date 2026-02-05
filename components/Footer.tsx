import React, { useState } from 'react';
import { Twitter, Instagram, Linkedin, ArrowRight, Check, Globe, Shield, HelpCircle, FileText } from 'lucide-react';
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

  return (
    <footer className="bg-[#1A1A1A] text-white pt-24 pb-12 px-6 mt-0 relative overflow-hidden border-t-[3px] border-[#333] w-full">
      
      {/* Massive Background Brand Mark */}
      <div className="absolute bottom-[-5%] left-1/2 transform -translate-x-1/2 w-full pointer-events-none select-none flex justify-center items-center opacity-[0.03]">
        <h1 className="text-[30vw] font-black leading-none tracking-tighter text-white">
          VOUCH
        </h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Section: CTA & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 border-b border-white/10 pb-16">
           <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
                 STAY <span className="text-[#F0543C]">AHEAD</span> OF <br/> THE ALGORITHM.
              </h2>
              <p className="text-gray-400 max-w-md font-medium text-lg">
                 Join 10,000+ creators receiving weekly integrity reports and platform policy updates.
              </p>
           </div>
           
           <div className="flex flex-col justify-center">
                {!submitted ? (
                   <div className="w-full max-w-md">
                        <div className="flex items-center border-b-2 border-white/20 pb-4 group focus-within:border-[#F0543C] transition-colors gap-4">
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ENTER YOUR EMAIL" 
                                className="bg-transparent w-full outline-none text-xl font-black placeholder:text-white/20 text-white uppercase tracking-wider"
                            />
                            <button 
                                onClick={handleSubscribe}
                                className="w-12 h-12 bg-white text-[#1A1A1A] rounded-full flex items-center justify-center hover:bg-[#F0543C] hover:text-white transition-all duration-300 hover:scale-110"
                            >
                                <ArrowRight size={24} />
                            </button>
                        </div>
                   </div>
               ) : (
                   <div className="flex items-center gap-3 text-[#7BC65C] animate-in slide-in-from-right-4 fade-in">
                        <div className="w-12 h-12 bg-[#7BC65C]/20 rounded-full flex items-center justify-center">
                            <Check size={24} /> 
                        </div>
                        <div>
                            <p className="font-black text-xl uppercase tracking-wide">You're Vouched.</p>
                            <p className="text-sm opacity-60 text-white">Welcome to the inner circle.</p>
                        </div>
                   </div>
               )}
           </div>
        </div>

        {/* Middle Section: High-Density Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
            
            {/* Column 1: Product */}
            <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#F0543C] mb-4">Product</h3>
                <ul className="space-y-4 font-bold text-gray-400 text-sm">
                    <li><button onClick={() => setPage('home')} className="hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block">Home</button></li>
                    <li><button onClick={() => setPage('spectrum')} className="hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block">The Spectrum</button></li>
                    <li><button onClick={() => setPage('studio')} className="hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block">The Studio</button></li>
                    <li><a href="#" onClick={(e) => handleLinkClick(e, 'Pricing')} className="hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block">Enterprise Pricing</a></li>
                </ul>
            </div>

            {/* Column 2: Company */}
            <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#00E8FF] mb-4">Company</h3>
                <ul className="space-y-4 font-bold text-gray-400 text-sm">
                    <li><a href="#" onClick={(e) => handleLinkClick(e, 'About')} className="hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block">Manifesto</a></li>
                    <li><a href="#" onClick={(e) => handleLinkClick(e, 'Careers')} className="hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block">Careers <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded ml-2 text-white">Hiring</span></a></li>
                    <li><a href="#" onClick={(e) => handleLinkClick(e, 'Brand')} className="hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block">Brand Kit</a></li>
                    <li><a href="#" onClick={(e) => handleLinkClick(e, 'Blog')} className="hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block">Transparency Log</a></li>
                </ul>
            </div>

            {/* Column 3: Support */}
            <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#FFCF36] mb-4">Support</h3>
                <ul className="space-y-4 font-bold text-gray-400 text-sm">
                    <li><button onClick={() => setPage('contact')} className="hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block">Contact Us</button></li>
                    <li><a href="#" onClick={(e) => handleLinkClick(e, 'FAQ')} className="hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block">FAQ</a></li>
                    <li><a href="#" onClick={(e) => handleLinkClick(e, 'Status')} className="hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#7BC65C] rounded-full animate-pulse"></span> Systems Normal
                    </a></li>
                </ul>
            </div>

             {/* Column 4: Legal */}
             <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Legal</h3>
                <ul className="space-y-4 font-bold text-gray-400 text-sm">
                    <li><a href="#" onClick={(e) => handleLinkClick(e, 'Privacy')} className="hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block">Privacy Policy</a></li>
                    <li><a href="#" onClick={(e) => handleLinkClick(e, 'Terms')} className="hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block">Terms of Service</a></li>
                    <li><a href="#" onClick={(e) => handleLinkClick(e, 'Security')} className="hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block">Security Audit</a></li>
                    <li><a href="#" onClick={(e) => handleLinkClick(e, 'Cookies')} className="hover:text-white transition-colors hover:translate-x-1 duration-200 inline-block">Cookie Settings</a></li>
                </ul>
            </div>

        </div>

        {/* Bottom Bar */}
        <div className="w-full flex flex-col md:flex-row justify-between items-end gap-8 pt-8 border-t border-white/10">
          
          <div className="text-xs font-black uppercase tracking-widest text-gray-600 order-2 md:order-1 flex-1">
             © 2026 VOUCH INC. <br/> San Francisco • Bangalore • London
          </div>

          <div className="order-1 md:order-2">
             <div className="w-12 h-12 bg-[#1A1A1A] border-2 border-white/20 rounded-full flex items-center justify-center animate-spin-slow opacity-50">
                <Globe size={20} />
             </div>
          </div>

          <div className="flex gap-4 text-white order-3 md:order-3 flex-1 justify-end">
             <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#F0543C] hover:text-white transition-all duration-300">
                <Twitter size={18} />
             </a>
             <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#F0543C] hover:text-white transition-all duration-300">
                <Instagram size={18} />
             </a>
             <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#F0543C] hover:text-white transition-all duration-300">
                <Linkedin size={18} />
             </a>
          </div>

        </div>
      </div>
    </footer>
  );
};