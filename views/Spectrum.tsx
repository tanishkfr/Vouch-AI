import React from 'react';
import { FileCheck, Brain, Globe, ShieldAlert, CheckCircle2, Cpu, HelpCircle } from 'lucide-react';

const DeepDiveCard: React.FC<{
    color: string;
    bg: string;
    accent: string;
    title: string;
    icon: React.ReactNode;
    desc: string;
    why: string;
    logic: string;
    checklist: string[];
}> = ({ bg, accent, title, icon, desc, why, logic, checklist }) => (
    <div className={`rounded-[2.5rem] p-8 border-4 border-[#1A1A1A]/5 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden flex flex-col h-full`}>
        {/* Accent Bar */}
        <div className={`absolute top-0 left-0 w-full h-3 ${accent}`}></div>

        <div className="flex items-start justify-between mb-8">
            <div className={`w-20 h-20 rounded-2xl ${bg} flex items-center justify-center text-[#1A1A1A] shadow-inner`}>
                {icon}
            </div>
            <div className={`px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest ${bg} text-[#1A1A1A]`}>
                Level {title.includes('KILL') ? '4' : title.includes('AD') ? '3' : title.includes('SPICY') ? '2' : '1'} Impact
            </div>
        </div>

        {/* Updated Tracking to prevent space collapse */}
        <h3 className="text-4xl font-black text-[#1A1A1A] mb-2 uppercase tracking-tight leading-none">{title}</h3>
        <p className="text-xl font-bold text-gray-500 mb-6 leading-tight">{desc}</p>

        {/* Why We Flag It */}
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
                <HelpCircle size={16} className="text-[#1A1A1A]" />
                <span className="font-black text-xs uppercase tracking-widest text-[#1A1A1A]">Why We Flag It</span>
            </div>
            <p className="text-sm font-bold text-[#F0543C] italic leading-relaxed">
                "{why}"
            </p>
        </div>

        {/* The Brain Section */}
        <div className="bg-[#F5F1E6] rounded-2xl p-6 mb-8 border-l-4 border-[#1A1A1A]">
            <div className="flex items-center gap-2 mb-3">
                <Brain size={18} className="text-[#1A1A1A]" />
                <span className="font-black text-xs uppercase tracking-widest text-[#1A1A1A]">How The AI Thinks</span>
            </div>
            <p className="text-sm font-bold text-[#1A1A1A]/80 leading-relaxed">
                {logic}
            </p>
        </div>

        {/* Live Parameters */}
        <div className="mt-auto">
             <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-dashed border-gray-200">
                <Cpu size={18} className="text-gray-400" />
                <span className="font-black text-xs uppercase tracking-widest text-gray-400">Live Parameter Checklist</span>
            </div>
            <div className="space-y-3">
                {checklist.map((item, i) => (
                    <div key={i} className="flex items-center justify-between group/item">
                        <span className="font-bold text-sm text-[#1A1A1A]">{item}</span>
                        <div className="flex items-center gap-2">
                             <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                                 <div className={`h-full ${accent} w-[80%] animate-pulse`}></div>
                             </div>
                             <CheckCircle2 size={14} className="text-gray-300 group-hover/item:text-[#7BC65C]" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const Spectrum: React.FC = () => {
    return (
        <div className="w-full pt-32 pb-0 bg-[#F5F1E6]">
             {/* Hero Section: Sunset Terracotta - REMOVED SHADOWS */}
             <div className="w-full bg-[#E86D44] min-h-[60vh] flex flex-col items-center justify-center text-center p-8 relative overflow-hidden border-b-4 border-[#1A1A1A] rounded-b-[4rem]">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(#1A1A1A 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
                </div>
                
                <div className="max-w-5xl mx-auto z-10 space-y-8">
                     <div className="inline-block bg-[#1A1A1A] text-white px-6 py-2 rounded-full font-black uppercase tracking-widest text-sm animate-in slide-in-from-top-4">
                        The Methodology
                     </div>
                     <h1 className="text-7xl md:text-[9rem] font-black text-[#1A1A1A] leading-[0.9] tracking-tighter">
                        THE <br/> <span className="text-white">SPECTRUM.</span>
                     </h1>
                     <p className="text-2xl font-bold text-[#1A1A1A]/80 max-w-2xl mx-auto leading-tight">
                        We categorize content into four levels of "Impact" so you can keep the receipts and lose the risk.
                     </p>
                </div>
            </div>

            {/* Deep Dive Grid */}
            <div className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        
                        {/* BLUE: THE RECEIPT */}
                        <DeepDiveCard 
                            color="blue"
                            bg="bg-[#3B82F6]/20"
                            accent="bg-[#3B82F6]"
                            title="THE RECEIPT"
                            icon={<FileCheck size={40} className="text-[#3B82F6]" />}
                            desc="Ensures your claims are backed by data, not just vibes."
                            why="Evidence is everything. We make sure you have it before the comments section asks for it."
                            logic="Cross-references statistical claims against 100+ global verified datasets (WHO, Census, academic repositories) in real-time to detect hallucinated facts."
                            checklist={['Source Attribution', 'Statistical Accuracy', 'Timestamp Verification', 'Quote Origin Check']}
                        />

                        {/* YELLOW: THE SPICY TAKE */}
                        <DeepDiveCard 
                            color="yellow"
                            bg="bg-[#FACC15]/20"
                            accent="bg-[#FACC15]"
                            title="THE SPICY TAKE"
                            icon={<Brain size={40} className="text-[#eab308]" />}
                            desc="Distinguishes between dangerous misinformation and satire."
                            why="We help you keep your edge while keeping the lawyers away. Opinion is allowed; defamation is not."
                            logic="Decodes sarcasm, hyperbolic speech, and comedic timing using linguistic pattern matching to prevent the 'false-positive' flags common in rigid filters."
                            checklist={['Sentiment Intensity', 'Sarcasm Detection', 'Subjective Opinion Marker', 'Contextual Irony']}
                        />

                        {/* ORANGE: THE AD-RISK */}
                        <DeepDiveCard 
                            color="orange"
                            bg="bg-[#FB923C]/20"
                            accent="bg-[#FB923C]"
                            title="THE AD-RISK"
                            icon={<Globe size={40} className="text-[#FB923C]" />}
                            desc="Keeps your content monetizable and advertiser-friendly."
                            why="Don't let a bad keyword kill your CPM. We flag the words that brands hate."
                            logic="Maintains a real-time sync with platform TOS APIs (YouTube, Spotify) to identify keywords that trigger immediate demonetization or limited reach."
                            checklist={['Ad-Sense Compliance', 'FTC Disclosure Sync', 'Brand Safety Score', 'Profanity Threshold']}
                        />

                        {/* RED: THE KILL-SWITCH */}
                        <DeepDiveCard 
                            color="red"
                            bg="bg-[#F0543C]/20"
                            accent="bg-[#F0543C]"
                            title="THE KILL-SWITCH"
                            icon={<ShieldAlert size={40} className="text-[#F0543C]" />}
                            desc="The fail-safe against account termination and legal action."
                            why="This is the stuff that gets channels deleted overnight. We catch it so you don't have to."
                            logic="Identifies critical liabilities including defamation, hate speech patterns, and dangerous medical misinformation with 99.8% accuracy before upload."
                            checklist={['Hate Speech Pattern', 'Medical Misinfo', 'Defamation Liability', 'Incitement to Violence']}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};