import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import { useProjects } from "../hooks/useProjects";
import StatCard from "../components/dashboard/StatCard";
import ProgressBar from "../components/dashboard/ProgressBar";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import StatusChart from "../components/dashboard/StatusChart";
import PriorityChart from "../components/dashboard/PriorityChart";
import ProductivityChart from "../components/dashboard/ProductivityChart";

const priorityColors = {
  High: "text-brick",
  Medium: "text-amber",
  Low: "text-teal",
};

const statusIcons = {
  todo: "☐",
  in_progress: "🔄",
  done: "✓",
};

export default function Dashboard() {
  const { user } = useAuth();
  const { tasks, loading: tasksLoading, error: tasksError, reload: reloadTasks } = useTasks();
  const { projects, loading: projectsLoading, error: projectsError, reload: reloadProjects } = useProjects();

  if (tasksLoading || projectsLoading) return <Loader label="Loading your dashboard..." />;
  if (tasksError) return <ErrorState message={tasksError} onRetry={reloadTasks} />;
  if (projectsError) return <ErrorState message={projectsError} onRetry={reloadProjects} />;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress").length;
  const overdueTasks = tasks.filter(
    (t) => t.status !== "done" && new Date(t.dueDate) < new Date()
  ).length;

  const projectsWithProgress = projects.map((project) => {
    const projectTasks = tasks.filter((t) => t.projectId === project.id);
    const done = projectTasks.filter((t) => t.status === "done").length;
    const percent = projectTasks.length
      ? Math.round((done / projectTasks.length) * 100)
      : 0;
    return { ...project, percent };
  });

  const recentTasks = [...tasks].slice(-3).reverse();
  const isEmpty = totalTasks === 0 && projects.length === 0;
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink">Dashboard</h1>
        <p className="text-muted mt-1">
          Good morning, {user?.firstName || "there"} 👋
        </p>
      </div>

      {/* Cartes de stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Tasks" value={totalTasks} accent="ink" />
        <StatCard label="Completed" value={completedTasks} accent="teal" />
        <StatCard label="In Progress" value={inProgressTasks} accent="amber" />
        <StatCard label="Overdue" value={overdueTasks} accent="brick" />
      </div>

      {isEmpty && (
        <EmptyState
          icon="🚀"
          title="Welcome to TaskFlow"
          description="Create your first project to get started."
        />
      )}

      {/* Progression des projets + Tâches récentes */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-2xl border border-border p-6">
          <h2 className="font-display text-xl font-semibold text-ink mb-5">Project Progress</h2>
          <div className="space-y-5">
            {projectsWithProgress.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between mb-2 text-base">
                  <span className="font-medium text-ink">{project.name}</span>
                  <span className="font-mono text-muted">{project.percent}%</span>
                </div>
                <ProgressBar percent={project.percent} color={project.color} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-6">
          <h2 className="font-display text-xl font-semibold text-ink mb-5">Recent Tasks</h2>
          <div className="space-y-4">
            {recentTasks.map((task) => {
              const project = projects.find((p) => p.id === task.projectId);
              return (
                <div key={task.id} className="flex items-start justify-between border-b border-border last:border-0 pb-4 last:pb-0">
                  <div>
                    <p className="text-base font-medium text-ink flex items-center gap-2">
                      <span>{statusIcons[task.status]}</span>
                      {task.title}
                    </p>
                    <p className="text-sm text-muted mt-1">{project?.name}</p>
                  </div>
                  <span className={`text-sm font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section Analytics */}
      <div>
        <h2 className="font-display text-2xl font-bold text-ink mb-5">Analytics</h2>
        <div className="grid lg:grid-cols-3 gap-6">
          <StatusChart tasks={tasks} />
          <PriorityChart tasks={tasks} />
          <ProductivityChart tasks={tasks} />
        </div>
      </div>
    </div>
  );
}