import { useState } from "react";
import KanbanColumn from "./KanbanColumn";

const columns = [
  { status: "todo", label: "TODO" },
  { status: "in_progress", label: "IN PROGRESS" },
  { status: "done", label: "DONE" },
];

export default function KanbanBoard({ tasks, projectName, onStatusChange, onEdit }) {
  const [draggedId, setDraggedId] = useState(null);

  function handleDragStart(e, taskId) {
    setDraggedId(taskId);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDrop(newStatus) {
    if (draggedId == null) return;
    onStatusChange(draggedId, newStatus);
    setDraggedId(null);
  }

  return (
    <div>
      <p className="text-sm text-muted mb-3 md:hidden">← Glisse pour voir les colonnes →</p>
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory">
        {columns.map((col) => (
          <div key={col.status} className="snap-start shrink-0 w-[85vw] sm:w-auto sm:flex-1">
            <KanbanColumn
              status={col.status}
              label={col.label}
              tasks={tasks.filter((t) => t.status === col.status)}
              projectName={projectName}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
              onEdit={onEdit}
            />
          </div>
        ))}
      </div>
    </div>
  );
}