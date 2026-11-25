import { useState } from 'react';
import axios from 'axios';

export default function Compare() {
  const [language, setLanguage] = useState('Java');
  const [codeA, setCodeA] = useState('');
  const [codeB, setCodeB] = useState('');
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCompare = async () => {
    if (!codeA.trim() || !codeB.trim()) return;
    setLoading(true);
    setComparison(null);
    setError('');

    try {
      const res = await axios.post('http://localhost:8080/api/compare', {
        language,
        codeA,
        codeB,
      });
      setComparison(res.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          'Comparison failed. Check that the Spring Boot backend is running on port 8080.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Snippet Comparator</h2>
          <p className="text-sm text-slate-400">Compare two implementations side-by-side</p>
        </div>
        <div className="flex gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm"
          >
            <option>Java</option>
            <option>Python</option>
            <option>C++</option>
          </select>
          <button
            onClick={handleCompare}
            disabled={loading || !codeA.trim() || !codeB.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-5 py-2 rounded-lg font-medium text-sm cursor-pointer"
          >
            {loading ? 'Comparing...' : 'Compare Both'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-950/60 border border-red-800 text-red-300 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <textarea
          rows={12}
          value={codeA}
          onChange={(e) => setCodeA(e.target.value)}
          placeholder="Paste Snippet A (e.g., Brute Force)..."
          className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-sm focus:outline-none focus:border-indigo-500"
        />
        <textarea
          rows={12}
          value={codeB}
          onChange={(e) => setCodeB(e.target.value)}
          placeholder="Paste Snippet B (e.g., Optimized Approach)..."
          className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-sm focus:outline-none focus:border-indigo-500"
        />
      </div>

      {comparison && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-emerald-400">Winner: {comparison.winner}</h3>
          <p className="text-sm text-slate-300">{comparison.reason}</p>
          <div className="grid md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h4 className="font-semibold text-indigo-400">Snippet A</h4>
              <p className="text-sm mt-1">
                Time: <b>{comparison.snippetA?.time}</b> | Space: <b>{comparison.snippetA?.space}</b>
              </p>
              <p className="text-xs text-slate-400 mt-1">{comparison.snippetA?.verdict}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h4 className="font-semibold text-indigo-400">Snippet B</h4>
              <p className="text-sm mt-1">
                Time: <b>{comparison.snippetB?.time}</b> | Space: <b>{comparison.snippetB?.space}</b>
              </p>
              <p className="text-xs text-slate-400 mt-1">{comparison.snippetB?.verdict}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}