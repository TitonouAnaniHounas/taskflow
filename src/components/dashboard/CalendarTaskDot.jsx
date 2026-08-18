const priorityDot = {
  High: "bg-brick",
  Medium: "bg-amber",
  Low: "bg-teal",
};

export default function CalendarTaskDot({ task }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-ink truncate">
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${priorityDot[task.priority]}`} />
      <span className="truncate">{task.title}</span>
    </div>
  );
}