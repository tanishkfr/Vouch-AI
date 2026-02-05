import React, { useState, useEffect, useRef } from 'react';
import { Platform, Flag, StudioState, Severity } from '../types';
import { Button } from '../components/Button';
import { Waveform } from '../components/Waveform';
import { FlagCard } from '../components/FlagCard';
import { Upload, CheckCircle, RefreshCw, Trash2, Settings, Loader2, ListPlus, Video, Mic, Eye, Check, AlertTriangle, Shield, Power, ToggleLeft, ToggleRight, LayoutTemplate, Type, QrCode, Info, FileText, Highlighter, X, Download, FileAudio, SearchCheck, RotateCcw, AlertOctagon } from 'lucide-react';

interface StudioProps {
    studioState: StudioState;
    setStudioState: React.Dispatch<React.SetStateAction<StudioState>>;
}

// 1. EXPANDED RISK ENGINE DATA POOL
const RISK_DATA: Record<Severity, { transcript: string; reason: string }[]> = {
    red: [
        { transcript: "We should just go out and [bleep] everyone who disagrees.", reason: "Incitement to violence detected." },
        { transcript: "The vaccine is actually made of microchips and poison.", reason: "Dangerous medical misinformation." },
        { transcript: "I hate [Group X], they are the root of all evil.", reason: "Hate speech pattern matching." },
        { transcript: "Go drink bleach, it cures everything instantly.", reason: "Self-harm encouragement." },
        { transcript: "That CEO is a pedophile, I have the files right here.", reason: "Defamation liability (High)." },
        { transcript: "Let's burn down the courthouse tonight.", reason: "Specific threat of violence." },
        { transcript: "Women shouldn't be allowed to [bleep].", reason: "Gender-based discrimination." },
        { transcript: "This stock is guaranteed to double by Friday, buy now!", reason: "Financial fraud / Pump & Dump." },
        { transcript: "I hope he dies in a fire, honestly.", reason: "Targeted harassment." },
        { transcript: "Just steal the credit card numbers, it's easy.", reason: "Promoting illegal acts." },
        { transcript: "[Bleep] the police, let's start a riot.", reason: "Incitement to civil unrest." },
        { transcript: "Hitler actually had some good ideas about [bleep].", reason: "Extremist ideology." },
        { transcript: "The election was rigged by lizard people.", reason: "Election integrity violation." },
        { transcript: "Send me $500 and I'll double it in an hour.", reason: "Scam / Phishing pattern." },
        { transcript: "If you see him, punch him in the throat.", reason: "Call to physical violence." },
        { transcript: "Cancer is a fungus you can cure with baking soda.", reason: "Life-threatening health misinfo." },
        { transcript: "The holocaust never happened, look at the data.", reason: "History denial / Hate speech." },
        { transcript: "All [Nationality] are thieves and liars.", reason: "Racist generalization." },
        { transcript: "Upload their home address to the forum.", reason: "Doxxing / Privacy violation." },
        { transcript: "You can make a bomb with household items like...", reason: "Dangerous instructional content." }
    ],
    orange: [
        { transcript: "You'll never believe what [Brand] puts in their food.", reason: "Potential trade libel." },
        { transcript: "This is financial advice: buy crypto now.", reason: "Regulated advice violation." },
        { transcript: "I'm going to release the private emails.", reason: "Privacy concern." },
        { transcript: "This product is absolute garbage, don't buy it.", reason: "Brand safety conflict." },
        { transcript: "Gambling is the only way to get rich quick.", reason: "Gambling promotion (Restricted)." },
        { transcript: "Cannabis is basically a vitamin, take it daily.", reason: "Controlled substance discussion." }
    ],
    yellow: [
        { transcript: "He's such an idiot.", reason: "Insult / toxicity." },
        { transcript: "This movie sucks.", reason: "Strong negative opinion." },
        { transcript: "The government is run by clowns.", reason: "Political satire." },
        { transcript: "Living in New York is like living in a trash can.", reason: "Geographic roast." },
        { transcript: "Android users are just confused people.", reason: "Tech tribalism." }
    ],
    blue: [
        { transcript: "9 out of 10 dentists recommend it.", reason: "Citation check needed." },
        { transcript: "It happened in 2020.", reason: "Fact check verification." },
        { transcript: "GDP grew by 4.5% last quarter.", reason: "Economic claim check." },
        { transcript: "Tesla stock is up 200% this year.", reason: "Market data verification." },
        { transcript: "Water boils at 100 degrees Celsius.", reason: "Scientific claim." }
    ]
};

// Internal Toast Component
const Toast = ({ message }: { message: string | null }) => {
    if (!message) return null;
    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest shadow-[0_8px_30px_rgba(0,0,0,0.3)] border-2 border-white flex items-center gap-3">
                <CheckCircle size={20} className="text-[#7BC65C]" />
                {message}
            </div>
        </div>
    );
};

export const Studio: React.FC<StudioProps> = ({ studioState, setStudioState }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);
    
    // Local state for export progress tracking
    const [processingExportId, setProcessingExportId] = useState<string | null>(null);
    const [readyExportId, setReadyExportId] = useState<string | null>(null);

    // Nuke All & Toast State
    const [isNuking, setIsNuking] = useState(false);
    const [nukeProgress, setNukeProgress] = useState(0);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Mock Scanning Logic
    const startScan = (file: File) => {
        // Reset flags and export state on new scan
        setStudioState(prev => ({ 
            ...prev, 
            status: 'analyzing', 
            file, 
            progress: 0,
            flags: [] 
        }));
        setReadyExportId(null);
        setProcessingExportId(null);
        setIsNuking(false);
        setNukeProgress(0);
        
        // Simulate progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            setStudioState(prev => ({ ...prev, progress }));
            if (progress >= 100) {
                clearInterval(interval);
                completeScan();
            }
        }, 40);
    };

    const completeScan = () => {
        // Generate NEW random flags for this specific scan
        const newFlags: Flag[] = [];
        const numFlags = Math.floor(Math.random() * 5) + 3; // 3 to 7 flags
        const usedHashes = new Set();
        
        for (let i = 0; i < numFlags; i++) {
            const severityRoll = Math.random();
            let severity: 'red' | 'orange' | 'yellow' | 'blue' = 'blue';
            if (severityRoll > 0.9) severity = 'red';
            else if (severityRoll > 0.7) severity = 'orange';
            else if (severityRoll > 0.4) severity = 'yellow';

            const pool = RISK_DATA[severity];
            const item = pool[Math.floor(Math.random() * pool.length)];

            // Avoid duplicates in same scan
            const hash = item.transcript;
            if (usedHashes.has(hash)) continue;
            usedHashes.add(hash);

            newFlags.push({
                id: Math.random().toString(36).substr(2, 9),
                timestamp: `${Math.floor(Math.random() * 59)}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`,
                seconds: Math.floor(Math.random() * 1800),
                severity,
                type: severity === 'red' ? 'THE KILL-SWITCH' : severity === 'orange' ? 'THE AD-RISK' : severity === 'yellow' ? 'THE SPICY TAKE' : 'THE RECEIPT',
                transcript: item.transcript,
                aiReason: item.reason,
                suggestedFix: severity === 'red' ? 'Cut Segment' : 'Add Disclaimer',
                status: 'active'
            });
        }

        // Generate waveform bars
        const bars = Array.from({ length: 80 }, () => Math.floor(Math.random() * 80) + 10);

        setStudioState(prev => ({
            ...prev,
            status: 'complete',
            flags: newFlags,
            waveformBars: bars,
            smartSummary: "Audit complete. Several liability risks detected."
        }));
    };

    const handleFileDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            startScan(e.dataTransfer.files[0]);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            startScan(e.target.files[0]);
        }
    };

    const handleNuke = (id: string) => {
        setStudioState(prev => ({
            ...prev,
            flags: prev.flags.filter(f => f.id !== id)
        }));
    };

    const handleFix = (id: string) => {
        // Set processing state first
        setStudioState(prev => ({
            ...prev,
            flags: prev.flags.map(f => f.id === id ? { ...f, status: 'processing' } : f)
        }));

        // Delay for simulation
        setTimeout(() => {
            setStudioState(prev => ({
                ...prev,
                flags: prev.flags.map(f => f.id === id ? { ...f, status: 'resolved' as const } : f)
            }));
            showToast("Integrity Restored. 🌶️");
        }, 1000);
    };

    const handleNukeAll = () => {
        setIsNuking(true);
        setNukeProgress(0);

        // Animate scrub progress over 1.5s
        const duration = 1500;
        const start = performance.now();

        const frame = (now: number) => {
            const elapsed = now - start;
            const p = Math.min(elapsed / duration, 1);
            setNukeProgress(p * 100);

            if (p < 1) {
                requestAnimationFrame(frame);
            } else {
                // Done
                setIsNuking(false);
                setStudioState(prev => ({
                    ...prev,
                    // Remove Red and Orange flags completely
                    flags: prev.flags.filter(f => f.severity !== 'red' && f.severity !== 'orange')
                }));
                showToast("Integrity Restored. 🌶️");
            }
        };
        requestAnimationFrame(frame);
    };

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const triggerExport = (id: string) => {
        // 2. DOWNLOAD STATE
        if(readyExportId === id) {
            const link = document.createElement("a");
            link.href = "#";
            link.download = `VOUCH_Report_${id}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Reset after download
            setReadyExportId(null);
            return;
        }

        // 1. PROCESSING STATE
        setProcessingExportId(id);
        setTimeout(() => {
            setProcessingExportId(null);
            setReadyExportId(id);
        }, 2000); // 2 second mock processing time
    };

    const handleResetExport = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setReadyExportId(null);
    };

    const themeColors: Record<Platform, string> = {
        YouTube: '#FF0000',
        Spotify: '#1DB954',
        General: '#1A1A1A' 
    };

    const highRiskCount = studioState.flags.filter(f => (f.severity === 'red' || f.severity === 'orange') && f.status !== 'resolved').length;

    return (
        <div className="w-full pt-32 pb-20 px-6 min-h-screen">
             <Toast message={toastMessage} />
             
             <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                             <div className="bg-[#F0543C] text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                                Studio Alpha
                             </div>
                             <div className="text-gray-400 font-bold text-sm">v1.0.4</div>
                        </div>
                        <h1 className="text-6xl font-black text-[#1A1A1A] tracking-tighter leading-none">
                            CONTENT <br/> AUDIT
                        </h1>
                    </div>
                    
                    {/* Platform Toggles */}
                    <div className="bg-white p-2 rounded-full shadow-lg border-2 border-black/5 flex gap-2">
                        {(['YouTube', 'Spotify', 'General'] as Platform[]).map(p => (
                            <button
                                key={p}
                                onClick={() => setStudioState(prev => ({ ...prev, platform: p }))}
                                className={`px-6 py-3 rounded-full font-black text-sm uppercase transition-all duration-300 ${
                                    studioState.platform === p 
                                    ? 'text-white shadow-md scale-105' 
                                    : 'text-gray-400 hover:text-[#1A1A1A]'
                                }`}
                                style={{ backgroundColor: studioState.platform === p ? themeColors[p] : 'transparent' }}
                                data-cursor="hover"
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    {studioState.status === 'complete' && (
                        <Button variant="neutral" icon={<RefreshCw size={18} />} onClick={() => setStudioState(prev => ({ ...prev, status: 'idle', flags: [] }))}>
                            New Scan
                        </Button>
                    )}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT COLUMN: Waveform & Upload */}
                    <div className="lg:col-span-2 space-y-8">
                        {studioState.status === 'idle' ? (
                            <div 
                                className={`border-4 border-dashed rounded-[2.5rem] h-96 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${dragActive ? 'border-[#F0543C] bg-[#F0543C]/5 scale-[0.99]' : 'border-gray-300 hover:border-gray-400 bg-white'}`}
                                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                                onDragLeave={() => setDragActive(false)}
                                onDrop={handleFileDrop}
                                onClick={() => fileInputRef.current?.click()}
                                data-cursor="hover"
                            >
                                <div className="w-24 h-24 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white mb-6 shadow-xl animate-bounce">
                                    <Upload size={40} />
                                </div>
                                <h3 className="text-2xl font-black text-[#1A1A1A] mb-2">Drop Audio Here</h3>
                                <p className="text-gray-500 font-bold mb-8">MP3, WAV, M4A up to 200MB</p>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    accept="audio/*" 
                                    onChange={handleFileInput} 
                                />
                                <Button variant="secondary">
                                    Select File
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                                <Waveform 
                                    isScanning={studioState.status === 'analyzing'} 
                                    scanComplete={studioState.status === 'complete'} 
                                    flags={studioState.flags} 
                                    themeColor={themeColors[studioState.platform]} 
                                    bars={studioState.waveformBars} 
                                    isNuking={isNuking}
                                    nukeProgress={nukeProgress}
                                />
                                
                                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-black/5 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#F5F1E6] rounded-xl flex items-center justify-center text-[#1A1A1A]">
                                            <FileAudio size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#1A1A1A] text-lg">{studioState.file?.name || "episode_final_v2.mp3"}</h3>
                                            <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                                                {studioState.status === 'analyzing' ? 'Processing...' : 'Ready for Export'}
                                            </p>
                                        </div>
                                    </div>
                                    {studioState.status === 'analyzing' && (
                                        <div className="flex items-center gap-2 text-[#F0543C] font-black">
                                            <Loader2 className="animate-spin" />
                                            {studioState.progress}%
                                        </div>
                                    )}
                                </div>

                                {/* EXPORT ACTIONS */}
                                {studioState.status === 'complete' && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-bottom-4">
                                        {[
                                            { id: 'clean', label: studioState.platform === 'YouTube' ? 'Clean Video Feed' : 'Clean Master Audio', icon: <Mic /> },
                                            { id: 'overlay', label: studioState.platform === 'YouTube' ? 'Burn-in Overlays' : 'Show Notes Transcript', icon: <Type /> },
                                            { id: 'meta', label: studioState.platform === 'YouTube' ? 'YouTube Metadata' : 'Ad-Marker Export', icon: <Info /> }
                                        ].map(opt => {
                                            const isProcessing = processingExportId === opt.id;
                                            const isReady = readyExportId === opt.id;
                                            return (
                                                <div key={opt.id} className="relative group/btn">
                                                    <button
                                                        onClick={() => triggerExport(opt.id)}
                                                        disabled={isProcessing}
                                                        data-cursor={isReady ? "hover" : "default"}
                                                        className={`
                                                            w-full h-24 rounded-2xl border-2 font-bold transition-all duration-300 flex flex-col items-center justify-center gap-2 overflow-hidden
                                                            ${isReady 
                                                                ? 'bg-[#7BC65C] border-[#7BC65C] text-[#1A1A1A] shadow-[0_0_20px_rgba(123,198,92,0.4)] scale-105 z-10' 
                                                                : isProcessing 
                                                                    ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white cursor-wait' 
                                                                    : 'bg-white border-transparent hover:border-[#1A1A1A] text-[#1A1A1A] hover:-translate-y-1 shadow-md'
                                                            }
                                                        `}
                                                    >
                                                        {isProcessing ? (
                                                            <>
                                                                <Loader2 className="animate-spin" />
                                                                <span className="text-xs uppercase tracking-widest">Processing...</span>
                                                            </>
                                                        ) : isReady ? (
                                                            <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center">
                                                                <Download className="animate-bounce" />
                                                                <span className="text-xs font-black uppercase tracking-widest mt-1">DOWNLOAD NOW</span>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                {opt.icon}
                                                                <span className="text-sm">{opt.label}</span>
                                                            </>
                                                        )}
                                                    </button>
                                                    
                                                    {isReady && (
                                                        <button 
                                                            onClick={(e) => handleResetExport(e, opt.id)}
                                                            className="absolute -top-3 -right-3 bg-white text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-full p-2 shadow-md hover:scale-110 transition-transform z-30"
                                                            data-cursor="hover"
                                                        >
                                                            <RotateCcw size={14} />
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Flags List */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#1A1A1A] rounded-[2.5rem] p-6 min-h-[600px] flex flex-col relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                             {/* Analysis Header with Nuke Button */}
                             <div className="flex flex-col gap-4 mb-8 relative z-10">
                                 <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-black text-white">Analysis Log</h3>
                                    <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-2">
                                        <AlertTriangle size={14} className="text-[#F0543C]" />
                                        {studioState.flags.filter(f => f.status !== 'resolved').length} Issues
                                    </div>
                                 </div>
                                 
                                 {/* NUKE ALL BUTTON */}
                                 {studioState.status === 'complete' && highRiskCount > 0 && (
                                     <button 
                                        onClick={handleNukeAll}
                                        disabled={isNuking}
                                        data-cursor="danger"
                                        className="w-full bg-[#F0543C] hover:bg-[#d63f28] text-white py-3 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-[4px_4px_0px_#000] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                     >
                                         {isNuking ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Scrubbing...
                                            </>
                                         ) : (
                                            <>
                                                <AlertOctagon size={16} />
                                                NUKE ALL RISKS
                                            </>
                                         )}
                                     </button>
                                 )}
                             </div>

                             <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar relative z-10">
                                {studioState.status === 'idle' && (
                                    <div className="text-center text-white/30 mt-20">
                                        <SearchCheck size={48} className="mx-auto mb-4 opacity-50" />
                                        <p className="font-bold">Waiting for audio...</p>
                                    </div>
                                )}
                                {studioState.status === 'analyzing' && (
                                     <div className="space-y-4">
                                         {[1, 2, 3].map(i => (
                                             <div key={i} className="bg-white/5 rounded-2xl p-4 animate-pulse">
                                                 <div className="h-4 bg-white/10 rounded w-1/4 mb-2"></div>
                                                 <div className="h-4 bg-white/10 rounded w-3/4"></div>
                                             </div>
                                         ))}
                                     </div>
                                )}
                                {studioState.status === 'complete' && studioState.flags.map(flag => (
                                    <FlagCard 
                                        key={flag.id} 
                                        flag={flag} 
                                        autoNukeEnabled={!isNuking} 
                                        onNuke={handleNuke} 
                                        onFix={handleFix} 
                                    />
                                ))}
                                {studioState.status === 'complete' && studioState.flags.length === 0 && (
                                    <div className="text-center text-white/50 mt-20 animate-in fade-in zoom-in">
                                        <CheckCircle size={48} className="mx-auto mb-4 text-[#7BC65C]" />
                                        <p className="font-bold text-white">No risks detected.</p>
                                        <p className="text-sm mt-2">You are safe to publish.</p>
                                    </div>
                                )}
                             </div>
                        </div>
                    </div>

                </div>
             </div>
        </div>
    );
};