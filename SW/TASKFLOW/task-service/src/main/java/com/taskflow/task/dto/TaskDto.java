package com.taskflow.task.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class TaskDto {

    private Integer id;
    private String title;
    private String description;
    private String status;
    private String priority;
    private LocalDateTime dueDate;
    private Integer projectId;
    private Integer assignedUserId;
    private List<CommentDto> comments;
    private List<AttachmentDto> attachments;
    private LocalDateTime createdAt;
}
