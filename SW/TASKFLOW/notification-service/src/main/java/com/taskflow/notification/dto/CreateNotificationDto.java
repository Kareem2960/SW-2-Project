package com.taskflow.notification.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateNotificationDto {

    @NotNull
    private Integer userId;

    @NotBlank
    private String message;

    @NotBlank
    private String type;

    private String relatedEntityType;

    private Integer relatedEntityId;
}
