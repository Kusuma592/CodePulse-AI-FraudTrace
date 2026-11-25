import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Big-O Complexity Engine',
      desc: 'Instant Time and Space complexity evaluation for Java, Python, C++, and JavaScript snippets.',
    },
    {
      title: 'Bug & Edge-Case Detection',
      desc: 'Flags null references, boundary errors, and performance bottlenecks before you commit code.',
    },
    {
      title: 'Side-by-Side Comparison',
      desc: 'Compare two solutions—such as a brute-force loop vs. a HashMap approach—to see trade-offs clearly.',
    },
  ];

  return (
    <div className="space-y-12 py-8">
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <span className="px-3 py-1 text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800 rounded-full">
          Full Stack Java + React + Gemini AI
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Analyze Complexity &amp; Refactor Code with <span className="text-indigo-400">CodePulse AI</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Paste any algorithm or backend snippet to get Time/Space complexity, edge-case warnings, and cleaner code suggestions.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={() => navigate('/analyzer')}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-semibold transition cursor-pointer"
          >
            Start Analyzing Code
          </button>
          <button
            onClick={() => navigate('/compare')}
            className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl font-semibold transition cursor-pointer"
          >
            Compare Two Snippets
          </button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <h3 className="text-lg font-bold text-indigo-400">{f.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}