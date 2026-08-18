const statusOptions = [
  { value: "all", label: "All" },
  { value: "todo", label: "Todo" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

const priorityOptions = [
  { value: "all", label: "All" },
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export default function TaskFilters({ filters, setFilters, projects }) {
  function update(key, value) {
    setFilters({ ...filters, [key]: value });
  }

  const selectClass =
    "px-3 py-2 rounded-lg border border-border text-sm text-ink bg-surface focus:outline-none focus:ring-2 focus:ring-amber";

  return (
    <div className="flex flex-wrap gap-3">
      <select value={filters.status} onChange={(e) => update("status", e.target.value)} className={selectClass}>
        {statusOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>

      <select value={filters.priority} onChange={(e) => update("priority", e.target.value)} className={selectClass}>
        {priorityOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>

      <select value={filters.projectId} onChange={(e) => update("projectId", e.target.value)} className={selectClass}>
        <option value="all">All projects</option>
        {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      <select value={filters.sortBy} onChange={(e) => update("sortBy", e.target.value)} className={selectClass}>
        <option value="dueDate">Sort: Due date</option>
        <option value="priority">Sort: Priority</option>
        <option value="name">Sort: Name</option>
      </select>
    </div>
  );
}