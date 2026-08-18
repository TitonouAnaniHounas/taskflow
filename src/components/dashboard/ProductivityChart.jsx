import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ProductivityChart({ tasks }) {
  // On utilise dueDate comme proxy de "jour d'activité" pour les tâches done
  const doneTasks = tasks.filter((t) => t.status === "done" && t.dueDate);

  const data = dayLabels.map((label, i) => {
    const count = doneTasks.filter((t) => {
      const day = (new Date(t.dueDate).getDay() + 6) % 7; // lundi = 0
      return day === i;
    }).length;
    return { name: label, value: count };
  });

  return (
    <div className="bg-surface rounded-2xl border border-border p-6">
      <h3 className="font-display text-lg font-semibold text-ink mb-4">
        Tasks completed this week
      </h3>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6B6F76", fontSize: 13 }}
            />
            <Bar dataKey="value" fill="#D9A441" radius={[6, 6, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}