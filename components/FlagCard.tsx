import React from 'react';
import { Flag } from '../types';
import { Button } from './Button';
import { AlertCircle, Wand2, Trash2, CheckCircle2, Loader2 } from 'lucide-react';

interface FlagCardProps {
  flag: Flag;
  autoNukeEnabled: boolean;
  onNuke: (id: string) => void;
  onFix: (id: string) => void;
}

export const FlagCard: React.FC<FlagCardProps> = ({ flag, onNuke, onFix }) => {
  const isRed = flag.severity === 'red';
  const isResolved = flag.status === 'resolved';
  const isProcessing = flag.status === 'processing';

  const severityStyles = {
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
  };

  if (isResolved) {
      return (
        <div className="h-0 opacity-0 overflow-hidden transition-all duration-700 ease-in-out">
        </div>
      );
  }

  return (
    <div 
        className={`group relative bg-white rounded-[2rem] p-6 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-black/5 animate-in slide-in-from-right-4 ${isProcessing ? 'opacity-80 scale-[0.98]' : ''}`}
        data-cursor={isRed ? "danger" : undefined}
    >
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex gap-3 items-center">
          <span className="bg-[#2D2D2D] text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow-sm">
            {flag.timestamp}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${severityStyles[flag.severity]}`}>
            {flag.type}
          </span>
        </div>
      </div>

      <div className={`space-y-4 relative z-10`}>
        <p className={`font-bold text-xl leading-snug text-[#2D2D2D]`}>
          "{flag.transcript}"
        </p>
        
        <div className="bg-[#F5F1E6] rounded-2xl p-4 text-sm text-[#2D2D2D] font-medium">
          <span className="font-extrabold block mb-1 flex items-center gap-2 text-xs uppercase tracking-wide opacity-70">
            <AlertCircle size={14} /> AI Analysis
          </span>
          {flag.aiReason}
        </div>

        <div className="pt-2 border-t border-gray-100 mt-4">
          <div className="flex items-center gap-2 mb-4 text-sm font-bold text-[#7BC65C]">
            <Wand2 size={16} /> Fix: {flag.suggestedFix}
          </div>
          
          <div className="flex gap-3">
            <Button 
                size="sm" 
                variant="neutral" 
                className="flex-1 rounded-xl text-sm"
                onClick={() => onFix(flag.id)}
                disabled={isProcessing}
            >
                {isProcessing ? (
                    <span className="flex items-center gap-2 animate-pulse">
                        <Loader2 className="animate-spin" size={16} /> Fixing...
                    </span>
                ) : "Auto-Fix"}
            </Button>
            {(flag.severity === 'red' || flag.severity === 'orange') && (
                <Button 
                    size="sm" 
                    variant="danger" 
                    className="rounded-xl px-4"
                    onClick={() => onNuke(flag.id)}
                    title="Nuke Segment"
                    disabled={isProcessing}
                >
                    <Trash2 size={20} />
                </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};