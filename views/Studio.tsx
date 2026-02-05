import React, { useState, useEffect } from 'react';
import { Platform, Flag, StudioState } from '../types';
import { Button } from '../components/Button';
import { Waveform } from '../components/Waveform';
import { FlagCard } from '../components/FlagCard';
import { Upload, Sparkles, CheckCircle, Download, RefreshCw, Trash2, Settings, Loader2 } from 'lucide-react';

interface StudioProps {
    studioState: StudioState;
    setStudioState: React.Dispatch<React.SetStateAction<StudioState>>;
}

export const Studio: React.FC<StudioProps> = ({ studioState, setStudioState }) => {
  // Local state for UI interactions (Nuking confirmation doesn't need to persist if you navigate away)
  const [nukingState, setNukingState] = useState<'confirm' | 'processing' | 'done' | null>(null);
  const [flagToNuke, setFlagToNuke] = useState<string | null>(null);
  const [nukeProgress, setNukeProgress] = useState(0);

  // Destructure for ease
  const { file, status, progress, flags, waveformBars, platform, showDownload } = studioState;

  // Theme Colors
  const themeColors: Record<Platform, string> = {
    YouTube: '#FF0000',
    Spotify: '#1DB954',
    General: '#1A1A1A'
  };

  const updateState = (updates: Partial<StudioState>) => {
      setStudioState(prev => ({ ...prev, ...updates }));
  };

  const generateRandomFlags = () => {
    const types = [
        { severity: 'red', type: 'The Nuke Zone', reason: 'Hate speech detected.' },
        { severity: 'orange', type: 'Advertiser Risk', reason: 'Excessive conflict.' },
        { severity: 'yellow', type: 'Hot Take', reason: 'Subjective opinion.' },
        { severity: 'blue', type: 'Citation Needed', reason: 'Unverified stat.' }
    ];

    const numFlags = Math.floor(Math.random() * 4) + 2; 
    const newFlags: Flag[] = [];

    for (let i = 0; i < numFlags; i++) {
        const randomType = types[Math.floor(Math.random() * types.length)];
        const randomSec = Math.floor(Math.random() * 1600) + 100;
        const mins = Math.floor(randomSec / 60);
        const secs = randomSec % 60;
        
        newFlags.push({
            id: Math.random().toString(36).substr(2, 9),
            timestamp: `${mins}:${secs.toString().padStart(2, '0')}`,
            seconds: randomSec,
            severity: randomType.severity as any,
            type: randomType.type,
            transcript: "Generated content segment for simulation...",
            aiReason: randomType.reason,
            suggestedFix: randomType.severity === 'red' ? 'Nuke Segment' : 'Review',
            status: 'active'
        });
    }
    return newFlags.sort((a, b) => a.seconds - b.seconds);
  };

  const startSimulation = () => {
    let mockFile = file;
    if (!mockFile) {
        mockFile = new File(["foo"], "audio_file.mp3", { type: "audio/mpeg" });
    }
    
    updateState({
        file: mockFile,
        waveformBars: Array.from({ length: 80 }, () => Math.floor(Math.random() * 60) + 20),
        status: 'analyzing',
        progress: 0,
        flags: [],
        showDownload: false
    });
  };

  const handleAutoFix = (id: string) => {
      // Optimistic update to processing
      const processingFlags = flags.map(f => f.id === id ? { ...f, status: 'processing' } as Flag : f);
      updateState({ flags: processingFlags });

      // Simulate 2s delay
      setTimeout(() => {
        const resolvedFlags = studioState.flags.map(f => f.id === id ? { ...f, status: 'resolved' } as Flag : f);
        setStudioState(prev => ({ ...prev, flags: resolvedFlags, showDownload: true }));
      }, 2000);
  };

  // Scanning Effect
  useEffect(() => {
    if (status === 'analyzing') {
      const interval = setInterval(() => {
        setStudioState(prev => {
          if (prev.progress >= 100) {
            clearInterval(interval);
            return { 
                ...prev, 
                status: 'complete', 
                progress: 100,
                flags: generateRandomFlags()
            };
          }
          return { ...prev, progress: prev.progress + 2 }; 
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [status, setStudioState]);

  // Nuke Effect
  useEffect(() => {
    if (nukingState === 'processing') {
      setNukeProgress(0);
      const interval = setInterval(() => {
        setNukeProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setNukingState('done');
            
            // Actually remove the flag
            if (flagToNuke) {
                setStudioState(current => ({
                    ...current,
                    flags: current.flags.filter(f => f.id !== flagToNuke),
                    showDownload: true
                }));
            }
            return 100;
          }
          return prev + 1;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [nukingState, flagToNuke, setStudioState]);

  const reset = () => {
    setStudioState({
        file: null,
        status: 'idle',
        progress: 0,
        flags: [],
        waveformBars: [],
        platform: platform, // keep platform preference
        showDownload: false
    });
    setNukingState(null);
  };

  return (
    <div className="w-full min-h-screen pt-32 pb-32 px-6 bg-[#F5F1E6] relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Panel: Upload & Engine */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white px-8 py-6 rounded-[2.5rem] shadow-sm transition-all duration-500 border-l-[12px]" style={{ borderLeftColor: themeColors[platform] }}>
            <h2 className="text-6xl font-black tracking-tighter flex items-center gap-3 transition-colors duration-500 uppercase" style={{ color: themeColors[platform] }}>
                Studio
            </h2>
            
            <div className="flex bg-[#F5F1E6] p-2 rounded-full shadow-inner">
               {(['YouTube', 'Spotify', 'General'] as Platform[]).map(p => (
                 <button
                   key={p}
                   onClick={() => updateState({ platform: p })}
                   className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                     platform === p ? 'shadow-xl text-white scale-105' : 'text-gray-400 hover:text-[#1A1A1A]'
                   }`}
                   style={{ backgroundColor: platform === p ? themeColors[p] : 'transparent' }}
                   disabled={status !== 'idle' && status !== 'complete'}
                 >
                   {p}
                 </button>
               ))}
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl min-h-[600px] flex flex-col relative overflow-hidden transition-all duration-500 border-4 border-white">
            
            <div className="flex-1 flex flex-col justify-center">
              
              {status === 'idle' && (
                <div 
                  className="flex-1 border-4 border-dashed border-[#E5E0D6] rounded-[2rem] flex flex-col items-center justify-center text-center p-12 hover:border-[#1A1A1A] hover:bg-gray-50 transition-all cursor-pointer group gap-6"
                  onClick={() => !file && document.getElementById('file-upload')?.click()}
                >
                  <input id="file-upload" type="file" className="hidden" onChange={(e) => {
                    if (e.target.files) updateState({ file: e.target.files[0] });
                  }} />
                  
                  {!file ? (
                      <>
                        <div className="w-32 h-32 bg-[#F5F1E6] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner text-[#1A1A1A]">
                            <Upload size={48} className="opacity-50" />
                        </div>
                        <div>
                            <h3 className="text-4xl font-black text-[#1A1A1A] mb-3">Initialize Engine</h3>
                            <p className="text-gray-400 font-bold text-lg">Drop Audio File</p>
                        </div>
                      </>
                  ) : (
                      <div className="space-y-8 animate-in zoom-in-95 duration-300">
                          <div className="w-28 h-28 text-white rounded-full mx-auto flex items-center justify-center shadow-2xl transition-colors duration-500" style={{ backgroundColor: themeColors[platform] }}>
                             <Sparkles size={48} />
                          </div>
                          <div>
                            <h3 className="text-3xl font-black text-[#1A1A1A]">{file.name}</h3>
                            <p className="text-gray-400 font-bold mt-2">Target: {platform} Algorithm</p>
                          </div>
                          <Button 
                            size="lg" 
                            variant="primary" 
                            onClick={startSimulation} 
                            className="w-full max-w-xs mx-auto text-xl py-6"
                            style={{ backgroundColor: themeColors[platform] }}
                          >
                             Simulate Upload
                          </Button>
                      </div>
                  )}
                </div>
              )}

              {status === 'analyzing' && (
                 <div className="w-full max-w-2xl mx-auto text-center space-y-8">
                    <h3 className="text-4xl font-black text-[#1A1A1A] animate-pulse">Running Neural Scan...</h3>
                    <div className="w-full h-16 bg-[#F5F1E6] rounded-full overflow-hidden relative shadow-inner ring-4 ring-[#F5F1E6]">
                       <div 
                         className="h-full rounded-full transition-all duration-75 ease-linear flex items-center justify-end pr-6 shadow-[0_0_30px_rgba(0,0,0,0.2)]"
                         style={{ width: `${progress}%`, backgroundColor: themeColors[platform] }}
                       >
                         <span className="text-xl font-black text-white/90 tracking-tighter">{Math.round(progress)}%</span>
                       </div>
                    </div>
                 </div>
              )}

              {status === 'complete' && (
                <div className="space-y-8 animate-in fade-in duration-700">
                  <div className="flex justify-between items-end px-4">
                     <h3 className="text-2xl font-black text-[#1A1A1A] flex items-center gap-3">
                        <CheckCircle className="w-8 h-8" style={{ color: themeColors.Spotify }} />
                        Audit Complete
                     </h3>
                  </div>

                  <Waveform 
                    isScanning={false} 
                    scanComplete={true} 
                    flags={flags}
                    themeColor={themeColors[platform]}
                    bars={waveformBars}
                  />
                  
                  <div className="flex justify-between items-center px-6">
                    <span className="font-mono text-sm font-bold text-gray-400">00:00</span>
                    <Button size="sm" variant="neutral" onClick={reset} icon={<RefreshCw size={16}/>}>New Scan</Button>
                    <span className="font-mono text-sm font-bold text-gray-400">30:00</span>
                  </div>

                  {showDownload && (
                      <div className="bg-[#1A1A1A] rounded-[2rem] p-8 mt-8 border-2 border-transparent hover:border-white/20 animate-in slide-in-from-bottom-8 shadow-2xl flex flex-col md:flex-row gap-6 items-center justify-between text-white">
                             <div className="text-center md:text-left">
                                <h4 className="text-2xl font-black text-[#7BC65C] mb-1">CLEANED AUDIO READY</h4>
                                <p className="text-white/70 font-bold">Risk factors removed. Safe to publish.</p>
                             </div>
                             <Button size="lg" variant="secondary" icon={<Download />}>DOWNLOAD CLEANED AUDIO</Button>
                      </div>
                  )}

                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Flag Feed */}
        <div className="lg:col-span-4 flex flex-col h-full">
           <div className="bg-[#1A1A1A] text-white p-8 rounded-t-[2.5rem] flex items-center justify-between shadow-xl z-10 relative">
             <h3 className="text-2xl font-black tracking-tight">Risk Feed</h3>
             <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-bold">{flags.filter(f => f.status !== 'resolved').length} Issues</span>
           </div>
           
           <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-b-[2.5rem] p-6 space-y-4 min-h-[400px] border border-white shadow-lg -mt-4 pt-10 overflow-y-auto max-h-[800px]">
             {status === 'idle' && (
               <div className="h-full flex flex-col items-center justify-center text-gray-400/30 font-bold text-xl italic space-y-4">
                 <Settings size={40} />
                 <p>Engine Idle</p>
               </div>
             )}

             {flags.map((flag) => (
               <FlagCard 
                 key={flag.id} 
                 flag={flag} 
                 autoNukeEnabled={false}
                 onNuke={() => { setFlagToNuke(flag.id); setNukingState('confirm'); }}
                 onFix={() => handleAutoFix(flag.id)}
               />
             ))}
             
             {status === 'complete' && flags.every(f => f.status === 'resolved') && (
                <div className="h-full flex flex-col items-center justify-center text-[#7BC65C] space-y-4 animate-in zoom-in">
                    <CheckCircle size={64} />
                    <h4 className="text-2xl font-black">All Clear!</h4>
                </div>
             )}
           </div>
        </div>
      </div>

      {/* NUKE MODAL */}
      {nukingState && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F0543C]/90 backdrop-blur-lg px-6 animate-in fade-in duration-300">
             <div className="bg-white rounded-[3rem] p-12 max-w-lg w-full shadow-2xl relative text-[#1A1A1A]">
                
                {nukingState === 'confirm' && (
                    <div className="text-center space-y-8 animate-in zoom-in-95">
                        <div className="w-32 h-32 bg-[#F0543C] text-white rounded-full mx-auto flex items-center justify-center mb-6 shadow-xl">
                            <Trash2 size={64} />
                        </div>
                        <h3 className="text-5xl font-black uppercase text-[#1A1A1A] leading-none">Initiate <br/>Removal?</h3>
                        <p className="text-gray-500 text-xl font-bold">Permanently scrubbing segment.</p>
                        <div className="flex gap-4 pt-4">
                            <Button variant="neutral" className="flex-1" onClick={() => setNukingState(null)}>Cancel</Button>
                            <Button variant="danger" className="flex-1" onClick={() => setNukingState('processing')}>CONFIRM</Button>
                        </div>
                    </div>
                )}

                {nukingState === 'processing' && (
                    <div className="text-center space-y-8 animate-in zoom-in-95">
                         <h3 className="text-4xl font-black uppercase">Scrubbing...</h3>
                         <div className="w-full h-12 bg-[#F5F1E6] rounded-full overflow-hidden border-4 border-[#1A1A1A]">
                            <div 
                                className="h-full bg-[#1A1A1A] transition-all duration-75 ease-linear"
                                style={{ width: `${nukeProgress}%` }}
                            ></div>
                         </div>
                    </div>
                )}

                {nukingState === 'done' && (
                     <div className="text-center space-y-6 animate-in zoom-in-95">
                        <div className="w-24 h-24 bg-[#7BC65C] text-white rounded-full mx-auto flex items-center justify-center mb-4 shadow-xl">
                            <CheckCircle size={48} />
                        </div>
                        <h3 className="text-4xl font-black">Done.</h3>
                        <Button variant="primary" className="w-full" onClick={() => setNukingState(null)}>Return</Button>
                    </div>
                )}

             </div>
          </div>
      )}

    </div>
  );
};