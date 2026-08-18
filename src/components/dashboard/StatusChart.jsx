import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = { todo: "#6B6F76", in_progress: "#D9A441", done: "#2F6F62" };
const LABELS = { todo: "Todo", in_progress: "In Progress", done: "Done" };

export default function StatusChart({ tasks }) {
  const data = ["todo", "in_progress", "done"].map((status) => ({
    name: LABELS[status],
    value: tasks.filter((t) => t.status === status).length,
    color: COLORS[status],
  }));

  const total = tasks.length;

  return (
    <div className="bg-surface rounded-2xl border border-border p-6">
      <h3 className="font-display text-lg font-semibold text-ink mb-4">Tasks by Status</h3>
      <div className="flex items-center gap-6">
        <div className="w-32 h-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={3}
                stroke="none"
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2 flex-1">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-ink">{entry.name}</span>
              </div>
              <span className="font-mono text-muted">
                {total ? Math.round((entry.value / total) * 100) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}