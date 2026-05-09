import { api } from '../config/http';

export const taskService = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await api.get('/api/tasks');
      return response.data;
    } catch (error) {
      console.error('Error fetching all tasks:', error);
      throw error;
    }
  },

  // Get task by ID
  getTaskById: async (taskId) => {
    try {
      const response = await api.get(`/api/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching task by ID:', error);
      throw error;
    }
  },

  // Get tasks by project
  getTasksByProject: async (projectId) => {
    try {
      const response = await api.get(`/api/tasks/project/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks by project:', error);
      throw error;
    }
  },

  // Get current user's tasks
  getMyTasks: async () => {
    try {
      const response = await api.get('/api/tasks/my-tasks');
      return response.data;
    } catch (error) {
      console.error('Error fetching my tasks:', error);
      throw error;
    }
  },

  // Create new task
  createTask: async (taskData) => {
    try {
      const response = await api.post('/api/tasks', taskData);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update task
  updateTask: async (taskId, taskData) => {
    try {
      const response = await api.put(`/api/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete task
  deleteTask: async (taskId) => {
    try {
      const response = await api.delete(`/api/tasks/${taskId}`);
      return response;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  // Assign task to user
  assignTask: async (taskId, assignData) => {
    try {
      const response = await api.post(`/api/tasks/${taskId}/assign`, assignData);
      return response.data;
    } catch (error) {
      console.error('Error assigning task:', error);
      throw error;
    }
  },

  // Update task status
  updateTaskStatus: async (taskId, status) => {
    try {
      const response = await api.patch(`/api/tasks/${taskId}/status`, null, {
        params: { status }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating task status:', error);
      throw error;
    }
  },
};
