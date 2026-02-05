import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './views/Home';
import { Spectrum } from './views/Spectrum';
import { Studio } from './views/Studio';
import { Contact } from './views/Contact';
import { Profile } from './views/Profile';
import { Modal } from './components/Modal';
import { StudioState, UserProfile, ModalConfig } from './types';
import { ArrowRight, ShieldCheck, Zap, Activity, Fingerprint, Loader2 } from 'lucide-react';

// --- ASSET: GOOGLE LOGO ---
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// --- ASSET: APPLE LOGO ---
const AppleIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 384 512">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
  </svg>
);

// --- ASSET: FINGERPRINT BRAND LOGO ---
// Updated to EXACTLY match Navbar style: Black circle, white border, orange fingerprint
const FingerprintBrandLogo = ({ className }: { className?: string }) => (
  <div className={`bg-[#1A1A1A] rounded-full flex items-center justify-center border-4 md:border-[6px] border-white shadow-sm overflow-hidden z-20 relative ${className}`}>
    <Fingerprint className="w-[60%] h-[60%] text-[#E86D44]" strokeWidth={2.5} />
  </div>
);

// --- COMPONENT: SECURITY SHUTTER TRANSITION ---
const SecurityShutter = ({ status }: { status: 'idle' | 'lockdown' | 'release' }) => {
    // idle: Shutter is waiting at bottom (translate-y-full)
    // lockdown: Shutter moves UP to cover screen (translate-y-0)
    // release: Shutter moves UP to exit screen (-translate-y-full)
    
    // We disable transition when resetting from 'release' back to 'idle' to make it instant
    const isAnimating = status !== 'idle';
    
    let transformClass = 'translate-y-[100%]'; // Default Idle
    if (status === 'lockdown') transformClass = 'translate-y-0';
    if (status === 'release') transformClass = '-translate-y-[100%]';

    return (
        <div 
            className={`fixed inset-0 z-[100] bg-[#1A1A1A] flex flex-col items-center justify-center pointer-events-none will-change-transform ${transformClass}`}
            style={{ 
                transition: isAnimating ? 'transform 0.6s cubic-bezier(0.87, 0, 0.13, 1)' : 'none' 
            }}
        >
            <div className="flex flex-col items-center gap-6 animate-pulse">
                <div className="w-32 h-32 relative">
                    <FingerprintBrandLogo className="w-full h-full" />
                    {/* Scanning Ring */}
                    <div className="absolute inset-[-10px] border-2 border-[#E86D44] rounded-full animate-spin-slow opacity-50 border-t-transparent border-l-transparent"></div>
                </div>
                <div className="font-mono text-[#E86D44] font-bold tracking-[0.3em] text-sm uppercase">
                    Securing Sector...
                </div>
            </div>
        </div>
    );
};

// --- COMPONENT: BIOMETRIC UNLOCK SPLASH ---
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'success' | 'exiting'>('idle');

  useEffect(() => {
    // REMOVE STATIC SPLASH IF EXISTS
    const staticSplash = document.getElementById('fail-safe-splash');
    if (staticSplash) {
        staticSplash.style.transition = 'opacity 0.5s';
        staticSplash.style.opacity = '0';
        setTimeout(() => staticSplash.remove(), 500);
    }

    // Sequence Timing
    const scanTimer = setTimeout(() => setPhase('scanning'), 1000); // Start Scan after 1s
    const successTimer = setTimeout(() => setPhase('success'), 2800); // Scan finishes
    const exitTimer = setTimeout(() => setPhase('exiting'), 3500); // Trigger shockwave
    const completeTimer = setTimeout(onComplete, 4200); // Unmount

    return () => {
      clearTimeout(scanTimer);
      clearTimeout(successTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-[#1A1A1A] flex flex-col items-center justify-center overflow-hidden transition-all duration-300`}
    >
      {/* HEADER TEXT: VOUCHING... */}
      <div className={`absolute top-12 left-0 w-full text-center transition-opacity duration-300 z-50 ${phase === 'exiting' ? 'opacity-0' : 'opacity-100'}`}>
          <span className="font-mono text-[#E86D44] font-bold tracking-[0.5em] text-xs animate-pulse">
              VOUCHING...
          </span>
      </div>

      {/* BACKGROUND ELEMENTS */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#E86D44]/10 to-transparent opacity-0 transition-opacity duration-1000 ${phase !== 'idle' ? 'opacity-100' : ''}`}></div>
      
      {/* MAIN CONTAINER THAT WILL SHOCKWAVE */}
      <div className={`relative flex flex-col items-center justify-center transition-transform duration-[800ms] cubic-bezier(0.7, 0, 0.3, 1) ${phase === 'exiting' ? 'scale-[50] opacity-0' : 'scale-100'}`}>
          
          {/* LOGO WRAPPER */}
          <div className="relative w-40 h-40 md:w-56 md:h-56">
              
              {/* Pulse Glow (Idle) */}
              <div className={`absolute inset-0 bg-[#E86D44] rounded-full blur-2xl transition-all duration-1000 ${phase === 'idle' ? 'animate-pulse opacity-40 scale-110' : 'opacity-0 scale-100'}`}></div>
              
              {/* Success Burst (Success) */}
              <div className={`absolute inset-0 bg-white rounded-full blur-xl transition-all duration-300 ${phase === 'success' ? 'opacity-80 scale-125' : 'opacity-0 scale-100'}`}></div>

              {/* Central Logo */}
              <FingerprintBrandLogo className="w-full h-full" />

              {/* Scanning Overlay */}
              {phase === 'scanning' && (
                  <div className="absolute inset-0 z-30 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-[#E86D44]/50 border-b-4 border-[#E86D44] animate-scan drop-shadow-[0_0_10px_#E86D44]"></div>
                  </div>
              )}
          </div>

          {/* STATUS TEXT */}
          <div className="mt-12 h-8 flex flex-col items-center justify-center overflow-hidden">
             <div className="font-mono font-bold tracking-[0.2em] text-sm md:text-base transition-all duration-300">
                {phase === 'idle' && (
                   <span className="text-gray-500 animate-pulse">INITIALIZING SYSTEM...</span>
                )}
                {phase === 'scanning' && (
                   <span className="text-[#E86D44]">BIOMETRIC SYNC: <span className="inline-block w-8 text-left animate-pulse">Running...</span></span>
                )}
                {(phase === 'success' || phase === 'exiting') && (
                   <span className="text-white bg-[#7BC65C] text-[#1A1A1A] px-3 py-1 rounded-sm animate-in zoom-in duration-200">IDENTITY CONFIRMED</span>
                )}
             </div>
          </div>
      </div>

      {/* CSS FOR SCAN LINE */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
        .animate-scan {
          animation: scan 1.5s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
      `}</style>
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

  // Default login action
  const handleDefaultLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        onLogin(nameInput || "John Doe"); 
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E6] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Soft Background Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E86D44]/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-md animate-in slide-in-from-bottom-8 fade-in duration-700">
            <div className="bg-white rounded-[2.5rem] shadow-[16px_16px_0px_rgba(26,26,26,0.05)] border-4 border-white p-8 md:p-10 text-center">
                
                <div className="flex flex-col items-center mb-10">
                    <div className="w-24 h-24 mb-6 hover:scale-105 transition-transform duration-300">
                        <FingerprintBrandLogo className="w-full h-full drop-shadow-lg" />
                    </div>
                    <h1 className="text-5xl font-black text-[#1A1A1A] tracking-tighter">VOUCH</h1>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Integrity Engine v1.0.4</p>
                </div>

                <div className="space-y-4">
                    <button 
                        onClick={() => handleDefaultLogin()}
                        className="w-full bg-white hover:bg-gray-50 text-[#1A1A1A] font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-95 border-2 border-gray-200 hover:border-gray-300"
                    >
                        <GoogleIcon />
                        Continue with Google
                    </button>

                    <button 
                        onClick={() => handleDefaultLogin()}
                        className="w-full bg-black text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-95 border-2 border-black hover:bg-gray-900"
                    >
                        <AppleIcon />
                        Continue with Apple
                    </button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-400 font-bold tracking-widest">Or Enter Alias</span>
                        </div>
                    </div>

                    <form onSubmit={handleDefaultLogin} className="space-y-3">
                         <input 
                            type="text" 
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            placeholder="Creator Alias (Default: John Doe)" 
                            className="w-full bg-[#F5F1E6] rounded-xl px-4 py-4 font-bold text-[#1A1A1A] text-center outline-none focus:ring-2 focus:ring-[#E86D44] transition-all placeholder:text-gray-400"
                        />
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-[#E86D44] text-white font-black uppercase tracking-widest py-4 rounded-xl shadow-[4px_4px_0px_#1A1A1A] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1A1A1A] active:translate-y-[0px] active:shadow-none transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <>ACCESS STUDIO <ArrowRight size={18} /></>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
        
        <p className="absolute bottom-8 text-xs text-[#1A1A1A]/30 font-bold max-w-xs text-center">
            By entering, you accept our <a href="#" className="underline hover:text-[#E86D44]">Terms of Integrity</a>.
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
      icon: <ShieldCheck size={48} className="text-[#E86D44]" />,
      color: "border-[#E86D44]"
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
  // --- GLOBAL STATE STORE ---
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activePage, setActivePageState] = useState<'home' | 'spectrum' | 'studio' | 'contact' | 'profile'>('home');
  
  // PAGE TRANSITION STATE
  const [transitionStatus, setTransitionStatus] = useState<'idle' | 'lockdown' | 'release'>('idle');

  // Modal Global State
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
      isOpen: false,
      title: '',
      content: null,
      type: 'info'
  });

  const [user, setUser] = useState<UserProfile>({
    name: '',
    role: 'Creator',
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

  // --- TRANSITION LOGIC INTERCEPTOR ---
  const handlePageChange = (newPage: 'home' | 'spectrum' | 'studio' | 'contact' | 'profile') => {
      if (activePage === newPage || transitionStatus !== 'idle') return;

      // 1. TRIGGER LOCKDOWN (Slide Up)
      setTransitionStatus('lockdown');

      // 2. WAIT FOR COVER (600ms) THEN SWAP CONTENT
      setTimeout(() => {
          setActivePageState(newPage);
          window.scrollTo({ top: 0, behavior: "instant" });
          
          // 3. TRIGGER RELEASE (Slide Away Up)
          setTransitionStatus('release');

          // 4. RESET STATE AFTER ANIMATION (600ms + buffer)
          setTimeout(() => {
              setTransitionStatus('idle');
          }, 600);

      }, 600); 
  };

  // GLOBAL MODAL ACTIONS
  const openModal = (config: Omit<ModalConfig, 'isOpen'>) => {
      setModalConfig({ ...config, isOpen: true });
  };

  const closeModal = () => {
      setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  const renderPage = () => {
    switch (activePage) {
        case 'home': return <Home setPage={handlePageChange} />;
        case 'spectrum': return <Spectrum />;
        case 'studio': return <Studio studioState={studioState} setStudioState={setStudioState} />;
        case 'contact': return <Contact />;
        case 'profile': return <Profile setPage={handlePageChange} user={user} setUser={setUser} />;
        default: return <Home setPage={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E6] flex flex-col font-[Plus Jakarta Sans] overflow-x-hidden selection:bg-[#E86D44] selection:text-white cursor-none">
      <FocusCursor />
      
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      {!showSplash && !isAuthenticated && (
          <SignIn onLogin={handleLogin} />
      )}

      {/* SECURITY SHUTTER LAYER */}
      {!showSplash && isAuthenticated && (
          <SecurityShutter status={transitionStatus} />
      )}

      {!showSplash && isAuthenticated && (
        <>
            {showOnboarding && <OnboardingTour user={user} onClose={() => setShowOnboarding(false)} />}
            
            <Modal 
                isOpen={modalConfig.isOpen} 
                onClose={closeModal} 
                title={modalConfig.title} 
                type={modalConfig.type}
            >
                {modalConfig.content}
            </Modal>

            <div className={`transition-opacity duration-300 ${showOnboarding || modalConfig.isOpen ? 'blur-sm' : ''}`}>
                <Navbar activePage={activePage} setPage={handlePageChange} user={user} isAuthenticated={isAuthenticated} />
                <main className="flex-grow">
                    {renderPage()}
                </main>
                <Footer setPage={handlePageChange} activePage={activePage} openModal={openModal} />
            </div>
        </>
      )}
    </div>
  );
}

export default App;