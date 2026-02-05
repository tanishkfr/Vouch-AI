import React from 'react';
import { ShieldCheck, Zap, Users, Lock, Database, FileSearch, ArrowDown, BrainCircuit, RefreshCcw, SearchCheck } from 'lucide-react';
import { Button } from '../components/Button';

// Simplified Lock Graphic
const SimpleLock = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full text-white drop-shadow-2xl">
      <path d="M60 80 V 50 C 60 20, 140 20, 140 50 V 80" 
            fill="none" 
            stroke="#F0543C" 
            strokeWidth="20" 
            strokeLinecap="round" 
      />
      <rect x="40" y="80" width="120" height="100" rx="20" fill="#2D2D2D" stroke="white" strokeWidth="8" />
      <circle cx="100" cy="130" r="16" fill="white" />
      <path d="M100 130 L 100 160" stroke="white" strokeWidth="12" strokeLinecap="round" />
  </svg>
);

export const Home: React.FC<{ setPage: (page: any) => void }> = ({ setPage }) => {
  return (
    <div className="w-full pt-0">
      
      {/* 1. HERO: MANIFESTO - Full Height */}
      <section className="bg-[#F0543C] min-h-screen w-full flex flex-col justify-center items-center text-center px-6 relative overflow-hidden pt-32 pb-20 animate-in fade-in zoom-in-95 duration-700">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="max-w-7xl mx-auto z-10 space-y-12">
           <div className="inline-flex items-center gap-3 bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-black/10 text-[#1A1A1A] font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all cursor-pointer shadow-lg hover:scale-105">
              <span className="w-3 h-3 bg-white rounded-full animate-ping"></span>
              The Algorithm Safety Net
           </div>

           <h1 className="text-[14vw] md:text-[10rem] font-black text-[#1A1A1A] leading-[0.8] tracking-tighter drop-shadow-sm mix-blend-multiply animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-200">
             REAL TRUTH. <br/>
             <span className="text-white relative drop-shadow-xl">
               NO STRIKES.
             </span>
           </h1>
           
           <p className="text-2xl md:text-4xl font-bold text-[#1A1A1A] max-w-4xl mx-auto leading-tight tracking-tight animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-300">
             We audit your content for liability, cancellation risks, and advertiser safety <span className="underline decoration-4 decoration-white">before</span> you hit publish.
           </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8 scale-110 origin-top animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500">
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

      {/* 2. THE 3-LAYER SCRUTINY: New Section */}
      <section className="bg-white py-32 px-6 w-full border-b-2 border-black/5">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 animate-in slide-in-from-bottom-10 fade-in duration-700">
                <h2 className="text-5xl md:text-7xl font-black text-[#1A1A1A] uppercase tracking-tighter leading-none mb-4">The Brain <br/><span className="text-[#F0543C]">Under The Hood</span></h2>
                <p className="text-xl font-bold text-gray-400 max-w-2xl mx-auto">Not just a keyword filter. A semantic understanding engine.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { 
                        title: "Contextual NLP", 
                        desc: "We don't just flag words; we understand the vibe, irony, and intent of the conversation.",
                        icon: <BrainCircuit size={40} />,
                        color: "bg-[#1A1A1A] text-white"
                    },
                    { 
                        title: "Real-Time TOS Sync", 
                        desc: "Our database updates daily with the latest YouTube, Spotify, and Twitch community guidelines.",
                        icon: <RefreshCcw size={40} />,
                        color: "bg-[#F5F1E6] text-[#1A1A1A]"
                    },
                    { 
                        title: "Fact-Check Engine", 
                        desc: "Connected to global verified databases to catch unverified claims before they go live.",
                        icon: <SearchCheck size={40} />,
                        color: "bg-[#7BC65C] text-[#1A1A1A]"
                    }
                ].map((card, i) => (
                    <div key={i} className={`p-10 rounded-[2.5rem] border-4 border-[#1A1A1A]/5 shadow-xl flex flex-col gap-6 hover:-translate-y-2 transition-transform duration-300 ${card.color} animate-in slide-in-from-bottom-12`} style={{ animationDelay: `${i * 150}ms` }}>
                        <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner">
                            {card.icon}
                        </div>
                        <div>
                            <h3 className="text-3xl font-black mb-4 leading-tight">{card.title}</h3>
                            <p className="font-bold opacity-80 text-lg leading-relaxed">{card.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. YOUR DATA IS GHOSTED: Dark Block */}
      <section className="bg-[#1A1A1A] py-32 px-6 w-full text-white relative overflow-hidden">
         <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#2D2D2D] to-transparent opacity-50"></div>
         
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
            <div className="flex-1 animate-in slide-in-from-bottom-16 fade-in duration-1000">
                <div className="inline-block bg-[#7BC65C] text-[#1A1A1A] px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-8 shadow-[0_0_20px_rgba(123,198,92,0.4)]">
                    Zero-Persistence Protocol
                </div>
                <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                    YOUR DATA IS <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">GHOSTED.</span>
                </h2>
                <div className="space-y-6 text-xl font-medium text-gray-400">
                     <p className="leading-relaxed border-l-4 border-[#F0543C] pl-6 py-2">
                        Once a file is processed and you close the Studio, the temporary processing cache is completely purged. 
                        <span className="text-white font-bold block mt-2">No logs. No leaks. No training data.</span>
                     </p>
                </div>
            </div>
            <div className="flex-1 flex justify-center animate-in slide-in-from-right-16 fade-in duration-1000">
                <div className="w-80 h-80 flex items-center justify-center p-8 bg-[#2D2D2D] rounded-[3rem] border-4 border-white/5 shadow-2xl hover:scale-105 transition-transform duration-500">
                     <SimpleLock />
                </div>
            </div>
         </div>
      </section>

      {/* 4. STEP-BY-STEP: Vertical Scroll Reveal */}
      <section className="py-32 px-6 bg-[#F5F1E6] w-full">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-[#1A1A1A] mb-20 text-center uppercase tracking-tight animate-in slide-in-from-bottom-8">The Workflow</h2>
            
            <div className="space-y-4 relative">
                {/* Connecting Line */}
                <div className="absolute left-[39px] top-8 bottom-8 w-1 bg-[#1A1A1A]/10 rounded-full hidden md:block"></div>

                {[
                    { step: "01", title: "UPLOAD", desc: "Drag & drop your raw audio. We ingest wav, mp3, and m4a in a volatile sandbox.", icon: <Users /> },
                    { step: "02", title: "SCAN", desc: "The 150-point integrity check runs against current ad-safety guidelines.", icon: <FileSearch /> },
                    { step: "03", title: "CLEAN", desc: "One-click 'Nuke' for liabilities, or 'Fix' for minor infractions.", icon: <ShieldCheck /> }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-8 group animate-in slide-in-from-bottom-12 fade-in duration-700 relative z-10 bg-[#F5F1E6] p-4" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-white rounded-2xl border-4 border-[#1A1A1A] flex flex-col items-center justify-center text-[#1A1A1A] group-hover:bg-[#F0543C] group-hover:border-[#F0543C] group-hover:text-white transition-colors shadow-[4px_4px_0px_#1A1A1A]">
                                <span className="text-xs font-black opacity-50">STEP</span>
                                <span className="text-2xl font-black">{item.step}</span>
                            </div>
                        </div>
                        <div className="pt-2 pb-8 border-b-2 border-[#1A1A1A]/5 w-full">
                            <h3 className="text-4xl font-black text-[#1A1A1A] mb-2">{item.title}</h3>
                            <p className="text-gray-500 font-bold text-xl leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};