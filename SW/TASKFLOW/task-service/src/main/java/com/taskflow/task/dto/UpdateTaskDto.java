package com.taskflow.task.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UpdateTaskDto {

    private String title;
    private String description;
    private String status;
    private String priority;
    private LocalDateTime dueDate;
    private Integer assignedUserId;
}
