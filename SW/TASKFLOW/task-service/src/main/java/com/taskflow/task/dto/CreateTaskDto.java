package com.taskflow.task.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateTaskDto {

    @NotBlank
    private String title;

    private String description;

    private String status = "ToDo";

    private String priority;

    private LocalDateTime dueDate;

    @NotNull
    private Integer projectId;
}
