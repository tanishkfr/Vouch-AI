import React, { useState } from 'react';
import { Youtube, Music, CheckCircle, ShieldCheck, Activity, Award, Edit2, Save, Wifi } from 'lucide-react';
import { Waveform } from '../components/Waveform';
import { UserProfile } from '../types';
import { Button } from '../components/Button';

interface ProfileProps {
    setPage: (page: any) => void;
    user: UserProfile;
    setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const Profile: React.FC<ProfileProps> = ({ setPage, user, setUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [activeChannel, setActiveChannel] = useState<'YouTube' | 'Spotify' | null>(null);

    // Hardcoded Default for non-customized state
    const DEFAULT_INSTITUTE = 'Srishti Manipal Institute of Art, Design and Technology';

    // Mock data for the mini-waveform
    const waveformBars = Array.from({ length: 40 }, () => Math.floor(Math.random() * 60) + 20);
    const mockFlags = [
        {
            id: 'p1',
            timestamp: '12:04',
            seconds: 600,
            severity: 'yellow' as any,
            type: 'THE SPICY TAKE',
            transcript: '...',
            aiReason: 'Subjective Opinion',
            suggestedFix: 'Disclaimer'
        }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof UserProfile) => {
        // Live Update the global state
        setUser(prev => ({ ...prev, [field]: e.target.value }));
    };

    const toggleChannel = (channel: 'YouTube' | 'Spotify') => {
        if (activeChannel === channel) setActiveChannel(null);
        else setActiveChannel(channel);
    };

    return (
        <div className="w-full pt-32 pb-20 px-6 min-h-screen bg-[#F5F1E6]">
            <div className="max-w-7xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 fade-in duration-700">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4 flex-1">
                        <h1 className="text-6xl font-black text-[#1A1A1A] tracking-tighter">CREATOR HUB</h1>
                        <div className="h-1 flex-1 bg-[#1A1A1A]/5 rounded-full mx-4"></div>
                    </div>
                    <Button 
                        variant={isEditing ? "secondary" : "neutral"} 
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        icon={isEditing ? <Save size={16} /> : <Edit2 size={16} />}
                    >
                        {isEditing ? "Save Profile" : "Edit Profile"}
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Card 1: Identity & Channels */}
                    <div className={`bg-white rounded-[2.5rem] p-8 shadow-[8px_8px_0px_rgba(0,0,0,0.05)] border-4 ${isEditing ? 'border-[#F0543C] animate-pulse' : 'border-transparent'} transition-all duration-300 group relative animate-in slide-in-from-bottom-12 fade-in duration-700 delay-100`}>
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-24 h-24 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-105 transition-transform border-4 border-[#F5F1E6] relative overflow-hidden">
                                <span className="text-4xl font-black">{user.name.charAt(0)}</span>
                            </div>
                            <div className="flex-1">
                                {isEditing ? (
                                    <div className="space-y-4">
                                        <input 
                                            type="text" 
                                            value={user.name} 
                                            onChange={(e) => handleInputChange(e, 'name')}
                                            className="w-full bg-[#F5F1E6] border-b-2 border-[#1A1A1A] text-2xl font-black p-2 rounded outline-none focus:bg-white transition-colors"
                                            placeholder="Your Name"
                                            autoFocus
                                        />
                                        <input 
                                            type="text" 
                                            value={user.role} 
                                            onChange={(e) => handleInputChange(e, 'role')}
                                            className="w-full bg-[#F5F1E6] border-b-2 border-[#F0543C] text-xs font-bold uppercase tracking-widest p-2 rounded outline-none text-[#F0543C]"
                                            placeholder="Your Role / Institute"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-3xl font-black text-[#1A1A1A] leading-none mb-1">{user.name}</h2>
                                        <p className="text-[#F0543C] font-bold uppercase tracking-widest text-[10px] leading-tight mt-2 line-clamp-2">
                                            {user.role || DEFAULT_INSTITUTE}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            {/* Integrity Score Card */}
                            <div className="bg-[#1A1A1A] rounded-3xl p-6 text-white relative overflow-hidden group/score cursor-default hover:scale-[1.02] transition-transform duration-300">
                                <div className="absolute top-0 right-0 p-4 opacity-20">
                                    <ShieldCheck size={64} />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-xs font-black uppercase tracking-widest text-white/60 mb-1">Lifetime Integrity Score</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-6xl font-black text-[#7BC65C] tracking-tighter">96%</span>
                                    </div>
                                    <p className="text-xs font-bold mt-2 border-t border-white/10 pt-2 text-white/80">
                                        Based on 42 audited episodes.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/40">Channel Status</h3>
                                <div className="space-y-2">
                                    {/* YouTube Card */}
                                    <div 
                                        className={`bg-[#F5F1E6] rounded-2xl p-4 cursor-pointer transition-all duration-300 border-2 ${activeChannel === 'YouTube' ? 'border-[#FF0000] bg-white shadow-xl scale-105' : 'border-transparent hover:bg-white'}`}
                                        onClick={() => toggleChannel('YouTube')}
                                        data-cursor="hover"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#FF0000] rounded-xl flex items-center justify-center text-white relative">
                                                    <Youtube size={20} fill="currentColor" />
                                                    {activeChannel === 'YouTube' && <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-[#1A1A1A] text-sm">HCD Design Lab</span>
                                                    <span className="text-xs text-gray-500 font-medium">YouTube</span>
                                                </div>
                                            </div>
                                            <Wifi size={16} className={`text-gray-400 transition-colors ${activeChannel === 'YouTube' ? 'text-green-500' : ''}`} />
                                        </div>
                                        {activeChannel === 'YouTube' && (
                                            <div className="mt-4 pt-4 border-t border-gray-100 text-sm animate-in slide-in-from-top-2">
                                                <div className="bg-green-50 p-2 rounded-lg text-center mb-2">
                                                    <span className="text-green-700 font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2">
                                                        <CheckCircle size={12}/> Connection Active
                                                    </span>
                                                </div>
                                                <div className="flex justify-between font-bold text-[#1A1A1A] mb-1">
                                                    <span>Subscribers</span>
                                                    <span>12.4k</span>
                                                </div>
                                                <div className="flex justify-between text-gray-500 font-medium">
                                                    <span>Risk Profile</span>
                                                    <span className="text-[#7BC65C]">Low</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Spotify Card */}
                                    <div 
                                        className={`bg-[#F5F1E6] rounded-2xl p-4 cursor-pointer transition-all duration-300 border-2 ${activeChannel === 'Spotify' ? 'border-[#1DB954] bg-white shadow-xl scale-105' : 'border-transparent hover:bg-white'}`}
                                        onClick={() => toggleChannel('Spotify')}
                                        data-cursor="hover"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#1DB954] rounded-xl flex items-center justify-center text-white relative">
                                                    <Music size={20} fill="currentColor" />
                                                    {activeChannel === 'Spotify' && <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-[#1A1A1A] text-sm">Cinephile Deep-Dives</span>
                                                    <span className="text-xs text-gray-500 font-medium">Spotify</span>
                                                </div>
                                            </div>
                                            <Wifi size={16} className={`text-gray-400 transition-colors ${activeChannel === 'Spotify' ? 'text-green-500' : ''}`} />
                                        </div>
                                        {activeChannel === 'Spotify' && (
                                            <div className="mt-4 pt-4 border-t border-gray-100 text-sm animate-in slide-in-from-top-2">
                                                 <div className="bg-green-50 p-2 rounded-lg text-center mb-2">
                                                    <span className="text-green-700 font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2">
                                                        <CheckCircle size={12}/> Connection Active
                                                    </span>
                                                </div>
                                                 <div className="flex justify-between font-bold text-[#1A1A1A] mb-1">
                                                    <span>Monthly Listeners</span>
                                                    <span>8.2k</span>
                                                </div>
                                                <div className="flex justify-between text-gray-500 font-medium">
                                                    <span>Avg. Retention</span>
                                                    <span>68%</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Activity Stats */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-[8px_8px_0px_rgba(0,0,0,0.05)] border-4 border-transparent hover:border-[#1A1A1A] transition-all duration-300 flex flex-col justify-between group animate-in slide-in-from-bottom-12 fade-in duration-700 delay-200">
                         <div className="flex items-center gap-2 mb-6">
                            <Activity className="text-[#F0543C]" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-[#1A1A1A]">Performance</h3>
                         </div>

                         <div className="space-y-6">
                             <div className="relative overflow-hidden">
                                 <p className="text-7xl font-black text-[#1A1A1A] tracking-tighter mb-1 relative z-10">42</p>
                                 <p className="text-gray-400 font-bold text-lg uppercase tracking-wide">Episodes Audited</p>
                             </div>

                             <div className="w-full h-1 bg-gray-100 rounded-full"></div>

                             <div className="relative overflow-hidden">
                                 <p className="text-7xl font-black text-[#F0543C] tracking-tighter mb-1 relative z-10">182</p>
                                 <p className="text-gray-400 font-bold text-lg uppercase tracking-wide">Flags Resolved</p>
                             </div>

                             <div className="w-full h-1 bg-gray-100 rounded-full"></div>

                             <div className="relative overflow-hidden">
                                 <p className="text-7xl font-black text-[#7BC65C] tracking-tighter mb-1 relative z-10">0</p>
                                 <p className="text-gray-400 font-bold text-lg uppercase tracking-wide">Platform Strikes</p>
                             </div>
                         </div>
                    </div>

                    {/* Card 3: Recent Audit */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-[8px_8px_0px_rgba(0,0,0,0.05)] border-4 border-transparent hover:border-[#1A1A1A] transition-all duration-300 flex flex-col animate-in slide-in-from-bottom-12 fade-in duration-700 delay-300">
                        <div className="flex justify-between items-start mb-6">
                             <div>
                                <h3 className="text-2xl font-black text-[#1A1A1A]">Last Scan</h3>
                                <p className="text-gray-400 font-bold text-sm">Episode 42: "The AI Gap"</p>
                             </div>
                             <div className="bg-[#7BC65C]/20 text-[#7BC65C] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide flex items-center gap-1">
                                <ShieldCheck size={14} /> 98% Safe
                             </div>
                        </div>

                        <div className="flex-1 bg-[#1A1A1A] rounded-[1.5rem] p-6 relative overflow-hidden flex items-center shadow-inner group-hover:shadow-2xl transition-all">
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
                <div 
                    className="bg-[#1A1A1A] rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden group cursor-pointer shadow-[8px_8px_0px_rgba(0,0,0,0.2)] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.2)] hover:translate-y-[-2px] transition-all duration-300 animate-in slide-in-from-bottom-12 fade-in duration-700 delay-500"
                    data-cursor="hover"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F0543C] to-[#7BC65C] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    <Award className="w-16 h-16 mx-auto mb-6 text-[#F0543C]" />
                    <h2 className="text-4xl font-black tracking-tighter mb-4">Enterprise Shield Active</h2>
                    <p className="text-white/60 font-medium max-w-xl mx-auto text-lg">Your account is currently protected by the Enterprise Tier liability insurance up to $1M.</p>
                </div>

            </div>
        </div>
    );
};