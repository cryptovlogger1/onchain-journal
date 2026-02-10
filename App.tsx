import React, { useState, useEffect } from 'react';
import { JournalEntry, ActionType } from './types';
import JournalForm from './components/JournalForm';
import JournalTimeline from './components/JournalTimeline';

const App: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'journal' | 'activity' | 'export'>('journal');

  // Persistence logic (minimal)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('decision_journal_entries');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setEntries(parsed);
      }
    } catch (e) {}
  }, []);

  const addEntry = (entry: { note: string; actionType: ActionType; txHash?: string }) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
      reviewStatus: null,
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('decision_journal_entries', JSON.stringify(updated));
  };

  const handleWalletClick = () => {
    console.log("wallet button clicked");
  };

  return (
    <div className="min-h-screen selection:bg-stone-200">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#fdfcfb]/80 backdrop-blur-md border-b border-stone-100 z-50 px-8 flex items-center justify-between">
        <div className="text-lg font-medium tracking-tight opacity-80">
          Decision Journal
        </div>
        
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-8 text-sm font-medium text-stone-500">
            <button 
              onClick={() => setActiveTab('journal')}
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
          </div>

          <button 
            onClick={handleWalletClick}
            className="px-4 py-1.5 rounded-full border border-stone-200 text-xs text-stone-600 hover:bg-stone-50 transition-all font-medium"
          >
            Connect wallet (optional)
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-24 px-4 max-w-2xl mx-auto">
        <div className="space-y-12">
          {entries.length === 0 ? (
            <JournalForm onSave={addEntry} />
          ) : (
            <JournalTimeline 
              entries={entries} 
              onEnterReview={() => {}} 
              onSaveNew={addEntry} 
            />
          )}
        </div>
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