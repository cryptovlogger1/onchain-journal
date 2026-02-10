import React, { useState } from 'react';
import { JournalEntry, ActionType } from '../types';
import JournalEntryCard from './JournalEntryCard';
import JournalForm from './JournalForm';
import { ACTION_TYPES } from '../constants';

interface JournalTimelineProps {
  entries: JournalEntry[];
  onEnterReview: () => void;
  onSaveNew: (entry: { note: string; actionType: ActionType; txHash?: string }) => void;
}

const JournalTimeline: React.FC<JournalTimelineProps> = ({ entries, onEnterReview, onSaveNew }) => {
  const [filter, setFilter] = useState<ActionType | 'all'>('all');
  const [showForm, setShowForm] = useState(false);

  const safeEntries = entries || [];
  const filteredEntries = filter === 'all' 
    ? safeEntries 
    : safeEntries.filter(e => e.actionType === filter);

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between border-b border-stone-100 pb-6">
        <div>
          <h2 className="serif text-2xl font-light text-stone-800 mb-1">These are your past decisions.</h2>
          <div className="flex gap-4 mt-4">
            <button 
              onClick={() => setFilter('all')}
              className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${filter === 'all' ? 'bg-stone-200 text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
            >
              All
            </button>
            {(ACTION_TYPES || []).map(type => (
              <button 
                key={type.value}
                onClick={() => setFilter(type.value)}
                className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${filter === type.value ? 'bg-stone-200 text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowForm(!showForm)}
            className="text-sm text-stone-500 font-medium px-4 py-2 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
          >
            {showForm ? 'Cancel' : 'New note'}
          </button>
          <button 
            onClick={onEnterReview}
            className="text-sm bg-stone-100 text-stone-800 font-medium px-4 py-2 rounded-lg hover:bg-stone-200 transition-colors"
          >
            Review past decisions
          </button>
        </div>
      </div>

      {showForm && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <JournalForm 
            onSave={(entry) => {
              onSaveNew(entry);
              setShowForm(false);
            }} 
            onConnect={() => {}} 
            inline 
          />
        </div>
      )}

      <div className="space-y-6">
        {filteredEntries.map(entry => (
          <JournalEntryCard key={entry?.id} entry={entry} />
        ))}
        {filteredEntries.length === 0 && (
          <div className="py-24 text-center text-stone-300 font-light italic">
            No entries found matching the filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalTimeline;