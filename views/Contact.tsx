import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Send, Check, ArrowDown } from 'lucide-react';

export const Contact: React.FC = () => {
    const [formState, setFormState] = useState({
        name: '',
        url: '',
        platform: 'YouTube',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    return (
        <div className="w-full pt-32 pb-20 px-6 min-h-screen bg-[#F5F1E6] flex items-center">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                
                {/* Left Column: Typography */}
                <div className="lg:sticky lg:top-32 space-y-8">
                    <div className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest animate-in slide-in-from-left-4 fade-in">
                        <span className="w-2 h-2 bg-[#F0543C] rounded-full animate-pulse"></span>
                        Direct Line
                    </div>

                    <h1 className="text-7xl md:text-9xl font-black text-[#1A1A1A] tracking-tighter leading-[0.85]">
                        LET'S <br/>
                        TALK <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0543C] to-[#E86D44]">TRUTH.</span>
                    </h1>

                    <p className="text-2xl font-bold text-gray-400 max-w-md leading-tight">
                        Got a question about the Impact Hierarchy? Or just want to rant about demonetization? We're listening.
                    </p>
                </div>

                {/* Right Column: Functional Form */}
                <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[16px_16px_0px_rgba(26,26,26,0.1)] border-4 border-[#1A1A1A]/5 animate-in slide-in-from-bottom-8 fade-in duration-700">
                    
                    {!isSubmitted ? (
                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] ml-4">
                                    Identity Check
                                </label>
                                <input 
                                    name="name"
                                    required
                                    value={formState.name}
                                    onChange={handleChange}
                                    type="text" 
                                    className="w-full bg-[#F5F1E6] rounded-[1.5rem] px-6 py-5 font-bold text-lg text-[#1A1A1A] outline-none focus:ring-4 ring-[#1A1A1A]/10 transition-all border-2 border-transparent focus:border-[#1A1A1A] placeholder:text-gray-400"
                                    placeholder="Your Name or Alias"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] ml-4">
                                    Digital Coordinates
                                </label>
                                <input 
                                    name="url"
                                    value={formState.url}
                                    onChange={handleChange}
                                    type="url" 
                                    className="w-full bg-[#F5F1E6] rounded-[1.5rem] px-6 py-5 font-bold text-lg text-[#1A1A1A] outline-none focus:ring-4 ring-[#1A1A1A]/10 transition-all border-2 border-transparent focus:border-[#1A1A1A] placeholder:text-gray-400"
                                    placeholder="Channel URL (Optional)"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] ml-4">
                                    Primary Platform
                                </label>
                                <div className="relative">
                                    <select 
                                        name="platform"
                                        value={formState.platform}
                                        onChange={handleChange}
                                        className="w-full bg-[#F5F1E6] rounded-[1.5rem] px-6 py-5 font-bold text-lg text-[#1A1A1A] outline-none focus:ring-4 ring-[#1A1A1A]/10 transition-all border-2 border-transparent focus:border-[#1A1A1A] appearance-none cursor-pointer"
                                    >
                                        <option value="YouTube">YouTube</option>
                                        <option value="Spotify">Spotify</option>
                                        <option value="RSS">RSS Feed</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#1A1A1A]">
                                        <ArrowDown size={20} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] ml-4">
                                    The Signal
                                </label>
                                <textarea 
                                    name="message"
                                    required
                                    value={formState.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full bg-[#F5F1E6] rounded-[1.5rem] px-6 py-5 font-bold text-lg text-[#1A1A1A] outline-none focus:ring-4 ring-[#1A1A1A]/10 transition-all border-2 border-transparent focus:border-[#1A1A1A] placeholder:text-gray-400 resize-none"
                                    placeholder="What's on your mind?"
                                />
                            </div>

                            <Button 
                                variant="primary" 
                                size="lg" 
                                className="w-full text-xl py-6 mt-4 shadow-[8px_8px_0px_#E86D44] hover:shadow-[10px_10px_0px_#E86D44] active:scale-[0.98] active:shadow-none transition-all duration-200"
                                icon={<Send size={24} />}
                            >
                                SEND TRANSMISSION
                            </Button>
                        </form>
                    ) : (
                        <div className="min-h-[600px] flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in fade-in duration-500">
                            <div className="w-24 h-24 bg-[#7BC65C] rounded-full flex items-center justify-center text-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] mb-4">
                                <Check size={48} strokeWidth={4} />
                            </div>
                            <h3 className="text-4xl font-black text-[#1A1A1A] uppercase leading-none">
                                Message <br/> Received.
                            </h3>
                            <p className="text-xl font-bold text-gray-500 max-w-xs">
                                We'll be in touch! <br/> Stay spicy! 🌶️
                            </p>
                            <Button 
                                variant="neutral" 
                                onClick={() => setIsSubmitted(false)}
                                className="mt-8"
                            >
                                Send Another
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};