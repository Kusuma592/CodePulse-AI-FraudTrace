import { useEffect, useState } from "react";
import { getFraudHistory } from "../services/fraudApi";

export default function FraudInvestigation() {
  const [items, setItems] = useState([]);
  const [decisions, setDecisions] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    getFraudHistory()
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Could not load transactions"));
  }, []);

  const setCaseDecision = (index, verdict) => {
    setDecisions((prev) => ({ ...prev, [index]: verdict }));
  };

  const cases = items.filter(
    (tx) => tx.status === "FLAGGED" || tx.status === "REVIEW"
  );

  return (
    <div className="max-w-4xl mx-auto space-y-4 text-white">
      <h1 className="text-2xl font-bold">FraudTrace — Investigation Queue</h1>

      {error && (
        <div className="p-3 rounded bg-red-950 border border-red-700 text-red-200 text-sm">
          {error}
        </div>
      )}

      {cases.length === 0 ? (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-sm">
          No FLAGGED or REVIEW transactions yet. Run a high-risk check on Fraud Check first.
        </div>
      ) : (
        <div className="space-y-4">
          {cases.map((tx, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-semibold">₹{tx.amount}</span> •{" "}
                  <span>{tx.location}</span> •{" "}
                  <span className="text-slate-400">{tx.deviceId}</span>
                </div>
                <span className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-800 border border-slate-700">
                  {tx.status} (Score: {tx.riskScore})
                </span>
              </div>

              {Array.isArray(tx.reasons) && tx.reasons.length > 0 && (
                <ul className="list-disc ml-5 text-sm text-slate-300">
                  {tx.reasons.map((r, rIdx) => (
                    <li key={rIdx}>{r}</li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setCaseDecision(idx, "APPROVED")}
                  className="px-3 py-1.5 text-xs rounded bg-emerald-700 hover:bg-emerald-600"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => setCaseDecision(idx, "HELD")}
                  className="px-3 py-1.5 text-xs rounded bg-amber-700 hover:bg-amber-600"
                >
                  Hold
                </button>
                <button
                  type="button"
                  onClick={() => setCaseDecision(idx, "ESCALATED")}
                  className="px-3 py-1.5 text-xs rounded bg-red-700 hover:bg-red-600"
                >
                  Escalate
                </button>
                {decisions[idx] && (
                  <span className="ml-2 text-xs text-indigo-300 font-medium">
                    Decision: {decisions[idx]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}