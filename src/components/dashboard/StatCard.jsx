export default function StatCard({ label, value, accent = "ink" }) {
  const accentColors = {
    ink: "text-ink",
    amber: "text-amber",
    teal: "text-teal",
    brick: "text-brick",
  };

  return (
    <div className="bg-surface rounded-2xl border border-border p-6">
      <p className="text-muted text-sm font-medium mb-2">{label}</p>
      <p className={`font-mono text-4xl font-semibold ${accentColors[accent]}`}>
        {value}
      </p>
    </div>
  );
}