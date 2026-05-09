package com.taskflow.task.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AssignTaskDto {

    @NotNull
    private Integer userId;
}
