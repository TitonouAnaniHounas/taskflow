import { useState, useEffect, useCallback } from "react";
import { projectService } from "../services/projectService";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (err) {
      setError("Unable to load your projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  async function addProject(data) {
    const newProject = await projectService.createProject(data);
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  }

  async function editProject(id, changes) {
    const updated = await projectService.updateProject(id, changes);
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  }

  async function removeProject(id) {
    await projectService.deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  return { projects, loading, error, reload: loadProjects, addProject, editProject, removeProject };
}