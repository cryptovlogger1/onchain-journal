import React, { useState } from 'react';
import { ActionType } from '../types';
import { ACTION_TYPES, Icons } from '../constants';

interface JournalFormProps {
  onSave: (entry: { note: string; actionType: ActionType; txHash?: string }) => void;
  inline?: boolean;
}

const JournalForm: React.FC<JournalFormProps> = ({ onSave, inline = false }) => {
  const [note, setNote] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [actionType, setActionType] = useState<ActionType>('other');
  const [txHash, setTxHash] = useState('');

  const handleSave = () => {
    if (!note.trim()) return;
    onSave({ note, actionType, txHash });
    setNote('');
    setTxHash('');
    setActionType('other');
    setIsExpanded(false);
  };

  return (
    <div className={`w-full ${inline ? '' : 'text-center'}`}>
      {!inline && (
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="serif text-4xl font-light mb-3 text-stone-800">
            Leave a note for future you.
          </h1>
          <p className="text-stone-400 text-sm tracking-wide font-light">
            Capture why you made this decision.
          </p>
        </div>
      )}

      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="I did this because..."
          className="w-full h-48 p-8 bg-transparent focus:outline-none resize-none text-stone-800 placeholder-stone-300 serif text-lg font-light leading-relaxed"
        />

        <div className="px-8 pb-6 text-left">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-stone-400 text-xs font-medium hover:text-stone-600 transition-colors mb-4"
          >
            {isExpanded ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
            Add context (optional)
          </button>

          {isExpanded && (
            <div className="grid grid-cols-2 gap-4 mb-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-bold text-stone-400">Action Type</label>
                <select 
                  value={actionType}
                  onChange={(e) => setActionType(e.target.value as ActionType)}
                  className="w-full bg-stone-50 border border-stone-100 rounded-lg px-3 py-2 text-sm text-stone-600 focus:outline-none focus:border-stone-200"
                >
                  {ACTION_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-bold text-stone-400">Reference / ID</label>
                <input 
                  type="text" 
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  placeholder="e.g. Transaction ID"
                  className="w-full bg-stone-50 border border-stone-100 rounded-lg px-3 py-2 text-sm text-stone-600 focus:outline-none focus:border-stone-200"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-start gap-4">
             <button
              onClick={handleSave}
              disabled={!note.trim()}
              className="px-8 py-3 bg-stone-800 text-stone-50 rounded-full text-sm font-medium hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-stone-200"
            >
              Save note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalForm;