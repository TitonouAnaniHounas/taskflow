import { useState, useEffect, useCallback } from "react";
import { taskService } from "../services/taskService";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError("Unable to load your tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  async function addTask(data) {
    const newTask = await taskService.createTask(data);
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  }

  async function editTask(id, changes) {
    const updated = await taskService.updateTask(id, changes);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  }

  async function removeTask(id) {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return { tasks, loading, error, reload: loadTasks, addTask, editTask, removeTask };
}