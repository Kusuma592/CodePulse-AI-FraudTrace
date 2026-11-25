import { useEffect, useState } from "react";
import { getFraudHistory } from "../services/fraudApi";

export default function FraudAuditLogs() {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [error, setError] = useState("");

  useEffect(() => {
    getFraudHistory()
      .then((data) => setLogs(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Could not load audit logs"));
  }, []);

  const visibleLogs =
    filter === "ALL" ? logs : logs.filter((item) => item.status === filter);

  return (
    <div className="max-w-5xl mx-auto space-y-4 text-white">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">FraudTrace — Audit Logs</h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-sm text-slate-100"
        >
          <option value="ALL">All Statuses</option>
          <option value="FLAGGED">FLAGGED</option>
          <option value="REVIEW">REVIEW</option>
          <option value="SAFE">SAFE</option>
        </select>
      </div>

      {error && (
        <div className="p-3 rounded bg-red-950 border border-red-700 text-red-200 text-sm">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Device</th>
              <th className="py-3 px-4">Risk Score</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Checked At</th>
            </tr>
          </thead>
          <tbody>
            {visibleLogs.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-6 px-4 text-center text-slate-400">
                  No audit records found for this filter.
                </td>
              </tr>
            ) : (
              visibleLogs.map((row, idx) => (
                <tr key={idx} className="border-b border-slate-800/70">
                  <td className="py-3 px-4 font-medium">₹{row.amount}</td>
                  <td className="py-3 px-4">{row.location}</td>
                  <td className="py-3 px-4 text-slate-300">{row.deviceId}</td>
                  <td className="py-3 px-4">{row.riskScore}</td>
                  <td className="py-3 px-4 font-semibold">{row.status}</td>
                  <td className="py-3 px-4 text-xs text-slate-400">{row.checkedAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}