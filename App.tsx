import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './views/Home';
import { Spectrum } from './views/Spectrum';
import { Studio } from './views/Studio';
import { Contact } from './views/Contact';
import { Profile } from './views/Profile';
import { StudioState, UserProfile } from './types';
import { ArrowRight, ShieldCheck, Zap, Activity, Fingerprint, Loader2 } from 'lucide-react';

// --- COMPONENT: NEURAL SCAN SPLASH ---
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [statusText, setStatusText] = useState("ESTABLISHING INTEGRITY PATHWAY...");

  useEffect(() => {
    const duration = 2500; // 2.5 seconds scan
    const start = performance.now();

    const frame = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      
      setScanProgress(progress * 100);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setStatusText("ESTABLISHING INTEGRITY PATHWAY... [SUCCESS]");
        // Hold for a moment then slide up
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 800); // Wait for transition to finish
        }, 600);
      }
    };

    requestAnimationFrame(frame);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-[#1A1A1A] flex flex-col items-center justify-center overflow-hidden transition-transform duration-[800ms] cubic-bezier(0.7, 0, 0.3, 1) ${isExiting ? '-translate-y-full' : 'translate-y-0'}`}
    >
      {/* Container for Logo */}
      <div className="relative w-full max-w-7xl h-[400px] flex items-center justify-center">
        
        {/* Layer 1: Glitchy Wireframe (Underneath) */}
        <div className="absolute inset-0 flex items-center justify-center select-none opacity-40">
           <h1 
             className="text-[15vw] md:text-[12rem] font-black tracking-tighter leading-none text-transparent animate-pulse"
             style={{ 
               WebkitTextStroke: '2px #E86D44',
               filter: 'blur(1px)',
               transform: 'scale(1.02)'
             }}
           >
             VOUCH
           </h1>
        </div>

        {/* Layer 2: Solid Glowing Reveal (Masked) */}
        <div 
            className="absolute inset-0 flex items-center justify-center select-none"
            style={{ 
                clipPath: `polygon(0 0, 100% 0, 100% ${scanProgress}%, 0 ${scanProgress}%)`
            }}
        >
            <h1 className="text-[15vw] md:text-[12rem] font-black tracking-tighter leading-none text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.6)]">
                VOUCH
            </h1>
        </div>

        {/* The Laser Scanner */}
        <div 
            className="absolute left-0 w-full h-[4px] bg-[#F0543C] shadow-[0_0_50px_#F0543C,0_0_20px_#fff] z-20"
            style={{ 
                top: `${scanProgress}%`,
                opacity: scanProgress >= 100 ? 0 : 1,
                transition: 'opacity 0.2s'
            }}
        >
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#F0543C]/30 to-transparent pointer-events-none"></div>
        </div>

      </div>

      {/* Status Text - Monospace */}
      <div className="absolute bottom-12 left-6 md:left-12 font-mono text-[#F0543C] text-xs md:text-sm font-bold tracking-widest flex items-center gap-3">
         <span className={`w-2 h-2 bg-[#F0543C] ${scanProgress < 100 ? 'animate-ping' : ''}`}></span>
         {statusText}
      </div>
    </div>
  );
};

// --- COMPONENT: ZERO-LAG PRECISION CURSOR ---
const FocusCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hoverState, setHoverState] = useState<'default' | 'hover' | 'danger'>('default');

  useEffect(() => {
    // DIRECT DOM MANIPULATION FOR ZERO LAG
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      // Use translate3d for GPU acceleration, NO TRANSITION on position
      const transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      if (dotRef.current) dotRef.current.style.transform = transform;
      if (ringRef.current) ringRef.current.style.transform = transform;
    };

    const checkHover = (e: MouseEvent) => {
       const target = e.target as HTMLElement;
       if (target.closest('[data-cursor="danger"]')) {
           setHoverState('danger');
           return;
       }
       const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' || 
        target.closest('button') || 
        target.closest('a') ||
        target.closest('[data-cursor="hover"]');
       
       setHoverState(isClickable ? 'hover' : 'default');
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', checkHover);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', checkHover);
    };
  }, []);

  return (
    <>
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border-[2px] flex items-center justify-center will-change-transform"
        style={{
            // CRITICAL: Only transition aesthetic properties, NOT transform
            transition: 'width 0.2s cubic-bezier(0.25, 1, 0.5, 1), height 0.2s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.2s, opacity 0.2s', 
            width: hoverState !== 'default' ? '32px' : '20px',
            height: hoverState !== 'default' ? '32px' : '20px',
            borderColor: hoverState === 'danger' ? '#F0543C' : '#E86D44',
            opacity: hoverState !== 'default' ? 1 : 0.6,
        }}
      />
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white will-change-transform"
        style={{
            width: '4px',
            height: '4px',
            transition: 'box-shadow 0.2s',
            boxShadow: hoverState !== 'default' ? '0 0 15px 2px rgba(255,255,255,0.8)' : 'none'
        }}
      />
    </>
  );
};

// --- COMPONENT: SIGN-IN GATEWAY ---
const SignIn = ({ onLogin }: { onLogin: (name: string) => void }) => {
  const [nameInput, setNameInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDirectEntry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        onLogin(nameInput || "Tanishk"); 
    }, 800);
  };

  const handleSocialLogin = () => {
      setIsLoading(true);
      setTimeout(() => {
        onLogin("Tanishk");
      }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E6] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/40 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-md animate-in slide-in-from-bottom-8 fade-in duration-700">
            <div className="bg-white rounded-[2.5rem] shadow-[16px_16px_0px_rgba(26,26,26,0.05)] border-4 border-white p-8 md:p-10 text-center">
                
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-[#1A1A1A] rounded-2xl flex items-center justify-center text-[#F0543C] shadow-lg transform -rotate-3 mb-4">
                        <Fingerprint size={32} />
                    </div>
                    <h1 className="text-5xl font-black text-[#1A1A1A] tracking-tighter">VOUCH</h1>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Integrity Engine v1.0</p>
                </div>

                <div className="space-y-4">
                    <button 
                        onClick={handleSocialLogin}
                        className="w-full bg-white hover:bg-gray-50 text-[#1A1A1A] font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-95 border-2 border-gray-200 hover:border-gray-300"
                    >
                        Continue with Google
                    </button>

                    <button 
                        onClick={handleSocialLogin}
                        className="w-full bg-black text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-95 border-2 border-black hover:bg-gray-900"
                    >
                        Continue with Apple
                    </button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-400 font-bold tracking-widest">Or Enter Studio</span>
                        </div>
                    </div>

                    <form onSubmit={handleDirectEntry} className="space-y-3">
                         <input 
                            type="text" 
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            placeholder="Your Name (e.g. Tanishk)" 
                            className="w-full bg-[#F5F1E6] rounded-xl px-4 py-4 font-bold text-[#1A1A1A] text-center outline-none focus:ring-2 focus:ring-[#F0543C] transition-all placeholder:text-gray-400"
                        />
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-[#E86D44] text-white font-black uppercase tracking-widest py-4 rounded-xl shadow-[4px_4px_0px_#1A1A1A] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1A1A1A] active:translate-y-[0px] active:shadow-none transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <>ENTER THE STUDIO <ArrowRight size={18} /></>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
        
        <p className="absolute bottom-8 text-xs text-[#1A1A1A]/30 font-bold max-w-xs text-center">
            By entering, you accept our <a href="#" className="underline hover:text-[#F0543C]">Terms of Integrity</a>.
        </p>
    </div>
  );
};

// --- COMPONENT: GUIDED ONBOARDING TOUR ---
const OnboardingTour = ({ user, onClose }: { user: UserProfile; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [isExiting, setIsExiting] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleClose();
  };

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 500);
  };

  const steps = [
    {
      title: `Welcome, ${user.name.split(' ')[0] || 'Creator'}.`,
      desc: "Let's secure your voice. VOUCH is the first integrity engine designed to catch liabilities before the algorithm does.",
      icon: <ShieldCheck size={48} className="text-[#F0543C]" />,
      color: "border-[#F0543C]"
    },
    {
      title: "The Spectrum",
      desc: "Not all flags are fatal. We categorize risks from 'Blue' (Context Needed) to 'Red' (The Kill-Switch). You keep the receipts, you lose the risk.",
      icon: <Activity size={48} className="text-[#00E8FF]" />,
      color: "border-[#00E8FF]"
    },
    {
      title: "Studio Power",
      desc: "Drag, drop, and decide. Use the 'Nuke' feature to instantly cut liability segments, or 'Auto-Fix' to add disclaimers.",
      icon: <Zap size={48} className="text-[#FFCF36]" />,
      color: "border-[#FFCF36]"
    }
  ];

  const currentStepData = steps[step - 1];

  return (
    <div className={`fixed inset-0 z-[90] bg-[#1A1A1A]/90 backdrop-blur-md flex items-center justify-center transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
       <div className={`bg-white max-w-lg w-full rounded-[2.5rem] p-10 shadow-2xl relative border-4 ${currentStepData.color} transition-all duration-300 transform ${isExiting ? 'scale-95' : 'scale-100'}`}>
          
          <div className="flex gap-2 mb-8 justify-center">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-[#1A1A1A]' : 'w-2 bg-gray-200'}`} />
            ))}
          </div>

          <div className="flex flex-col items-center text-center space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500 key={step}">
             <div className="w-24 h-24 bg-[#1A1A1A] rounded-full flex items-center justify-center shadow-xl mb-2">
                {currentStepData.icon}
             </div>
             
             <h2 className="text-4xl font-black text-[#1A1A1A] leading-none tracking-tight">
               {currentStepData.title}
             </h2>
             
             <p className="text-lg font-bold text-gray-500 leading-relaxed">
               {currentStepData.desc}
             </p>
          </div>

          <div className="mt-10 flex gap-4">
             <button 
                onClick={handleClose}
                className="flex-1 py-4 rounded-xl font-bold text-gray-400 hover:bg-gray-50 transition-colors uppercase text-sm tracking-widest"
             >
               Skip Tour
             </button>
             <button 
                onClick={handleNext}
                className="flex-[2] bg-[#1A1A1A] text-white py-4 rounded-xl font-black uppercase text-sm tracking-widest shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.2)] active:translate-y-[0px] active:shadow-none transition-all flex items-center justify-center gap-2"
             >
               {step === 3 ? "Get Started" : "Next Step"} <ArrowRight size={16} />
             </button>
          </div>
       </div>
    </div>
  );
};

// --- MAIN APP ---

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activePage, setActivePageState] = useState<'home' | 'spectrum' | 'studio' | 'contact' | 'profile'>('home');

  const [user, setUser] = useState<UserProfile>({
    name: '',
    role: 'HCD / UI UX Design',
  });

  const [studioState, setStudioState] = useState<StudioState>({
    file: null,
    status: 'idle',
    progress: 0,
    flags: [],
    waveformBars: [],
    platform: 'YouTube', 
    showDownload: false,
    smartSummary: ''
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleLogin = (name: string) => {
      setUser(prev => ({ ...prev, name: name }));
      setIsAuthenticated(true);
      setShowOnboarding(true);
      window.scrollTo({ top: 0, behavior: "instant" });
  };

  const setActivePage = (page: 'home' | 'spectrum' | 'studio' | 'contact' | 'profile') => {
    setActivePageState(page);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const renderPage = () => {
    switch (activePage) {
        case 'home': return <Home setPage={setActivePage} />;
        case 'spectrum': return <Spectrum />;
        case 'studio': return <Studio studioState={studioState} setStudioState={setStudioState} />;
        case 'contact': return <Contact />;
        case 'profile': return <Profile setPage={setActivePage} user={user} setUser={setUser} />;
        default: return <Home setPage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E6] flex flex-col font-[Plus Jakarta Sans] overflow-x-hidden selection:bg-[#F0543C] selection:text-white cursor-none">
      <FocusCursor />
      
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      {!showSplash && !isAuthenticated && (
          <SignIn onLogin={handleLogin} />
      )}

      {!showSplash && isAuthenticated && (
        <>
            {showOnboarding && <OnboardingTour user={user} onClose={() => setShowOnboarding(false)} />}
            
            <div className={`animate-in fade-in duration-700 ${showOnboarding ? 'blur-md pointer-events-none' : ''}`}>
                <Navbar activePage={activePage} setPage={setActivePage} user={user} isAuthenticated={isAuthenticated} />
                <main className="flex-grow">
                    {renderPage()}
                </main>
                <Footer setPage={setActivePage} activePage={activePage} />
            </div>
        </>
      )}
    </div>
  );
}

export default App;