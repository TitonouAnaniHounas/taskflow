const priorityStyles = {
  High: "bg-brick/10 text-brick",
  Medium: "bg-amber/10 text-amber",
  Low: "bg-teal/10 text-teal",
};

const statusIcons = { todo: "☐", in_progress: "🔄", done: "✓" };

export default function TaskCard({ task, projectName, onEdit, onDelete, onToggleStatus }) {
  const isOverdue = task.status !== "done" && new Date(task.dueDate) < new Date();

  return (
    <div className="bg-surface rounded-2xl border border-border p-5 flex items-start gap-4">
      <button
        onClick={onToggleStatus}
        className="text-xl mt-0.5"
        aria-label={`Changer le statut de la tâche : ${task.title}`}
      >
        {statusIcons[task.status]}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-base font-medium text-ink ${task.status === "done" ? "line-through text-muted" : ""}`}>
          {task.title}
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
          <span className="text-muted">{projectName}</span>
          <span className={`px-2.5 py-0.5 rounded-full font-medium ${priorityStyles[task.priority]}`}>
            {task.priority}
          </span>
          <span className={isOverdue ? "text-brick font-medium" : "text-muted"}>
            {isOverdue ? "⚠️ " : ""}Due: {task.dueDate || "—"}
          </span>
        </div>
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={onEdit}
          className="text-sm text-ink font-medium hover:text-amber transition-colors"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-sm text-brick font-medium hover:opacity-70 transition-opacity"
        >
          Delete
        </button>
      </div>
    </div>
  );
}