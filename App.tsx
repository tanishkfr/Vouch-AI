import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './views/Home';
import { Spectrum } from './views/Spectrum';
import { Studio } from './views/Studio';
import { Contact } from './views/Contact';
import { Profile } from './views/Profile';
import { StudioState, UserProfile } from './types';
import { ArrowRight, ShieldCheck, Zap, Activity, Apple, Mail, Fingerprint } from 'lucide-react';

// --- COMPONENT: CINEMATIC SPLASH ---
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [fillState, setFillState] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const fillTimer = setTimeout(() => setFillState(true), 100);
    const exitTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 800);
    }, 2500);
    return () => { clearTimeout(fillTimer); clearTimeout(exitTimer); };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#1A1A1A] flex flex-col items-center justify-center transition-opacity duration-700 ease-out ${exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative text-center w-full overflow-hidden flex flex-col items-center">
        <h1 
          className="text-[15vw] md:text-[12rem] font-black tracking-tighter leading-none transition-all duration-300"
          style={{ 
            color: 'rgba(255,255,255,0.05)',
            WebkitTextStroke: '2px #E86D44',
            backgroundImage: 'linear-gradient(to top, #E86D44 50%, transparent 50%)',
            backgroundSize: '100% 200%',
            backgroundPosition: fillState ? '0% 100%' : '0% 0%',
            WebkitBackgroundClip: 'text',
            transition: 'background-position 2s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        >
          VOUCH
        </h1>
        <div className={`mt-12 transition-opacity duration-1000 delay-500 ${fillState ? 'opacity-100' : 'opacity-0'}`}>
             <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#E86D44] animate-pulse">
                Establishing Creator Integrity — 2026
             </p>
        </div>
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
            transition: 'width 0.2s ease-out, height 0.2s ease-out, border-color 0.2s, opacity 0.2s', 
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
            boxShadow: hoverState !== 'default' ? '0 0 15px 2px rgba(255,255,255,0.8)' : 'none'
        }}
      />
    </>
  );
};

// --- COMPONENT: SIGN-IN GATEWAY ---
const SignIn = ({ onLogin }: { onLogin: (name: string) => void }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock Auth Delay
    setTimeout(() => {
        onLogin("Tanishk"); // Defaulting to requested persona
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E6] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/40 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-md animate-in slide-in-from-bottom-8 fade-in duration-700">
            <div className="bg-white rounded-[2.5rem] shadow-[16px_16px_0px_rgba(26,26,26,0.05)] border-4 border-white p-8 md:p-12 text-center">
                
                <div className="w-16 h-16 bg-[#1A1A1A] rounded-2xl mx-auto mb-8 flex items-center justify-center text-[#F0543C] shadow-lg transform rotate-3">
                    <Fingerprint size={32} />
                </div>

                <h2 className="text-3xl font-black text-[#1A1A1A] mb-2 tracking-tight">Access The Studio</h2>
                <p className="text-gray-400 font-medium mb-8">Secure your voice before you speak.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <button type="button" className="w-full bg-[#F5F1E6] hover:bg-[#eae4d3] text-[#1A1A1A] font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors border-2 border-transparent hover:border-[#1A1A1A]/10">
                        <span className="text-xl">G</span> Continue with Google
                    </button>
                    <button type="button" className="w-full bg-[#1A1A1A] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg">
                        <Apple size={20} fill="white" /> Continue with Apple
                    </button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-400 font-bold tracking-widest">Or Magic Link</span>
                        </div>
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@creator.com" 
                            className="w-full pl-12 pr-4 py-4 bg-[#F5F1E6] rounded-xl font-bold text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#F0543C] transition-all placeholder:text-gray-400"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-[#E86D44] text-white font-black uppercase tracking-widest py-4 rounded-xl shadow-[4px_4px_0px_#1A1A1A] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1A1A1A] active:translate-y-[0px] active:shadow-none transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? 'Verifying...' : 'Enter Vouch'} <ArrowRight size={18} />
                    </button>
                </form>

                <p className="text-xs text-gray-400 font-bold mt-8">
                    By entering, you agree to our <a href="#" className="underline hover:text-[#F0543C]">Manifesto</a>.
                </p>
            </div>
        </div>
        
        <div className="absolute bottom-8 text-center text-[#1A1A1A]/20 font-black text-sm uppercase tracking-[0.5em]">
            Integrity Engine v1.0
        </div>
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
      title: `Welcome, ${user.name.split(' ')[0]}.`,
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

  // GLOBAL IDENTITY STATE
  const [user, setUser] = useState<UserProfile>({
    name: '', // Empty until login
    role: 'HCD / UI UX Design',
  });

  // PERSISTENT STUDIO STATE
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
      setUser(prev => ({ ...prev, name }));
      setIsAuthenticated(true);
      setShowOnboarding(true);
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
      
      {/* 1. SPLASH SCREEN */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      {/* 2. SIGN IN GATEWAY (Front Door) */}
      {!showSplash && !isAuthenticated && (
          <SignIn onLogin={handleLogin} />
      )}

      {/* 3. MAIN APP (Protected) */}
      {!showSplash && isAuthenticated && (
        <>
            {/* Onboarding Overlay */}
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