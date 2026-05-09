package com.taskflow.task.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.taskflow.task.dto.*;
import com.taskflow.task.entity.TaskItem;
import com.taskflow.task.kafka.KafkaProducerService;
import com.taskflow.task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final KafkaProducerService kafkaProducer;
    private final ObjectMapper objectMapper;

    @Override
    public TaskDto createTask(CreateTaskDto dto, Integer userId) {
        TaskItem task = TaskItem.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .status(dto.getStatus())
                .priority(dto.getPriority())
                .dueDate(dto.getDueDate())
                .projectId(dto.getProjectId())
                .build();

        task = taskRepository.save(task);

        Map<String, Object> event = new HashMap<>();
        event.put("type", "TASK_CREATED");
        event.put("taskId", task.getId());
        event.put("projectId", task.getProjectId());
        event.put("userId", userId);
        kafkaProducer.sendTaskEvent(event);

        return mapToDto(task);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskDto> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public TaskDto getTaskById(Integer id) {
        TaskItem task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        return mapToDto(task);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskDto> getTasksByProject(Integer projectId) {
        return taskRepository.findByProjectId(projectId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskDto> getTasksByUser(Integer userId) {
        return taskRepository.findByAssignedUserId(userId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public TaskDto updateTask(Integer id, UpdateTaskDto dto) {
        TaskItem task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (dto.getTitle() != null) task.setTitle(dto.getTitle());
        if (dto.getDescription() != null) task.setDescription(dto.getDescription());
        if (dto.getStatus() != null) task.setStatus(dto.getStatus());
        if (dto.getPriority() != null) task.setPriority(dto.getPriority());
        if (dto.getDueDate() != null) task.setDueDate(dto.getDueDate());
        if (dto.getAssignedUserId() != null) task.setAssignedUserId(dto.getAssignedUserId());

        return mapToDto(taskRepository.save(task));
    }

    @Override
    public void deleteTask(Integer id) {
        taskRepository.deleteById(id);
    }

    @Override
    public TaskDto assignTask(Integer taskId, AssignTaskDto dto, Integer userId) {
        TaskItem task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setAssignedUserId(dto.getUserId());
        task = taskRepository.save(task);

        Map<String, Object> event = new HashMap<>();
        event.put("type", "TASK_ASSIGNED");
        event.put("taskId", task.getId());
        event.put("assignedTo", dto.getUserId());
        event.put("assignedBy", userId);
        kafkaProducer.sendTaskEvent(event);

        return mapToDto(task);
    }

    @Override
    public TaskDto updateTaskStatus(Integer taskId, String status) {
        TaskItem task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(status);
        return mapToDto(taskRepository.save(task));
    }

    private TaskDto mapToDto(TaskItem task) {
        TaskDto dto = new TaskDto();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus());
        dto.setPriority(task.getPriority());
        dto.setDueDate(task.getDueDate());
        dto.setProjectId(task.getProjectId());
        dto.setAssignedUserId(task.getAssignedUserId());
        dto.setCreatedAt(task.getCreatedAt());
        dto.setComments(task.getComments().stream().map(c -> {
            CommentDto cd = new CommentDto();
            cd.setId(c.getId());
            cd.setContent(c.getContent());
            cd.setUserId(c.getUserId());
            cd.setCreatedAt(c.getCreatedAt());
            return cd;
        }).collect(Collectors.toList()));
        dto.setAttachments(task.getAttachments().stream().map(a -> {
            AttachmentDto ad = new AttachmentDto();
            ad.setId(a.getId());
            ad.setFilePath(a.getFilePath());
            ad.setFileName(a.getFileName());
            ad.setUploadedAt(a.getUploadedAt());
            return ad;
        }).collect(Collectors.toList()));
        return dto;
    }
}
