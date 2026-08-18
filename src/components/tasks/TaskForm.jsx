import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function TaskForm({ initialData, projects, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    projectId: initialData?.projectId || projects[0]?.id || "",
    priority: initialData?.priority || "Medium",
    status: initialData?.status || "todo",
    dueDate: initialData?.dueDate || "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "projectId" ? Number(value) : value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Task title is required.");
      return;
    }
    setError("");
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        label="Task title"
        name="title"
        value={form.title}
        onChange={handleChange}
        error={error}
        placeholder="Finish homepage"
      />

      <div className="mb-4">
        <label className="block text-base font-medium text-ink mb-1.5">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-border text-base text-ink bg-paper
          focus:outline-none focus:ring-2 focus:ring-amber resize-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-base font-medium text-ink mb-1.5">Project</label>
        <select
          name="projectId"
          value={form.projectId}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-border text-base text-ink bg-paper
          focus:outline-none focus:ring-2 focus:ring-amber"
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-base font-medium text-ink mb-1.5">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-border text-base text-ink bg-paper
            focus:outline-none focus:ring-2 focus:ring-amber"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label className="block text-base font-medium text-ink mb-1.5">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-border text-base text-ink bg-paper
            focus:outline-none focus:ring-2 focus:ring-amber"
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      <Input
        label="Due date"
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
      />

      <div className="flex gap-3 mt-6">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {initialData ? "Save changes" : "Create Task"}
        </Button>
      </div>
    </form>
  );
}