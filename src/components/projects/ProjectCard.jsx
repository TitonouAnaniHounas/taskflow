import { Link } from "react-router-dom";
import ProgressBar from "../dashboard/ProgressBar";

export default function ProjectCard({ project, tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "done").length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-surface rounded-2xl border border-border p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: project.color }}
        />
        <h3 className="font-display text-lg font-semibold text-ink">{project.name}</h3>
      </div>
      <p className="text-muted text-base mb-4 flex-1">{project.description}</p>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted">Progress</span>
          <span className="font-mono text-ink">{percent}%</span>
        </div>
        <ProgressBar percent={percent} color={project.color} />
      </div>

      <div className="flex justify-between text-sm text-muted mb-4">
        <span>{total} tasks</span>
        <span>{completed} completed</span>
      </div>

      <Link
        to={`/projects/${project.id}`}
        className="text-center py-2.5 rounded-lg border border-border text-ink font-medium text-sm hover:bg-paper transition-colors"
      >
        Open Project
      </Link>
    </div>
  );
}