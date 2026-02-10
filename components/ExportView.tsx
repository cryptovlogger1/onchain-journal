import React from 'react';
import { JournalEntry } from '../types';
import { Icons } from '../constants';

interface ExportViewProps {
  entries: JournalEntry[];
}

const ExportView: React.FC<ExportViewProps> = ({ entries }) => {
  const safeEntries = entries || [];

  const exportAsText = () => {
    const text = safeEntries.map(e => `[${new Date(e.timestamp).toLocaleDateString()}] ${e.actionType.toUpperCase()}: ${e.note}`).join('\n\n');
    downloadFile(text, 'journal.txt', 'text/plain');
  };

  const exportAsMarkdown = () => {
    const md = `# My Onchain Decisions\n\n` + safeEntries.map(e => `## ${new Date(e.timestamp).toLocaleDateString()}\n- **Action:** ${e.actionType}\n- **Note:** ${e.note}\n- **Review:** ${e.reviewStatus || 'N/A'}`).join('\n\n---\n\n');
    downloadFile(md, 'journal.md', 'text/markdown');
  };

  const exportAsJSON = () => {
    const json = JSON.stringify(safeEntries, null, 2);
    downloadFile(json, 'journal.json', 'application/json');
  };

  const downloadFile = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="border-b border-stone-100 pb-6">
        <h2 className="serif text-2xl font-light text-stone-800">Take your thoughts with you.</h2>
        <p className="text-stone-400 text-sm mt-1 font-light">Your data is yours. Export it whenever you need.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Text File', desc: 'Simple plain text format for easy reading.', action: exportAsText, format: '.txt' },
          { title: 'Markdown', desc: 'Formatted text for personal archives or blogs.', action: exportAsMarkdown, format: '.md' },
          { title: 'JSON Data', desc: 'Structured data for developers or backup.', action: exportAsJSON, format: '.json' },
        ].map(opt => (
          <button 
            key={opt.title}
            onClick={opt.action}
            className="group flex flex-col p-8 bg-white border border-stone-100 rounded-2xl text-left hover:border-stone-300 hover:shadow-sm transition-all"
          >
            <div className="p-3 bg-stone-50 rounded-xl mb-6 w-fit text-stone-400 group-hover:text-stone-800 transition-colors">
              <Icons.Download />
            </div>
            <h3 className="font-medium text-stone-800 mb-2">{opt.title}</h3>
            <p className="text-xs text-stone-400 leading-relaxed mb-6 font-light">{opt.desc}</p>
            <span className="mt-auto text-[10px] font-bold tracking-widest uppercase text-stone-300 group-hover:text-stone-500 transition-colors">
              Export {opt.format}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 flex items-start gap-4">
        <div className="text-stone-300 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        </div>
        <div>
          <h4 className="text-sm font-medium text-stone-700 mb-1">Privacy Defaults</h4>
          <p className="text-xs text-stone-500 font-light leading-relaxed">
            Everything in this journal is stored locally in your browser. No social feeds, no public profiles, and no data tracking. Only you see what you write.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExportView;