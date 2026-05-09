package com.taskflow.task.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AttachmentDto {

    private Integer id;
    private String filePath;
    private String fileName;
    private LocalDateTime uploadedAt;
}
