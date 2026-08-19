import { useState, useMemo } from "react";
import { useTasks } from "../hooks/useTasks";
import { useProjects } from "../hooks/useProjects";
import TaskCard from "../components/tasks/TaskCard";
import TaskForm from "../components/tasks/TaskForm";
import TaskFilters from "../components/tasks/TaskFilters";
import { useNotification } from "../hooks/useNotification";
import KanbanBoard from "../components/tasks/KanbanBoard";
import Modal from "../components/ui/Modal";
import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";

const priorityWeight = { High: 3, Medium: 2, Low: 1 };

export default function Tasks() {
  const { tasks, loading, error, reload, addTask, editTask, removeTask } = useTasks();
  const { projects } = useProjects();

  const [view, setView] = useState("list"); // "list" | "kanban"
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    projectId: "all",
    sortBy: "dueDate",
  });

  const [formOpen, setFormOpen] = useState(false);
  const { notify } = useNotification();
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const projectName = (id) => projects.find((p) => p.id === id)?.name || "—";

  const filteredTasks = useMemo(() => {
    let result = tasks.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );

    if (filters.status !== "all") result = result.filter((t) => t.status === filters.status);
    if (filters.priority !== "all") result = result.filter((t) => t.priority === filters.priority);
    if (filters.projectId !== "all") result = result.filter((t) => t.projectId === Number(filters.projectId));

    result = [...result].sort((a, b) => {
      if (filters.sortBy === "priority") return priorityWeight[b.priority] - priorityWeight[a.priority];
      if (filters.sortBy === "name") return a.title.localeCompare(b.title);
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    return result;
  }, [tasks, search, filters]);

  function openCreate() {
    setEditingTask(null);
    setFormOpen(true);
  }

  function openEdit(task) {
    setEditingTask(task);
    setFormOpen(true);
  }

  async function handleSubmit(data) {
  setSubmitting(true);
  if (editingTask) {
    await editTask(editingTask.id, data);
    notify("Task updated successfully");
  } else {
    await addTask(data);
    notify("Task created successfully");
  }
  setSubmitting(false);
  setFormOpen(false);
}

  async function handleToggleStatus(task) {
    const next =
      task.status === "todo" ? "in_progress" : task.status === "in_progress" ? "done" : "todo";
    await editTask(task.id, { status: next });
  }

  async function handleDelete() {
  await removeTask(deletingTask.id);
  notify(`"${deletingTask.title}" deleted`, "danger");
  setDeletingTask(null);
}

  if (loading) return <Loader label="Loading tasks..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;

  return (
    <div className="space-y-6">
      {/* Header + toggle List/Kanban */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-display text-3xl font-bold text-ink">Tasks</h1>
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                view === "list" ? "bg-ink text-white" : "bg-surface text-ink hover:bg-paper"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setView("kanban")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                view === "kanban" ? "bg-ink text-white" : "bg-surface text-ink hover:bg-paper"
              }`}
            >
              Kanban
            </button>
          </div>
          <Button className="w-auto px-5" onClick={openCreate}>
            + New Task
          </Button>
        </div>
      </div>

      {/* Vue Liste */}
      {view === "list" && (
        <>
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-base text-ink
            focus:outline-none focus:ring-2 focus:ring-amber"
          />

          <TaskFilters filters={filters} setFilters={setFilters} projects={projects} />

          {filteredTasks.length === 0 ? (
            <EmptyState
              icon="✅"
              title="No tasks found"
              description="Try adjusting your filters or create a new task."
              action={
                <Button className="w-auto px-5" onClick={openCreate}>
                  + New Task
                </Button>
              }
            />
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  projectName={projectName(task.projectId)}
                  onEdit={() => openEdit(task)}
                  onDelete={() => setDeletingTask(task)}
                  onToggleStatus={() => handleToggleStatus(task)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Vue Kanban */}
      {view === "kanban" && (
        <KanbanBoard
          tasks={tasks}
          projectName={projectName}
          onStatusChange={(taskId, newStatus) => editTask(taskId, { status: newStatus })}
          onEdit={openEdit}
        />
      )}

      {/* Modal création / édition */}
      <Modal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingTask ? "Edit Task" : "New Task"}
      >
        <TaskForm
          initialData={editingTask}
          projects={projects}
          onSubmit={handleSubmit}
          onCancel={() => setFormOpen(false)}
          loading={submitting}
        />
      </Modal>

      {/* Modal confirmation suppression */}
      <Modal isOpen={!!deletingTask} onClose={() => setDeletingTask(null)} title="Delete Task">
        <p className="text-base text-ink mb-6">
          Are you sure you want to delete <strong>{deletingTask?.title}</strong>?
        </p>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => setDeletingTask(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}