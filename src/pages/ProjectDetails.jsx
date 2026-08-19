import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import { useTasks } from "../hooks/useTasks";
import ProgressBar from "../components/dashboard/ProgressBar";
import ProjectForm from "../components/projects/ProjectForm";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";
import { useNotification } from "../hooks/useNotification";

const statusIcons = { todo: "☐", in_progress: "🔄", done: "✓" };

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, loading, error, reload, editProject, removeProject } = useProjects();
  const { tasks } = useTasks();
  const { notify } = useNotification();
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <Loader label="Loading project..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;

  const project = projects.find((p) => String(p.id) === id);

  if (!project) {
    return (
      <ErrorState
        message="Project not found."
        onRetry={() => navigate("/projects")}
      />
    );
  }

  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  const total = projectTasks.length;
  const todo = projectTasks.filter((t) => t.status === "todo").length;
  const inProgress = projectTasks.filter((t) => t.status === "in_progress").length;
  const done = projectTasks.filter((t) => t.status === "done").length;
  const percent = total ? Math.round((done / total) * 100) : 0;

 async function handleEdit(data) {
    setSubmitting(true);
    await editProject(project.id, data);
    notify("Project updated successfully");
    setSubmitting(false);
    setEditOpen(false);
  }

  async function handleDelete() {
    await removeProject(project.id);
    notify(`"${project.name}" deleted`, "danger");
    navigate("/projects");
  }

  return (
    <div className="space-y-6">
      <Link to="/projects" className="text-sm text-amber font-medium hover:underline">
        ← Back to projects
      </Link>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
            <h1 className="font-display text-3xl font-bold text-ink">{project.name}</h1>
          </div>
          <p className="text-muted">{project.description}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" className="w-auto px-4" onClick={() => setEditOpen(true)}>
            Edit Project
          </Button>
          <Button variant="danger" className="w-auto px-4" onClick={() => setConfirmDelete(true)}>
            Delete Project
          </Button>
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-border p-6">
        <div className="flex justify-between text-base mb-2">
          <span className="text-ink font-medium">Progress</span>
          <span className="font-mono text-muted">{percent}%</span>
        </div>
        <ProgressBar percent={percent} color={project.color} />
        {project.deadline && (
          <p className="text-sm text-muted mt-3">
            Deadline: <span className="font-mono">{project.deadline}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface rounded-2xl border border-border p-5 text-center">
          <p className="font-mono text-2xl font-semibold text-ink">{total}</p>
          <p className="text-sm text-muted mt-1">Total</p>
        </div>
        <div className="bg-surface rounded-2xl border border-border p-5 text-center">
          <p className="font-mono text-2xl font-semibold text-ink">{todo}</p>
          <p className="text-sm text-muted mt-1">Todo</p>
        </div>
        <div className="bg-surface rounded-2xl border border-border p-5 text-center">
          <p className="font-mono text-2xl font-semibold text-amber">{inProgress}</p>
          <p className="text-sm text-muted mt-1">In Progress</p>
        </div>
        <div className="bg-surface rounded-2xl border border-border p-5 text-center">
          <p className="font-mono text-2xl font-semibold text-teal">{done}</p>
          <p className="text-sm text-muted mt-1">Done</p>
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-border p-6">
        <h2 className="font-display text-xl font-semibold text-ink mb-4">Project Tasks</h2>
        {projectTasks.length === 0 ? (
          <p className="text-muted text-base">No tasks yet for this project.</p>
        ) : (
          <div className="space-y-3">
            {projectTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <span>{statusIcons[task.status]}</span>
                <span className="text-base text-ink">{task.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit Project">
        <ProjectForm
          initialData={project}
          onSubmit={handleEdit}
          onCancel={() => setEditOpen(false)}
          loading={submitting}
        />
      </Modal>

      <Modal isOpen={confirmDelete} onClose={() => setConfirmDelete(false)} title="Delete Project">
        <p className="text-base text-ink mb-6">
          Are you sure you want to delete <strong>{project.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => setConfirmDelete(false)}>
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