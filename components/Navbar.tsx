import React from 'react';
import { Zap, User, Fingerprint } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  activePage: string;
  setPage: (page: 'home' | 'spectrum' | 'studio' | 'contact' | 'profile') => void;
  user: UserProfile;
  isAuthenticated: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setPage, user, isAuthenticated }) => {
  return (
    <>
      {/* Centered Main Navigation */}
      <div className="fixed top-6 left-0 right-0 flex justify-center z-50 px-6 pointer-events-none">
        <nav 
          className="bg-white/80 backdrop-blur-xl rounded-full px-3 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-2 max-w-4xl w-full justify-between ring-1 ring-white/50 pointer-events-auto transition-all duration-300 hover:bg-white"
          data-cursor="hover"
        >
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 pl-4 cursor-pointer group" 
            onClick={() => setPage('home')}
          >
            <div className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-md border-2 border-white">
              <Fingerprint size={20} className="text-[#F0543C]" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-[#1A1A1A] hidden sm:block">VOUCH</span>
          </div>

          {/* Center Links */}
          <div className="flex items-center bg-[#F5F1E6]/50 rounded-full p-1.5 gap-1">
            {['home', 'spectrum', 'studio', 'contact'].map((page) => (
              <button 
                key={page}
                onClick={() => setPage(page as any)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold capitalize transition-all duration-200 active:scale-95 ${
                  activePage === page 
                  ? 'bg-white shadow-md text-[#1A1A1A]' 
                  : 'text-gray-500 hover:text-[#1A1A1A] hover:bg-white/50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Static CTA */}
          <button
            onClick={() => setPage('studio')}
            className="hidden sm:flex items-center gap-2 bg-[#F0543C] text-white border-[3px] border-[#1A1A1A] px-6 py-2.5 rounded-full font-bold text-base shadow-[4px_4px_0px_#1A1A1A] hover:shadow-[6px_6px_0px_#1A1A1A] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-none transition-all duration-150 group"
          >
            <Zap className="fill-current group-hover:animate-pulse" size={18} />
            AUDIT
          </button>
        </nav>
      </div>

      {/* Detached Profile Button (Top Right) - Only Visible if Authenticated */}
      {isAuthenticated && (
          <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-4 fade-in duration-700">
            <button
              onClick={() => setPage('profile')}
              className={`
                border-[3px] border-[#1A1A1A] p-2 pr-6 pl-2 rounded-full font-bold 
                shadow-[4px_4px_0px_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.15)] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-none
                transition-all duration-150 flex items-center gap-3 backdrop-blur-xl
                ${activePage === 'profile' 
                  ? 'bg-[#1A1A1A] text-white' 
                  : 'bg-white/80 text-[#1A1A1A]'}
              `}
            >
               <div className={`
                 w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#1A1A1A] overflow-hidden 
                 ${activePage === 'profile' ? 'bg-white text-[#1A1A1A]' : 'bg-[#1A1A1A] text-white'}
               `}>
                  <User size={20} />
               </div>
               {/* Live Name Update */}
               <span className="text-sm tracking-wide hidden md:inline-block truncate max-w-[120px]">{user.name}</span>
            </button>
          </div>
      )}
    </>
  );
};