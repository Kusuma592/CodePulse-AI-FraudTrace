import { useState } from 'react';
import axios from 'axios';

export default function Analyzer() {
  const [language, setLanguage] = useState('Java');
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await axios.post('http://localhost:8080/api/analyze', { language, code });
      setResult(res.data);

      const existing = JSON.parse(localStorage.getItem('codepulse_history') || '[]');
      const entry = {
        id: Date.now(),
        language,
        code,
        ...res.data,
        timestamp: new Date().toLocaleString(),
      };
      localStorage.setItem('codepulse_history', JSON.stringify([entry, ...existing.slice(0, 19)]));
    } catch (err) {
      setError(
        err.response?.data?.error ||
          'Backend connection failed. Make sure Spring Boot is running on port 8080.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">AI Code Analyzer</h2>
          <p className="text-sm text-slate-400">Evaluate Big-O complexity, bugs, and cleaner refactors</p>
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
            <option>JavaScript</option>
          </select>
          <button
            onClick={handleAnalyze}
            disabled={loading || !code.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-5 py-2 rounded-lg font-medium text-sm cursor-pointer"
          >
            {loading ? 'Analyzing...' : 'Run AI Analysis'}
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
          rows={18}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`Paste your ${language} code here...`}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-sm focus:outline-none focus:border-indigo-500"
        />

        <div className="space-y-4">
          {!result && !loading && (
            <div className="h-full min-h-[380px] border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-slate-500 text-sm">
              Analysis results will appear here
            </div>
          )}

          {result && (
            <>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                  <span className="text-xs text-slate-400">Time</span>
                  <p className="text-lg font-bold text-emerald-400 mt-1">{result.timeComplexity}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                  <span className="text-xs text-slate-400">Space</span>
                  <p className="text-lg font-bold text-sky-400 mt-1">{result.spaceComplexity}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                  <span className="text-xs text-slate-400">Quality Score</span>
                  <p className="text-lg font-bold text-indigo-400 mt-1">{result.qualityScore}/100</p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <h3 className="text-sm font-semibold text-amber-400 mb-2">Bugs &amp; Edge Cases</h3>
                <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                  {result.bugs?.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <p className="text-xs text-slate-400 mt-3">{result.explanation}</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <h3 className="text-sm font-semibold text-indigo-400 mb-2">Optimized Code</h3>
                <pre className="text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap">
                  {result.optimizedCode}
                </pre>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}