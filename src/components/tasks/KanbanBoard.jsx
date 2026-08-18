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
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((col) => (
        <KanbanColumn
          key={col.status}
          status={col.status}
          label={col.label}
          tasks={tasks.filter((t) => t.status === col.status)}
          projectName={projectName}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}