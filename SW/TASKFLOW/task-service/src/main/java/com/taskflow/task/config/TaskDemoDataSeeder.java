package com.taskflow.task.config;

import com.taskflow.task.entity.TaskItem;
import com.taskflow.task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class TaskDemoDataSeeder implements CommandLineRunner {

    private final TaskRepository taskRepository;

    @Value("${taskflow.demo.seed-enabled:true}")
    private boolean seedEnabled;

    @Value("${taskflow.demo.project-id:1}")
    private int demoProjectId;

    @Value("${taskflow.demo.assign-user-id:3}")
    private int demoAssignUserId;

    @Override
    @Transactional
    public void run(String... args) {
        if (!seedEnabled || taskRepository.count() > 0) {
            return;
        }

        LocalDateTime soon = LocalDateTime.now().plusDays(7);
        LocalDateTime later = LocalDateTime.now().plusDays(21);

        List<TaskItem> batch = List.of(
                TaskItem.builder().title("Define API contracts").description("OpenAPI specs for gateway + services")
                        .status("Done").priority("High").dueDate(soon).projectId(demoProjectId).assignedUserId(demoAssignUserId).build(),
                TaskItem.builder().title("Database modelling").description("ERD and SQL Server DDL review")
                        .status("Done").priority("Medium").dueDate(later).projectId(demoProjectId).assignedUserId(2).build(),
                TaskItem.builder().title("Wire React to task API").description("Kanban + dashboards use live tasks")
                        .status("InProgress").priority("High").dueDate(soon).projectId(demoProjectId).assignedUserId(demoAssignUserId).build(),
                TaskItem.builder().title("JWT validation on task-service").description("Align claims with auth-service")
                        .status("InProgress").priority("Medium").dueDate(later).projectId(demoProjectId).assignedUserId(null).build(),
                TaskItem.builder().title("Notification topics").description("Kafka events for TASK_CREATED")
                        .status("InProgress").priority("Low").dueDate(later).projectId(demoProjectId).assignedUserId(2).build(),
                TaskItem.builder().title("E2E login + tasks smoke test").description("Playwright / manual checklist")
                        .status("ToDo").priority("High").dueDate(later).projectId(demoProjectId).assignedUserId(null).build(),
                TaskItem.builder().title("Dark mode QA").description("Member dashboard regressions")
                        .status("ToDo").priority("Low").dueDate(soon.plusDays(2)).projectId(demoProjectId).assignedUserId(demoAssignUserId).build(),
                TaskItem.builder().title("Swagger examples").description("Document sample payloads")
                        .status("ToDo").priority("Medium").dueDate(later).projectId(demoProjectId).assignedUserId(null).build()
        );

        taskRepository.saveAll(batch);
    }
}
