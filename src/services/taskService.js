import { api } from "./api";
import { mockTasks } from "../utils/mockData";

const STORE_KEY = "taskflow_tasks";

async function getTasks() {
  await api.wait();
  return api.readStore(STORE_KEY, mockTasks);
}

async function createTask(data) {
  await api.wait();
  const tasks = api.readStore(STORE_KEY, mockTasks);
  const newTask = { id: Date.now(), status: "todo", ...data };
  const updated = [...tasks, newTask];
  api.writeStore(STORE_KEY, updated);
  return newTask;
}

async function updateTask(id, changes) {
  await api.wait();
  const tasks = api.readStore(STORE_KEY, mockTasks);
  const updated = tasks.map((t) => (t.id === id ? { ...t, ...changes } : t));
  api.writeStore(STORE_KEY, updated);
  return updated.find((t) => t.id === id);
}

async function deleteTask(id) {
  await api.wait();
  const tasks = api.readStore(STORE_KEY, mockTasks);
  const updated = tasks.filter((t) => t.id !== id);
  api.writeStore(STORE_KEY, updated);
  return true;
}

export const taskService = { getTasks, createTask, updateTask, deleteTask };