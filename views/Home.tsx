import React from 'react';
import { ShieldCheck, Zap, Users, Lock, Database, FileSearch, ArrowDown } from 'lucide-react';
import { Button } from '../components/Button';

// Custom Stylized Lock Icon (Minimalist)
const StylizedLock = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-white/90">
    <path d="M30 40 V 25 C 30 10, 70 10, 70 25 V 40" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    <rect x="20" y="40" width="60" height="50" rx="12" stroke="currentColor" strokeWidth="6" fill="none" />
    <circle cx="50" cy="60" r="4" fill="currentColor" />
    <path d="M50 64 V 72" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    
    {/* Minimalist Accents */}
    <circle cx="75" cy="20" r="3" fill="#F0543C" />
    <path d="M20 80 L 10 90" stroke="#7BC65C" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const Home: React.FC<{ setPage: (page: any) => void }> = ({ setPage }) => {
  return (
    <div className="w-full pt-0">
      
      {/* 1. HERO: MANIFESTO - Full Height */}
      <section className="bg-[#F0543C] min-h-screen w-full flex flex-col justify-center items-center text-center px-6 relative overflow-hidden pt-32 pb-20">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="max-w-7xl mx-auto z-10 space-y-12">
           <div className="inline-flex items-center gap-3 bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-black/10 text-[#1A1A1A] font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all cursor-pointer shadow-lg">
              <span className="w-3 h-3 bg-white rounded-full animate-ping"></span>
              The Algorithm Safety Net
           </div>

           <h1 className="text-[14vw] md:text-[10rem] font-black text-[#1A1A1A] leading-[0.8] tracking-tighter drop-shadow-sm mix-blend-multiply">
             REAL TRUTH. <br/>
             <span className="text-white relative drop-shadow-xl">
               NO STRIKES.
             </span>
           </h1>
           
           <p className="text-2xl md:text-4xl font-bold text-[#1A1A1A] max-w-4xl mx-auto leading-tight tracking-tight">
             We audit your content for liability, cancellation risks, and advertiser safety <span className="underline decoration-4 decoration-white">before</span> you hit publish.
           </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8 scale-110 origin-top">
                <Button size="lg" variant="primary" onClick={() => setPage('studio')} icon={<Zap size={24} />}>
                    Start Audit
                </Button>
                <Button size="lg" variant="neutral" onClick={() => setPage('spectrum')}>
                    View The Logic
                </Button>
            </div>
        </div>
        
        <div className="absolute bottom-10 animate-bounce">
            <ArrowDown size={40} className="text-[#1A1A1A]" />
        </div>
      </section>

      {/* 2. THE NUMBERS: Continuous Section */}
      <section className="bg-[#F5F1E6] py-32 px-6 w-full border-b-2 border-black/5">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-5xl md:text-7xl font-black text-[#1A1A1A] uppercase tracking-tighter">Impact Metrics</h2>
            </div>
            <div className="relative h-[600px] md:h-[400px]">
                {/* Card 1 */}
                <div className="absolute top-0 left-0 md:left-0 w-full md:w-1/3 bg-[#1A1A1A] p-10 rounded-3xl shadow-2xl z-30 transform hover:-translate-y-4 transition-transform duration-500 text-white border-4 border-[#F5F1E6]">
                    <div className="w-20 h-20 bg-[#F0543C] rounded-full flex items-center justify-center mb-6 text-white text-3xl font-black">
                        %
                    </div>
                    <h3 className="text-7xl font-black mb-2 tracking-tighter">99.8</h3>
                    <p className="font-bold text-gray-400 text-xl">Factual Accuracy Rate</p>
                </div>
                
                {/* Card 2 */}
                <div className="absolute top-32 md:top-0 left-0 md:left-[30%] w-full md:w-1/3 bg-white p-10 rounded-3xl shadow-2xl z-20 transform hover:-translate-y-4 transition-transform duration-500 border-4 border-[#F5F1E6]">
                    <div className="w-20 h-20 bg-[#7BC65C] rounded-full flex items-center justify-center mb-6 text-[#1A1A1A] text-3xl font-black">
                        #
                    </div>
                    <h3 className="text-7xl font-black text-[#1A1A1A] mb-2 tracking-tighter">10k+</h3>
                    <p className="font-bold text-gray-500 text-xl">Episodes Scanned</p>
                </div>

                {/* Card 3 */}
                <div className="absolute top-64 md:top-0 left-0 md:left-[60%] w-full md:w-1/3 bg-[#F0543C] p-10 rounded-3xl shadow-2xl z-10 transform hover:-translate-y-4 transition-transform duration-500 border-4 border-[#F5F1E6]">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 text-[#F0543C] text-3xl font-black">
                        0
                    </div>
                    <h3 className="text-7xl font-black text-white mb-2 tracking-tighter">ZERO</h3>
                    <p className="font-bold text-[#1A1A1A] text-xl">Platform Bans</p>
                </div>
            </div>
        </div>
      </section>

      {/* 3. TRUST: Black Block */}
      <section className="bg-[#1A1A1A] py-32 px-6 w-full text-white relative overflow-hidden">
         <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#2D2D2D] to-transparent opacity-50"></div>
         
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
            <div className="flex-1">
                <div className="inline-block bg-[#7BC65C] text-[#1A1A1A] px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-8 shadow-[0_0_20px_rgba(123,198,92,0.4)]">
                    Security Protocol: Active
                </div>
                <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                    YOUR DATA IS <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">GHOSTED.</span>
                </h2>
                <div className="space-y-6 text-xl font-medium text-gray-400">
                    <div className="flex items-center gap-4">
                        <Database className="text-[#F0543C]" />
                        <p>Volatile Sandbox Processing (RAM only)</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Lock className="text-[#F0543C]" />
                        <p>Zero-Log Policy (Wiped instantly)</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <ShieldCheck className="text-[#F0543C]" />
                        <p>No Training on User Voice Data</p>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex justify-center">
                <div className="w-80 h-80 flex items-center justify-center p-8">
                     <StylizedLock />
                </div>
            </div>
         </div>
      </section>

      {/* 4. JOURNEY MAP: Full Width */}
      <section className="py-32 px-6 bg-[#F5F1E6] w-full">
        <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-black text-[#1A1A1A] mb-20 text-center uppercase tracking-tight">The Audit Flow</h2>
            
            <div className="space-y-4">
                {[
                    { title: "Initial Scan", desc: "Upload audio. AI transcribes and analyzes tone/context.", icon: <FileSearch /> },
                    { title: "Risk Mapping", desc: "Comparing against live Platform TOS (YouTube/Spotify).", icon: <Database /> },
                    { title: "Flag Review", desc: "You accept edits or nuke segments.", icon: <Users /> },
                    { title: "Clean Export", desc: "Download the safe, monetizable file.", icon: <ShieldCheck /> }
                ].map((step, i) => (
                    <div key={i} className="flex gap-8 group">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-white rounded-2xl border-4 border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#F0543C] group-hover:border-[#F0543C] group-hover:text-white transition-colors z-10 relative shadow-[4px_4px_0px_#1A1A1A]">
                                {step.icon}
                            </div>
                            {i !== 3 && <div className="w-1 h-16 bg-[#1A1A1A]/20 my-2 rounded-full"></div>}
                        </div>
                        <div className="pt-2 pb-12">
                            <h3 className="text-3xl font-black text-[#1A1A1A] mb-2">{step.title}</h3>
                            <p className="text-gray-500 font-bold text-lg">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};