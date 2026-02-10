import React from 'react';
import { ActivityItem } from '../types';

const ActivityView: React.FC = () => {
  const mockActivity: Record<string, ActivityItem[]> = {
    "Recently": [
      { id: '1', type: 'purchase', title: 'Asset Allocation Change', date: '2 days ago', weekLabel: 'Recently' },
      { id: '2', type: 'post', title: 'Strategy Update', date: '4 days ago', weekLabel: 'Recently' },
    ],
    "Earlier": [
      { id: '3', type: 'reply', title: 'Risk Assessment', date: '10 days ago', weekLabel: 'Earlier' },
      { id: '4', type: 'purchase', title: 'Portfolio Rebalance', date: '12 days ago', weekLabel: 'Earlier' },
    ]
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="border-b border-stone-100 pb-6">
        <h2 className="serif text-2xl font-light text-stone-800">Activity Context</h2>
        <p className="text-stone-400 text-sm mt-1 font-light italic">External data points for reflection.</p>
      </div>

      <div className="space-y-12">
        {Object.entries(mockActivity || {}).map(([week, items]) => (
          <div key={week} className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-300 border-b border-stone-50 pb-2">
              {week}
            </h3>
            <div className="space-y-2">
              {(items || []).map(item => (
                <div key={item?.id} className="flex items-center justify-between py-4 group">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-stone-200 group-hover:bg-stone-400 transition-colors" />
                    <div>
                      <p className="text-sm text-stone-700">{item?.title}</p>
                      <p className="text-[10px] text-stone-400 uppercase tracking-tight">{item?.type}</p>
                    </div>
                  </div>
                  <span className="text-xs text-stone-400 font-light">{item?.date}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityView;