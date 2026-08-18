import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

const COLORS = { High: "#C4453A", Medium: "#D9A441", Low: "#2F6F62" };

export default function PriorityChart({ tasks }) {
  const data = ["High", "Medium", "Low"].map((priority) => ({
    name: priority,
    value: tasks.filter((t) => t.priority === priority).length,
  }));

  return (
    <div className="bg-surface rounded-2xl border border-border p-6">
      <h3 className="font-display text-lg font-semibold text-ink mb-4">Tasks by Priority</h3>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={70}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#1C1F2E", fontSize: 14 }}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22}>
              {data.map((entry, i) => (
                <Cell key={i} fill={COLORS[entry.name]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}