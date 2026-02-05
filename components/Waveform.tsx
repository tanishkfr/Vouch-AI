import React, { useEffect, useState } from 'react';
import { Flag } from '../types';

interface WaveformProps {
  isScanning: boolean;
  scanComplete: boolean;
  flags: Flag[];
  themeColor: string; 
  bars: number[]; 
  onFlagClick?: (flag: Flag) => void;
  isNuking?: boolean;
  nukeProgress?: number;
}

export const Waveform: React.FC<WaveformProps> = ({ 
    isScanning, 
    scanComplete, 
    flags, 
    themeColor, 
    bars, 
    onFlagClick,
    isNuking = false,
    nukeProgress = 0
}) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    let interval: any;
    if (isScanning) {
      setScanProgress(0);
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 20); 
    } else if (!scanComplete) {
      setScanProgress(0);
    }
    return () => clearInterval(interval);
  }, [isScanning, scanComplete]);

  const getFlagForBar = (index: number) => {
    if (!scanComplete) return null;
    const totalBars = bars.length;
    const percentage = (index / totalBars) * 100;
    
    return flags.find(f => {
        if (f.status === 'resolved') return false;
        const flagPerc = (f.seconds / 1800) * 100; 
        return percentage >= flagPerc - 1.5 && percentage <= flagPerc + 1.5;
    });
  };

  const getBarColor = (index: number) => {
      const activeFlag = getFlagForBar(index);
      if (activeFlag) {
          switch (activeFlag.severity) {
              case 'red': return '#F0543C';
              case 'orange': return '#FB923C';
              case 'yellow': return '#FACC15';
              case 'blue': return '#3B82F6';
              default: return themeColor;
          }
      }
      return '#2D2D2D'; 
  };

  const hoveredFlag = hoveredIndex !== null ? getFlagForBar(hoveredIndex) : null;

  return (
    <div className="relative w-full h-80 bg-[#1A1A1A] rounded-[2rem] overflow-visible ring-4 ring-black/5 shadow-2xl p-8 flex items-center group/waveform">
      
      {/* Bars Container */}
      <div className="w-full h-full flex items-center justify-between gap-1 z-10" onMouseLeave={() => setHoveredIndex(null)}>
        {bars.map((height, i) => {
           const flag = getFlagForBar(i);
           const isFlagNuked = isNuking && flag && (flag.severity === 'red' || flag.severity === 'orange') && nukeProgress > (i / bars.length) * 100;
           
           return (
            <div 
              key={i}
              onClick={() => flag && onFlagClick && onFlagClick(flag)}
              className={`w-full rounded-full transition-all duration-300 relative ${flag && !isFlagNuked ? 'animate-pulse cursor-pointer' : ''}`}
              onMouseEnter={() => setHoveredIndex(i)}
              style={{ 
                height: `${scanComplete ? height : 10}%`,
                backgroundColor: isScanning 
                  ? (scanProgress > (i / bars.length) * 100 ? themeColor : '#333')
                  : (isFlagNuked ? '#2D2D2D' : getBarColor(i)),
                opacity: isScanning ? 1 : (flag && !isFlagNuked ? 1 : 0.4), 
                transform: hoveredIndex === i ? 'scaleY(1.2)' : 'scaleY(1)'
              }}
            />
          );
        })}
      </div>

      {isScanning && (
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] rounded-[2rem] pointer-events-none" 
             style={{ clipPath: `inset(0 0 0 ${scanProgress}%)`, transition: 'clip-path 0.05s linear' }} />
      )}

      {isNuking && (
          <div className="absolute inset-0 bg-[#F0543C]/20 rounded-[2rem] pointer-events-none z-20 flex items-center"
               style={{ 
                   clipPath: `inset(0 0 0 ${nukeProgress}%)`,
                   transition: 'clip-path 0.05s linear'
               }}
          >
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#F0543C] shadow-[0_0_20px_#F0543C]"></div>
          </div>
      )}

      {hoveredFlag && !isNuking && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white text-[#1A1A1A] px-6 py-3 rounded-xl shadow-2xl z-50 animate-in zoom-in-95 pointer-events-none border-2 border-black whitespace-nowrap">
            <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                    hoveredFlag.severity === 'red' ? 'bg-[#F0543C]' :
                    hoveredFlag.severity === 'yellow' ? 'bg-[#FACC15]' :
                    hoveredFlag.severity === 'orange' ? 'bg-[#FB923C]' : 'bg-blue-500'
                }`}></div>
                <span className="font-black uppercase tracking-wider text-sm">{hoveredFlag.type}</span>
                <span className="font-mono text-gray-400 font-bold border-l pl-3 border-gray-200">{hoveredFlag.timestamp}</span>
            </div>
            <div className="text-xs font-bold text-gray-500 mt-1 max-w-xs whitespace-normal">
                {hoveredFlag.aiReason}
            </div>
            {(hoveredFlag.severity === 'blue' || hoveredFlag.severity === 'yellow') && (
                <div className="mt-2 text-[10px] font-black uppercase text-[#1A1A1A] bg-gray-100 rounded px-2 py-1 text-center">
                    Click to Overlay
                </div>
            )}
        </div>
      )}
    </div>
  );
};