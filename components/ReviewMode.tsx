import React from 'react';
import { JournalEntry, ReviewStatus } from '../types';

interface ReviewModeProps {
  entries: JournalEntry[];
  onUpdateReview: (id: string, status: ReviewStatus) => void;
  onExit: () => void;
}

const ReviewMode: React.FC<ReviewModeProps> = ({ entries, onUpdateReview, onExit }) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-4 mb-16">
        <h2 className="serif text-3xl font-light text-stone-800 italic">What patterns do you notice?</h2>
        <p className="text-stone-400 text-sm font-light">Take a moment to look back at your past self without judgement.</p>
        <button 
          onClick={onExit}
          className="text-stone-500 hover:text-stone-900 text-xs font-medium uppercase tracking-widest transition-colors"
        >
          Close Review Mode
        </button>
      </div>

      <div className="space-y-12">
        {(entries || []).map(entry => (
          <div key={entry?.id} className="group border-l-2 border-stone-100 pl-8 pb-4 transition-colors hover:border-stone-300">
            <div className="mb-4">
              <span className="text-[10px] uppercase tracking-widest font-bold text-stone-300 group-hover:text-stone-500 transition-colors">
                {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(entry?.timestamp || 0))}
              </span>
              <p className="serif text-lg leading-relaxed text-stone-700 mt-2 italic">
                "{entry?.note}"
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <span className="text-xs text-stone-400 font-medium">Would you make this decision again?</span>
              <div className="flex gap-4">
                {(['yes', 'unsure', 'no'] as ReviewStatus[]).map(status => (
                  <button
                    key={status}
                    onClick={() => onUpdateReview(entry?.id, status)}
                    className={`px-6 py-2 rounded-full text-xs font-medium border transition-all ${
                      entry?.reviewStatus === status 
                        ? 'bg-stone-800 text-stone-50 border-stone-800' 
                        : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400 hover:text-stone-800'
                    }`}
                  >
                    {status === 'yes' ? 'Yes' : status === 'no' ? 'No' : 'Unsure'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center pt-24">
         <button 
          onClick={onExit}
          className="px-8 py-3 bg-stone-100 text-stone-800 rounded-full text-sm font-medium hover:bg-stone-200 transition-colors"
        >
          Finished Reflection
        </button>
      </div>
    </div>
  );
};

export default ReviewMode;