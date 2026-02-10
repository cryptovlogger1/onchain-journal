import React, { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { JournalEntry, ActionType, ReviewStatus } from './types';
import JournalForm from './components/JournalForm';
import JournalTimeline from './components/JournalTimeline';
import ActivityView from './components/ActivityView';
import ExportView from './components/ExportView';
import ReviewMode from './components/ReviewMode';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'journal' | 'activity' | 'export'>('journal');
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  // Wagmi hooks for minimal wallet connection
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const isConnected = account?.isConnected ?? false;
  const address = account?.address ?? null;

  // Persistence logic
  useEffect(() => {
    try {
      const saved = localStorage.getItem('decision_journal_entries');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setEntries(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load journal entries', e);
    }
  }, []);

  useEffect(() => {
    if (entries) {
      localStorage.setItem('decision_journal_entries', JSON.stringify(entries));
    }
  }, [entries]);

  const handleConnect = () => {
    console.log("connect clicked");
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      if (connect && connectors && connectors.length > 0) {
        connect({ connector: connectors[0] });
      } else {
        console.warn("Wagmi connect or connectors not initialized yet.");
      }
    } else {
      alert('Injected wallet (MetaMask/Rabby) not detected.');
    }
  };

  const handleWalletAction = () => {
    if (isConnected) {
      console.log("disconnect clicked");
      if (disconnect) {
        disconnect();
      }
    } else {
      handleConnect();
    }
  };

  const addEntry = (entry: Omit<JournalEntry, 'id' | 'timestamp' | 'reviewStatus'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
      reviewStatus: null,
    };
    setEntries(prev => [newEntry, ...(prev || [])]);
  };

  const updateReview = (id: string, status: ReviewStatus) => {
    setEntries(prev => (prev || []).map(e => (e && e.id === id) ? { ...e, reviewStatus: status } : e));
  };

  const renderContent = () => {
    if (activeTab === 'activity') {
      return <ActivityView />;
    }
    if (activeTab === 'export') {
      return <ExportView entries={entries || []} />;
    }

    if (isReviewMode) {
      return (
        <ReviewMode 
          entries={entries || []} 
          onUpdateReview={updateReview} 
          onExit={() => setIsReviewMode(false)} 
        />
      );
    }

    if (!entries || entries.length === 0) {
      return <JournalForm onSave={addEntry} />;
    }

    return (
      <JournalTimeline 
        entries={entries} 
        onEnterReview={() => setIsReviewMode(true)} 
        onSaveNew={addEntry}
      />
    );
  };

  const displayAddress = address 
    ? address.slice(0, 6) + "..." + address.slice(-4) 
    : null;

  return (
    <div className="min-h-screen selection:bg-stone-200">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#fdfcfb]/80 backdrop-blur-md border-b border-stone-100 z-50 px-8 flex items-center justify-between">
        <div 
          className="text-lg font-medium tracking-tight cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          onClick={() => { setActiveTab('journal'); setIsReviewMode(false); }}
        >
          Decision Journal
        </div>
        
        <div className="flex items-center gap-8 text-sm font-medium text-stone-500">
          <button 
            onClick={() => { setActiveTab('journal'); setIsReviewMode(false); }}
            className={`hover:text-stone-900 transition-colors ${activeTab === 'journal' ? 'text-stone-900' : ''}`}
          >
            Journal
          </button>
          <button 
            onClick={() => setActiveTab('activity')}
            className={`hover:text-stone-900 transition-colors ${activeTab === 'activity' ? 'text-stone-900' : ''}`}
          >
            Activity
          </button>
          <button 
            onClick={() => setActiveTab('export')}
            className={`hover:text-stone-900 transition-colors ${activeTab === 'export' ? 'text-stone-900' : ''}`}
          >
            Export
          </button>

          {/* Wallet Action Button - Always clickable, no disabled state */}
          <button 
            onClick={handleWalletAction}
            className="px-4 py-1.5 rounded-full border border-stone-200 text-xs text-stone-600 hover:bg-stone-50 transition-all font-medium"
          >
            {isConnected ? displayAddress : 'Connect wallet (optional)'}
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-4 max-w-2xl mx-auto">
        {renderContent()}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-8 text-center pointer-events-none">
        <span className="text-stone-300 text-[10px] font-light tracking-[0.3em] uppercase">
          Private • Reflective • Minimal
        </span>
      </footer>
    </div>
  );
};

export default App;