import React from 'react';
import { Youtube, Music, CheckCircle, ShieldCheck, Activity, Award, GraduationCap } from 'lucide-react';
import { Waveform } from '../components/Waveform';

export const Profile: React.FC<{ setPage: (page: any) => void }> = ({ setPage }) => {
    // Mock data for the mini-waveform
    const waveformBars = Array.from({ length: 40 }, () => Math.floor(Math.random() * 60) + 20);
    const mockFlags = [
        {
            id: 'p1',
            timestamp: '12:04',
            seconds: 600,
            severity: 'yellow' as any,
            type: 'Hot Take',
            transcript: '...',
            aiReason: 'Subjective Opinion',
            suggestedFix: 'Disclaimer'
        }
    ];

    return (
        <div className="w-full pt-32 pb-20 px-6 min-h-screen bg-[#F5F1E6]">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <h1 className="text-6xl font-black text-[#1A1A1A] tracking-tighter">CREATOR HUB</h1>
                    <div className="h-1 flex-1 bg-[#1A1A1A]/5 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Card 1: Identity */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-transparent hover:border-[#1A1A1A] transition-all duration-300 group">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-24 h-24 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-105 transition-transform border-4 border-[#F5F1E6]">
                                <span className="text-4xl font-black">T</span>
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-[#1A1A1A] leading-none mb-1">Tanishk</h2>
                                <p className="text-[#F0543C] font-bold uppercase tracking-widest text-xs mt-2">HCD / UI UX Design</p>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-[#F5F1E6] rounded-3xl p-6">
                                <div className="flex items-start gap-3">
                                    <GraduationCap className="text-[#1A1A1A] shrink-0 mt-1" size={24} />
                                    <div>
                                        <h4 className="font-bold text-[#1A1A1A] text-lg leading-tight">Srishti Manipal Institute</h4>
                                        <p className="text-gray-500 text-sm font-bold mt-1">Art, Design & Technology</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/40">Active Channels</h3>
                                <div className="flex gap-2">
                                    <div className="w-10 h-10 bg-[#FF0000] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer">
                                        <Youtube size={20} fill="currentColor" />
                                    </div>
                                    <div className="w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer">
                                        <Music size={20} fill="currentColor" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Activity Stats */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-transparent hover:border-[#1A1A1A] transition-all duration-300 flex flex-col justify-between">
                         <div className="flex items-center gap-2 mb-6">
                            <Activity className="text-[#F0543C]" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-[#1A1A1A]">Performance</h3>
                         </div>

                         <div className="space-y-6">
                             <div className="relative overflow-hidden group/stat">
                                 <p className="text-7xl font-black text-[#1A1A1A] tracking-tighter mb-1 relative z-10">42</p>
                                 <p className="text-gray-400 font-bold text-lg uppercase tracking-wide">Episodes Audited</p>
                                 <div className="absolute top-0 right-0 w-16 h-16 bg-[#F0543C]/10 rounded-full blur-xl group-hover/stat:bg-[#F0543C]/20 transition-colors"></div>
                             </div>

                             <div className="w-full h-px bg-gray-100"></div>

                             <div className="relative overflow-hidden group/stat">
                                 <p className="text-7xl font-black text-[#F0543C] tracking-tighter mb-1 relative z-10">182</p>
                                 <p className="text-gray-400 font-bold text-lg uppercase tracking-wide">Flags Resolved</p>
                             </div>

                             <div className="w-full h-px bg-gray-100"></div>

                             <div className="relative overflow-hidden group/stat">
                                 <p className="text-7xl font-black text-[#7BC65C] tracking-tighter mb-1 relative z-10">0</p>
                                 <p className="text-gray-400 font-bold text-lg uppercase tracking-wide">Platform Strikes</p>
                             </div>
                         </div>
                    </div>

                    {/* Card 3: Recent Audit */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-transparent hover:border-[#1A1A1A] transition-all duration-300 flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                             <div>
                                <h3 className="text-2xl font-black text-[#1A1A1A]">Last Scan</h3>
                                <p className="text-gray-400 font-bold text-sm">Episode 42: "The AI Gap"</p>
                             </div>
                             <div className="bg-[#7BC65C]/20 text-[#7BC65C] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide flex items-center gap-1">
                                <ShieldCheck size={14} /> 98% Safe
                             </div>
                        </div>

                        <div className="flex-1 bg-[#1A1A1A] rounded-[1.5rem] p-6 relative overflow-hidden flex items-center shadow-inner">
                            <div className="absolute inset-0 opacity-50 pointer-events-none">
                                <Waveform 
                                    isScanning={false} 
                                    scanComplete={true} 
                                    flags={mockFlags} 
                                    themeColor="#7BC65C" 
                                    bars={waveformBars} 
                                />
                            </div>
                            <div className="relative z-10 text-center w-full">
                                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-3 text-white">
                                    <CheckCircle size={32} />
                                </div>
                                <p className="text-white font-bold text-sm">Audit Cleared</p>
                                <p className="text-white/50 text-xs mt-1">Ready for Upload</p>
                            </div>
                        </div>
                        
                        <div className="mt-6 flex justify-between items-center text-sm font-bold text-gray-400">
                             <span>Processed 2h ago</span>
                             <span className="text-[#F0543C] cursor-pointer hover:underline" onClick={() => setPage('studio')}>View Report</span>
                        </div>
                    </div>

                </div>

                {/* Banner */}
                <div className="bg-[#1A1A1A] rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F0543C] to-[#7BC65C] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    <Award className="w-16 h-16 mx-auto mb-6 text-[#F0543C]" />
                    <h2 className="text-4xl font-black tracking-tighter mb-4">Enterprise Shield Active</h2>
                    <p className="text-white/60 font-medium max-w-xl mx-auto text-lg">Your account is currently protected by the Enterprise Tier liability insurance up to $1M.</p>
                </div>

            </div>
        </div>
    );
};