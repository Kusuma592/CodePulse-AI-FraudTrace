import { useState, useEffect } from 'react';

export default function History() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('codepulse_history') || '[]');
    setItems(saved);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('codepulse_history');
    setItems([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Saved Analysis History</h2>
          <p className="text-sm text-slate-400">Recent code reviews saved in browser storage</p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearHistory}
            className="bg-red-900/60 hover:bg-red-800 text-red-200 px-4 py-2 rounded-lg text-sm cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 p-10 rounded-2xl text-center text-slate-500">
          No saved analyses yet. Run a code review in the AI Analyzer tab first.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-2.5 py-1 bg-indigo-950 text-indigo-300 text-xs font-semibold rounded">
                  {item.language}
                </span>
                <div className="flex flex-wrap gap-4 text-xs font-mono">
                  <span className="text-emerald-400">Time: {item.timeComplexity}</span>
                  <span className="text-sky-400">Space: {item.spaceComplexity}</span>
                  <span className="text-slate-500">{item.timestamp}</span>
                </div>
              </div>
              <pre className="bg-slate-950 p-3 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto">
                {item.code}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}