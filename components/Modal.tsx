import React, { useEffect, useState } from 'react';
import { X, AlertOctagon, Info, Clock } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    type?: 'info' | 'legal' | 'coming-soon';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, type = 'info' }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!visible && !isOpen) return null;

    const iconMap = {
        'info': <Info size={24} className="text-[#1A1A1A]" />,
        'legal': <AlertOctagon size={24} className="text-[#F0543C]" />,
        'coming-soon': <Clock size={24} className="text-[#7BC65C]" />
    };

    const headerColor = {
        'info': 'bg-gray-100',
        'legal': 'bg-[#F0543C]/10',
        'coming-soon': 'bg-[#7BC65C]/10'
    };

    return (
        <div 
            className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        >
            <div 
                className="absolute inset-0 bg-[#1A1A1A]/80 backdrop-blur-sm"
                onClick={onClose}
            ></div>
            
            <div 
                className={`bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative overflow-hidden transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}
            >
                <div className={`px-8 py-6 flex items-center justify-between ${headerColor[type]} border-b border-black/5`}>
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-full shadow-sm">
                            {iconMap[type]}
                        </div>
                        <h2 className="text-2xl font-black text-[#1A1A1A] tracking-tight uppercase">{title}</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-all duration-200 border border-black/5"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    <div className="text-lg font-medium text-gray-600 leading-relaxed space-y-4">
                        {children}
                    </div>
                </div>

                <div className="px-8 py-6 bg-gray-50 border-t border-black/5 flex justify-end">
                    <Button variant="primary" onClick={onClose} size="md">
                        Understood
                    </Button>
                </div>
            </div>
        </div>
    );
};