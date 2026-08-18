import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useProjects } from "../hooks/useProjects";
import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";
import Modal from "../components/ui/Modal";
import CalendarTaskDot from "../components/dashboard/CalendarTaskDot";
import { getMonthMatrix, isSameDay, formatMonthLabel, weekDayLabels } from "../utils/dateHelpers";

export default function Calendar() {
  const { tasks, loading, error, reload } = useTasks();
  const { projects } = useProjects();

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);

  if (loading) return <Loader label="Loading calendar..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;

  const cells = getMonthMatrix(year, month);

  function goPrevious() {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function goNext() {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }

  function tasksForDay(day) {
    if (!day) return [];
    return tasks.filter((t) => t.dueDate && isSameDay(new Date(t.dueDate), day));
  }

  const selectedTasks = selectedDay ? tasksForDay(selectedDay) : [];
  const projectName = (id) => projects.find((p) => p.id === id)?.name || "—";

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-ink">Calendar</h1>

      <div className="bg-surface rounded-2xl border border-border p-6">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goPrevious}
            className="px-3 py-1.5 rounded-lg border border-border text-ink hover:bg-paper transition-colors"
          >
            ← Previous
          </button>
          <h2 className="font-display text-xl font-semibold text-ink capitalize">
            {formatMonthLabel(year, month)}
          </h2>
          <button
            onClick={goNext}
            className="px-3 py-1.5 rounded-lg border border-border text-ink hover:bg-paper transition-colors"
          >
            Next →
          </button>
        </div>

        {/* Jours de la semaine */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDayLabels.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Grille du mois */}
        <div className="grid grid-cols-7 gap-2">
          {cells.map((day, i) => {
            const dayTasks = tasksForDay(day);
            const isToday = day && isSameDay(day, today);

            return (
              <button
                key={i}
                disabled={!day}
                onClick={() => day && setSelectedDay(day)}
                className={`min-h-[90px] rounded-lg border p-2 text-left align-top transition-colors
                ${!day ? "border-transparent" : "border-border hover:border-amber cursor-pointer"}
                ${isToday ? "bg-amber/10 border-amber" : "bg-paper"}`}
              >
                {day && (
                  <>
                    <span className={`text-sm font-mono ${isToday ? "text-amber font-semibold" : "text-ink"}`}>
                      {day.getDate()}
                    </span>
                    <div className="mt-1 space-y-1">
                      {dayTasks.slice(0, 2).map((task) => (
                        <CalendarTaskDot key={task.id} task={task} />
                      ))}
                      {dayTasks.length > 2 && (
                        <p className="text-xs text-muted">+{dayTasks.length - 2} more</p>
                      )}
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal détail du jour sélectionné */}
      <Modal
        isOpen={!!selectedDay}
        onClose={() => setSelectedDay(null)}
        title={selectedDay ? selectedDay.toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) : ""}
      >
        {selectedTasks.length === 0 ? (
          <p className="text-muted text-base">No tasks due this day.</p>
        ) : (
          <div className="space-y-3">
            {selectedTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between border-b border-border last:border-0 pb-3 last:pb-0">
                <div>
                  <p className="text-base font-medium text-ink">{task.title}</p>
                  <p className="text-sm text-muted">{projectName(task.projectId)}</p>
                </div>
                <span className="text-sm text-muted">{task.priority}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}