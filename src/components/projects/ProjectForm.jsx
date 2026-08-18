import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

const colorOptions = ["#D9A441", "#2F6F62", "#C4453A", "#5B6FA3", "#8A5FA8"];

export default function ProjectForm({ initialData, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    color: initialData?.color || colorOptions[0],
    deadline: initialData?.deadline || "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Project name is required.");
      return;
    }
    setError("");
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        label="Project name"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={error}
        placeholder="Shoply"
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
        <label className="block text-base font-medium text-ink mb-2">Color</label>
        <div className="flex gap-2">
          {colorOptions.map((color) => (
            <button
              type="button"
              key={color}
              onClick={() => setForm({ ...form, color })}
              className={`w-8 h-8 rounded-full transition-transform ${form.color === color ? "ring-2 ring-offset-2 ring-ink scale-110" : ""}`}
              style={{ backgroundColor: color }}
              aria-label={color}
            />
          ))}
        </div>
      </div>

      <Input
        label="Deadline"
        type="date"
        name="deadline"
        value={form.deadline}
        onChange={handleChange}
      />

      <div className="flex gap-3 mt-6">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {initialData ? "Save changes" : "Create Project"}
        </Button>
      </div>
    </form>
  );
}