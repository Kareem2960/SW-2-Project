import { api } from "../config/http";

export const projectService = {
  getById: async (projectId) => {
    const { data } = await api.get(`/api/projects/${projectId}`);
    return data;
  },

  listAll: async () => {
    const { data } = await api.get("/api/projects");
    return data;
  },

  /** Projects the current user belongs to or manages (project-service) */
  listMine: async () => {
    const { data } = await api.get("/api/projects/my-projects");
    return data;
  },
};
