package com.taskflow.task.controller;

import com.taskflow.task.dto.*;
import com.taskflow.task.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@Tag(name = "Tasks", description = "Task management endpoints")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    @Operation(summary = "Create a new task")
    public ResponseEntity<TaskDto> createTask(@Valid @RequestBody CreateTaskDto dto,
                                               @AuthenticationPrincipal UserDetails userDetails) {
        Integer userId = Integer.parseInt(userDetails.getUsername());
        return ResponseEntity.ok(taskService.createTask(dto, userId));
    }

    @GetMapping
    @Operation(summary = "Get all tasks")
    public ResponseEntity<List<TaskDto>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get task by ID")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable Integer id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @GetMapping("/project/{projectId}")
    @Operation(summary = "Get tasks by project")
    public ResponseEntity<List<TaskDto>> getTasksByProject(@PathVariable Integer projectId) {
        return ResponseEntity.ok(taskService.getTasksByProject(projectId));
    }

    @GetMapping("/my-tasks")
    @Operation(summary = "Get current user's tasks")
    public ResponseEntity<List<TaskDto>> getMyTasks(@AuthenticationPrincipal UserDetails userDetails) {
        Integer userId = Integer.parseInt(userDetails.getUsername());
        return ResponseEntity.ok(taskService.getTasksByUser(userId));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update task")
    public ResponseEntity<TaskDto> updateTask(@PathVariable Integer id,
                                               @Valid @RequestBody UpdateTaskDto dto) {
        return ResponseEntity.ok(taskService.updateTask(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete task")
    public ResponseEntity<Void> deleteTask(@PathVariable Integer id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{taskId}/assign")
    @Operation(summary = "Assign task to user")
    public ResponseEntity<TaskDto> assignTask(@PathVariable Integer taskId,
                                               @Valid @RequestBody AssignTaskDto dto,
                                               @AuthenticationPrincipal UserDetails userDetails) {
        Integer userId = Integer.parseInt(userDetails.getUsername());
        return ResponseEntity.ok(taskService.assignTask(taskId, dto, userId));
    }

    @PatchMapping("/{taskId}/status")
    @Operation(summary = "Update task status")
    public ResponseEntity<TaskDto> updateStatus(@PathVariable Integer taskId,
                                                 @RequestParam String status) {
        return ResponseEntity.ok(taskService.updateTaskStatus(taskId, status));
    }
}
