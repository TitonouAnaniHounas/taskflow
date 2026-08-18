const priorityStyles = {
  High: "bg-brick/10 text-brick",
  Medium: "bg-amber/10 text-amber",
  Low: "bg-teal/10 text-teal",
};

export default function KanbanCard({ task, projectName, onDragStart, onEdit }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onClick={onEdit}
      className="bg-surface rounded-xl border border-border p-4 cursor-grab active:cursor-grabbing
      hover:border-amber transition-colors"
    >
      <p className="text-base font-medium text-ink mb-2">{task.title}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted truncate">{projectName}</span>
        <span className={`px-2 py-0.5 rounded-full font-medium shrink-0 ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>
      </div>
    </div>
  );
}