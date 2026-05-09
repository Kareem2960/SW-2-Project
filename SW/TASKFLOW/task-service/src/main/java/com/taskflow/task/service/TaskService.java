package com.taskflow.task.service;

import com.taskflow.task.dto.*;

import java.util.List;

public interface TaskService {
    TaskDto createTask(CreateTaskDto dto, Integer userId);
    List<TaskDto> getAllTasks();
    TaskDto getTaskById(Integer id);
    List<TaskDto> getTasksByProject(Integer projectId);
    List<TaskDto> getTasksByUser(Integer userId);
    TaskDto updateTask(Integer id, UpdateTaskDto dto);
    void deleteTask(Integer id);
    TaskDto assignTask(Integer taskId, AssignTaskDto dto, Integer userId);
    TaskDto updateTaskStatus(Integer taskId, String status);
}
