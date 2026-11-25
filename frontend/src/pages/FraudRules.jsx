const RULES = [
  {
    id: "R1",
    name: "High Transaction Amount",
    condition: "Amount > 50,000",
    points: "+45 risk score",
    enabled: true,
  },
  {
    id: "R2",
    name: "Foreign Location",
    condition: "Location is not India",
    points: "+30 risk score",
    enabled: true,
  },
  {
    id: "R3",
    name: "Unrecognized / New Device",
    condition: "Device ID blank or contains 'unknown' / 'new'",
    points: "+20 risk score",
    enabled: true,
  },
];

export default function FraudRules() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">FraudTrace — Detection Rules</h1>

      <div className="space-y-3">
        {RULES.map((rule) => (
          <div
            key={rule.id}
            className="p-4 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-between gap-4"
          >
            <div>
              <div className="font-semibold">
                {rule.id}: {rule.name}
              </div>
              <div className="text-sm text-slate-400">{rule.condition}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-indigo-400">{rule.points}</div>
              <div className="text-xs text-emerald-400">
                {rule.enabled ? "Active" : "Disabled"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}