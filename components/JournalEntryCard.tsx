
import React, { useState } from 'react';
import { JournalEntry } from '../types';
import { Icons } from '../constants';

interface JournalEntryCardProps {
  entry: JournalEntry;
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({ entry }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(entry.timestamp));

  const shortHash = entry.txHash ? `${entry.txHash.slice(0, 6)}...${entry.txHash.slice(-4)}` : null;

  return (
    <div 
      className={`bg-white border border-stone-100 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${isExpanded ? 'ring-1 ring-stone-200 shadow-sm' : 'hover:border-stone-300 shadow-sm shadow-stone-100/50'}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <p className={`serif leading-relaxed text-stone-700 transition-all ${isExpanded ? '' : 'line-clamp-2 text-stone-500'}`}>
              {entry.note}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
             <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400 bg-stone-50 px-2 py-1 rounded">
              {entry.actionType}
            </span>
            <span className="text-xs text-stone-400 font-light flex items-center gap-1">
              {formattedDate}
            </span>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-8 pt-6 border-t border-stone-50 flex items-center justify-between text-xs text-stone-400 font-light animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Icons.Clock />
                {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              {entry.txHash && (
                <span className="flex items-center gap-1.5 group cursor-help">
                  <Icons.Hash />
                  {shortHash}
                </span>
              )}
            </div>
            
            {entry.reviewStatus && (
              <div className="flex items-center gap-2">
                <span className="text-stone-300 italic">Retrospective:</span>
                <span className={`px-2 py-0.5 rounded-full capitalize font-medium ${
                  entry.reviewStatus === 'yes' ? 'bg-green-50 text-green-700' :
                  entry.reviewStatus === 'no' ? 'bg-red-50 text-red-700' :
                  'bg-stone-50 text-stone-600'
                }`}>
                  {entry.reviewStatus}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalEntryCard;
