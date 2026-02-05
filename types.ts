import React from 'react';

export type Platform = 'YouTube' | 'Spotify' | 'General';

export type Severity = 'blue' | 'yellow' | 'orange' | 'red';

export interface Flag {
  id: string;
  timestamp: string; // e.g., "04:20"
  seconds: number; // for positioning
  severity: Severity;
  type: string;
  transcript: string;
  aiReason: string;
  suggestedFix: string;
  status?: 'active' | 'processing' | 'resolved'; // Added for state management
  overlayStyle?: 'minimal' | 'bold' | 'context' | null; // New: For Overlay Engine
  publicInLedger?: boolean; // New: For Transparency Ledger
}

export interface WaveformBar {
  height: number;
  active: boolean;
}

export interface StudioState {
    file: File | null;
    status: 'idle' | 'analyzing' | 'complete';
    progress: number;
    flags: Flag[];
    waveformBars: number[];
    platform: Platform;
    showDownload: boolean;
    smartSummary: string; 
}

export interface UserProfile {
    name: string;
    role: string;
}

export interface ModalConfig {
    isOpen: boolean;
    title: string;
    content: React.ReactNode;
    type?: 'info' | 'legal' | 'coming-soon';
}