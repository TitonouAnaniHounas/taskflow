import { api } from "./api";
import { mockProjects } from "../utils/mockData";

const STORE_KEY = "taskflow_projects";

async function getProjects() {
  await api.wait();
  return api.readStore(STORE_KEY, mockProjects);
}

async function createProject(data) {
  await api.wait();
  const projects = api.readStore(STORE_KEY, mockProjects);
  const newProject = { id: Date.now(), ...data };
  const updated = [...projects, newProject];
  api.writeStore(STORE_KEY, updated);
  return newProject;
}

async function updateProject(id, changes) {
  await api.wait();
  const projects = api.readStore(STORE_KEY, mockProjects);
  const updated = projects.map((p) => (p.id === id ? { ...p, ...changes } : p));
  api.writeStore(STORE_KEY, updated);
  return updated.find((p) => p.id === id);
}

async function deleteProject(id) {
  await api.wait();
  const projects = api.readStore(STORE_KEY, mockProjects);
  const updated = projects.filter((p) => p.id !== id);
  api.writeStore(STORE_KEY, updated);
  return true;
}

export const projectService = { getProjects, createProject, updateProject, deleteProject };