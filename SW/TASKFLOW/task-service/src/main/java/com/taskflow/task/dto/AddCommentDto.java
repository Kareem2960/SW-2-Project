package com.taskflow.task.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AddCommentDto {

    @NotBlank
    private String content;
}
