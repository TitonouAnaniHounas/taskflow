import { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import { useTasks } from "../hooks/useTasks";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectForm from "../components/projects/ProjectForm";
import Modal from "../components/ui/Modal";
import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import { useNotification } from "../hooks/useNotification";

export default function Projects() {
  const { projects, loading, error, reload, addProject } = useProjects();
  const { tasks } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { notify } = useNotification();

  async function handleCreate(data) {
    setSubmitting(true);
    await addProject(data);
    notify("Project created successfully");
    setSubmitting(false);
    setModalOpen(false);
  }

  if (loading) return <Loader label="Loading projects..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-ink">Projects</h1>
        <Button className="w-auto px-5 m-10" onClick={() => setModalOpen(true)}>
          + New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon="📁"
          title="No projects yet"
          description="Create your first project to start organizing tasks."
          action={
            <Button className="w-auto px-5" onClick={() => setModalOpen(true)}>
              + New Project
            </Button>
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              tasks={tasks.filter((t) => t.projectId === project.id)}
            />
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="New Project">
        <ProjectForm
          onSubmit={handleCreate}
          onCancel={() => setModalOpen(false)}
          loading={submitting}
        />
      </Modal>
    </div>
  );
}