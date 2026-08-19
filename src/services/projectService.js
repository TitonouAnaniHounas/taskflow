import { db } from "./db";
import { api } from "./api";

function currentEmail() {
  return db.getSession();
}

async function getProjects() {
  await api.wait();
  const user = db.getUser(currentEmail());
  return user?.projects || [];
}

async function createProject(data) {
  await api.wait();
  const email = currentEmail();
  const user = db.getUser(email);
  const newProject = { id: Date.now(), ...data };
  const projects = [...(user.projects || []), newProject];
  db.updateUser(email, { projects });
  return newProject;
}

async function updateProject(id, changes) {
  await api.wait();
  const email = currentEmail();
  const user = db.getUser(email);
  const projects = user.projects.map((p) => (p.id === id ? { ...p, ...changes } : p));
  db.updateUser(email, { projects });
  return projects.find((p) => p.id === id);
}

async function deleteProject(id) {
  await api.wait();
  const email = currentEmail();
  const user = db.getUser(email);
  const projects = user.projects.filter((p) => p.id !== id);
  db.updateUser(email, { projects });
  return true;
}

export const projectService = { getProjects, createProject, updateProject, deleteProject };