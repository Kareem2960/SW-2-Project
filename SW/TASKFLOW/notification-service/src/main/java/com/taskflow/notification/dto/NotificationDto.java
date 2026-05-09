package com.taskflow.notification.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationDto {

    private Integer id;
    private Integer userId;
    private String message;
    private String type;
    private Boolean isRead;
    private LocalDateTime createdAt;
    private String relatedEntityType;
    private Integer relatedEntityId;
}
