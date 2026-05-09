package com.taskflow.task.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDto {

    private Integer id;
    private String content;
    private Integer userId;
    private LocalDateTime createdAt;
}
