import { useEffect, useState } from "react";
import { checkTransaction, getFraudHistory } from "../services/fraudApi";

export default function FraudCheck() {
  const [amount, setAmount] = useState("");
  const [location, setLocation] = useState("India");
  const [deviceId, setDeviceId] = useState("dev-101");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadHistory = async () => {
    try {
      const data = await getFraudHistory();
      setHistory(Array.isArray(data) ? data : []);
    } catch {
      // ignore initial history load error if backend isn't started yet
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await checkTransaction({
        amount: Number(amount),
        location,
        deviceId,
      });
      setResult(res);
      await loadHistory();
    } catch (err) {
      setError(err.message || "Failed to check transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-white">
      <h1 className="text-2xl font-bold">FraudTrace — Transaction Check</h1>

      <form
        onSubmit={handleSubmit}
        className="p-5 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div>
          <label className="block text-xs text-slate-400 mb-1">Amount (₹)</label>
          <input
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="75000"
            className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Location</label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="India"
            className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Device ID</label>
          <input
            type="text"
            required
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            placeholder="dev-101 or unknown-device"
            className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-sm"
          />
        </div>

        <div className="md:col-span-3">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium disabled:opacity-50"
          >
            {loading ? "Checking..." : "Check Transaction"}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-3 rounded bg-red-950 border border-red-700 text-red-200 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg">Status: {result.status}</span>
            <span className="text-sm text-indigo-400 font-semibold">
              Risk Score: {result.riskScore}/100
            </span>
          </div>
          {Array.isArray(result.reasons) && result.reasons.length > 0 && (
            <ul className="list-disc ml-5 text-sm text-slate-300">
              {result.reasons.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <h2 className="font-semibold text-lg">Recent Checks</h2>
        {history.length === 0 ? (
          <p className="text-sm text-slate-400">No transactions checked yet.</p>
        ) : (
          <div className="space-y-2 text-sm">
            {history.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-2"
              >
                <div>
                  <span className="font-medium">₹{item.amount}</span> • {item.location} •{" "}
                  <span className="text-slate-400">{item.deviceId}</span>
                </div>
                <div className="font-semibold">
                  {item.status} ({item.riskScore})
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}