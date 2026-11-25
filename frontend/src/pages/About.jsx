export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold">System Architecture &amp; API Specs</h2>
        <p className="text-sm text-slate-400">How React, Java Spring Boot, and Gemini AI work together</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 text-center">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <h3 className="font-bold text-indigo-400">1. React + Vite Client</h3>
          <p className="text-xs text-slate-400 mt-2">
            Six-page single-page application using React Router DOM, Tailwind CSS, and Axios.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <h3 className="font-bold text-emerald-400">2. Spring Boot REST API</h3>
          <p className="text-xs text-slate-400 mt-2">
            Java backend exposing /api/analyze and /api/compare with RestClient and environment-based configuration.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <h3 className="font-bold text-sky-400">3. Gemini 2.5 Flash LLM</h3>
          <p className="text-xs text-slate-400 mt-2">
            Evaluates complexity, identifies bugs and edge cases, and returns structured JSON for rendering.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
        <h3 className="font-semibold text-slate-200">REST Endpoints</h3>
        <div className="text-xs font-mono space-y-2 text-slate-300">
          <p>
            <span className="text-emerald-400 font-bold">POST</span> /api/analyze — Body:{' '}
            {'{ "language": "Java", "code": "..." }'}
          </p>
          <p>
            <span className="text-emerald-400 font-bold">POST</span> /api/compare — Body:{' '}
            {'{ "language": "Java", "codeA": "...", "codeB": "..." }'}
          </p>
        </div>
      </div>
    </div>
  );
}