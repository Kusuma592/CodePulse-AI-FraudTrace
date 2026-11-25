import { useEffect, useState } from "react";
import { getFraudHistory } from "../services/fraudApi";

export default function FraudDashboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getFraudHistory()
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Could not load summary"));
  }, []);

  const total = items.length;
  const flagged = items.filter((x) => x.status === "FLAGGED").length;
  const review = items.filter((x) => x.status === "REVIEW").length;
  const safe = items.filter((x) => x.status === "SAFE").length;

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">FraudTrace — Summary</h1>

      {error && (
        <div className="mb-4 p-3 rounded bg-red-950 border border-red-700 text-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-slate-900 border border-slate-700">
          <div className="text-xs text-slate-400">Total Checked</div>
          <div className="text-2xl font-bold mt-1">{total}</div>
        </div>
        <div className="p-4 rounded-lg bg-slate-900 border border-slate-700">
          <div className="text-xs text-red-400">Flagged</div>
          <div className="text-2xl font-bold mt-1">{flagged}</div>
        </div>
        <div className="p-4 rounded-lg bg-slate-900 border border-slate-700">
          <div className="text-xs text-amber-400">Review</div>
          <div className="text-2xl font-bold mt-1">{review}</div>
        </div>
        <div className="p-4 rounded-lg bg-slate-900 border border-slate-700">
          <div className="text-xs text-emerald-400">Safe</div>
          <div className="text-2xl font-bold mt-1">{safe}</div>
        </div>
      </div>
    </div>
  );
}