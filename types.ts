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
}