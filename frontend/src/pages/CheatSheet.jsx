import { useState } from 'react';

export default function CheatSheet() {
  const [search, setSearch] = useState('');

  const data = [
    { structure: 'ArrayList', get: 'O(1)', add: 'O(1) amortized', remove: 'O(n)', contains: 'O(n)' },
    { structure: 'LinkedList', get: 'O(n)', add: 'O(1)', remove: 'O(1)', contains: 'O(n)' },
    { structure: 'HashMap / HashSet', get: 'O(1)', add: 'O(1)', remove: 'O(1)', contains: 'O(1)' },
    { structure: 'TreeMap / TreeSet', get: 'O(log n)', add: 'O(log n)', remove: 'O(log n)', contains: 'O(log n)' },
    { structure: 'PriorityQueue (Heap)', get: 'O(1) peek', add: 'O(log n)', remove: 'O(log n)', contains: 'O(n)' },
    { structure: 'ArrayDeque (Stack/Queue)', get: 'O(1) ends', add: 'O(1)', remove: 'O(1)', contains: 'O(n)' },
  ];

  const filtered = data.filter((item) =>
    item.structure.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Java Collections Big-O Reference</h2>
          <p className="text-sm text-slate-400">Quick time complexity lookup for common Java data structures</p>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter data structure..."
          className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800/70 text-slate-300 uppercase text-xs">
            <tr>
              <th className="p-4">Data Structure</th>
              <th className="p-4">Access / Get</th>
              <th className="p-4">Insert / Add</th>
              <th className="p-4">Delete / Remove</th>
              <th className="p-4">Search / Contains</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40">
                <td className="p-4 font-semibold text-indigo-400">{row.structure}</td>
                <td className="p-4 font-mono text-emerald-400">{row.get}</td>
                <td className="p-4 font-mono text-sky-400">{row.add}</td>
                <td className="p-4 font-mono text-amber-400">{row.remove}</td>
                <td className="p-4 font-mono text-slate-300">{row.contains}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}