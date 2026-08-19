import { db } from "./db";
import { api } from "./api";

function currentEmail() {
  return db.getSession();
}

async function getTasks() {
  await api.wait();
  const user = db.getUser(currentEmail());
  return user?.tasks || [];
}

async function createTask(data) {
  await api.wait();
  const email = currentEmail();
  const user = db.getUser(email);
  const newTask = { id: Date.now(), status: "todo", ...data };
  const tasks = [...(user.tasks || []), newTask];
  db.updateUser(email, { tasks });
  return newTask;
}

async function updateTask(id, changes) {
  await api.wait();
  const email = currentEmail();
  const user = db.getUser(email);
  const tasks = user.tasks.map((t) => (t.id === id ? { ...t, ...changes } : t));
  db.updateUser(email, { tasks });
  return tasks.find((t) => t.id === id);
}

async function deleteTask(id) {
  await api.wait();
  const email = currentEmail();
  const user = db.getUser(email);
  const tasks = user.tasks.filter((t) => t.id !== id);
  db.updateUser(email, { tasks });
  return true;
}

export const taskService = { getTasks, createTask, updateTask, deleteTask };