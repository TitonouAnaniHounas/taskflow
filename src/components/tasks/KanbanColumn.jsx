import { useState } from "react";
import KanbanCard from "./KanbanCard";

const columnStyles = {
  todo: "border-t-4 border-t-muted",
  in_progress: "border-t-4 border-t-amber",
  done: "border-t-4 border-t-teal",
};

export default function KanbanColumn({ status, label, tasks, projectName, onDragStart, onDrop, onEdit }) {
  const [isOver, setIsOver] = useState(false);

  function handleDragOver(e) {
    e.preventDefault(); // nécessaire pour autoriser le drop
    setIsOver(true);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsOver(false);
    onDrop(status);
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      className={`bg-paper rounded-2xl p-4 flex-1 min-w-[280px] ${columnStyles[status]}
      ${isOver ? "ring-2 ring-amber" : ""} transition-shadow`}
    >
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="font-display font-semibold text-ink">{label}</h3>
        <span className="font-mono text-sm text-muted">{tasks.length}</span>
      </div>

      <div className="space-y-3 min-h-[100px]">
        {tasks.map((task) => (
          <KanbanCard
            key={task.id}
            task={task}
            projectName={projectName(task.projectId)}
            onDragStart={onDragStart}
            onEdit={() => onEdit(task)}
          />
        ))}
        {tasks.length === 0 && (
          <p className="text-muted text-sm text-center py-6">No tasks</p>
        )}
      </div>
    </div>
  );
}