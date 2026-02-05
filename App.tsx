import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './views/Home';
import { Spectrum } from './views/Spectrum';
import { Studio } from './views/Studio';
import { Contact } from './views/Contact';
import { Profile } from './views/Profile';
import { StudioState } from './types';

function App() {
  const [activePage, setActivePageState] = useState<'home' | 'spectrum' | 'studio' | 'contact' | 'profile'>('home');

  // Persistent Studio State
  const [studioState, setStudioState] = useState<StudioState>({
    file: null,
    status: 'idle',
    progress: 0,
    flags: [],
    waveformBars: [],
    platform: 'YouTube',
    showDownload: false
  });

  const setActivePage = (page: 'home' | 'spectrum' | 'studio' | 'contact' | 'profile') => {
    setActivePageState(page);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const renderPage = () => {
    switch (activePage) {
        case 'home': return <Home setPage={setActivePage} />;
        case 'spectrum': return <Spectrum />;
        case 'studio': return <Studio studioState={studioState} setStudioState={setStudioState} />;
        case 'contact': return <Contact />;
        case 'profile': return <Profile setPage={setActivePage} />;
        default: return <Home setPage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E6] flex flex-col font-[Plus Jakarta Sans] overflow-x-hidden">
      <Navbar activePage={activePage} setPage={setActivePage} />
      
      {renderPage()}

      <Footer setPage={setActivePage} activePage={activePage} />
    </div>
  );
}

export default App;